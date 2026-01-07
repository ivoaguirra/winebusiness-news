/**
 * newsletter-subscriber controller
 */

import { factories } from '@strapi/strapi';
import crypto from 'crypto';

export default factories.createCoreController('api::newsletter-subscriber.newsletter-subscriber', ({ strapi }) => ({
  async create(ctx) {
    const { email, name, segment } = ctx.request.body.data;

    // Gerar token de confirmação
    const confirmation_token = crypto.randomBytes(32).toString('hex');

    // Criar subscriber
    const subscriber = await strapi.entityService.create('api::newsletter-subscriber.newsletter-subscriber', {
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
  },

  async confirm(ctx) {
    const { token } = ctx.params;

    const subscribers = await strapi.entityService.findMany('api::newsletter-subscriber.newsletter-subscriber', {
      filters: { confirmation_token: token },
    });

    if (!subscribers || subscribers.length === 0) {
      return ctx.badRequest('Token inválido');
    }

    const subscriber = subscribers[0];

    await strapi.entityService.update('api::newsletter-subscriber.newsletter-subscriber', subscriber.id, {
      data: {
        confirmed: true,
        confirmation_token: null,
      },
    });

    return { data: { message: 'Email confirmado com sucesso!' } };
  },

  async exportCsv(ctx) {
    const subscribers = await strapi.entityService.findMany('api::newsletter-subscriber.newsletter-subscriber', {
      filters: { confirmed: true },
    });

    const csv = [
      'email,name,segment,subscribed_at',
      ...subscribers.map((s: any) => `${s.email},${s.name || ''},${s.segment},${s.subscribed_at}`),
    ].join('\n');

    ctx.set('Content-Type', 'text/csv');
    ctx.set('Content-Disposition', 'attachment; filename="subscribers.csv"');
    return csv;
  },
}));
