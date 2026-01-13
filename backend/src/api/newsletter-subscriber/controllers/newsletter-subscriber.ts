/**
 * newsletter-subscriber controller
 */

import { factories } from '@strapi/strapi';
import crypto from 'crypto';

export default factories.createCoreController('api::newsletter-subscriber.newsletter-subscriber', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { email, name, segment } = ctx.request.body.data;

      // Gerar token de confirmação
      const confirmation_token = crypto.randomBytes(32).toString('hex');

      // Criar subscriber usando entityService sem tipagem rígida
      const subscriber = await strapi.db.query('api::newsletter-subscriber.newsletter-subscriber').create({
        data: {
          email,
          name,
          segment: segment || 'other',
          confirmed: false,
          confirmation_token,
          subscribed_at: new Date(),
        },
      });

      // Aqui você pode integrar com webhook para enviar email de confirmação
      // await sendConfirmationEmail(email, confirmation_token);

      return { data: { id: subscriber.id, email: subscriber.email } };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async confirm(ctx) {
    try {
      const { token } = ctx.params;

      const subscriber = await strapi.db.query('api::newsletter-subscriber.newsletter-subscriber').findOne({
        where: { confirmation_token: token },
      });

      if (!subscriber) {
        return ctx.badRequest('Token inválido');
      }

      await strapi.db.query('api::newsletter-subscriber.newsletter-subscriber').update({
        where: { id: subscriber.id },
        data: {
          confirmed: true,
          confirmation_token: null,
        },
      });

      return { data: { message: 'Email confirmado com sucesso!' } };
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  async exportCsv(ctx) {
    try {
      const subscribers = await strapi.db.query('api::newsletter-subscriber.newsletter-subscriber').findMany({
        where: { confirmed: true },
      });

      const csv = [
        'email,name,segment,subscribed_at',
        ...subscribers.map((s: any) => `${s.email},${s.name || ''},${s.segment},${s.subscribed_at}`),
      ].join('\n');

      ctx.set('Content-Type', 'text/csv');
      ctx.set('Content-Disposition', 'attachment; filename="subscribers.csv"');
      return csv;
    } catch (error) {
      ctx.throw(500, error);
    }
  },
}));