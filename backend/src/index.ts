import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setupPublicPermissions(strapi);
  },
};

/**
 * Grant read-only (find, findOne) permissions to the Public role
 * for content types the frontend needs to access.
 * Runs on every startup but only creates permissions that are missing.
 */
async function setupPublicPermissions(strapi: Core.Strapi) {
  const publicReadActions = [
    'api::article.article.find',
    'api::article.article.findOne',
    'api::category.category.find',
    'api::category.category.findOne',
    'api::tag.tag.find',
    'api::tag.tag.findOne',
    'api::event.event.find',
    'api::event.event.findOne',
    'api::ranking.ranking.find',
    'api::ranking.ranking.findOne',
    'api::person.person.find',
    'api::person.person.findOne',
    'api::page.page.find',
    'api::page.page.findOne',
    'api::ad-setting.ad-setting.find',
    'api::ad-setting.ad-setting.findOne',
  ];

  try {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      strapi.log.warn('[bootstrap] Public role not found – skipping permission setup.');
      return;
    }

    const existingPermissions = await strapi
      .query('plugin::users-permissions.permission')
      .findMany({ where: { role: publicRole.id } });

    const existingActions = new Set(
      existingPermissions.map((p: { action: string }) => p.action),
    );

    let created = 0;
    for (const action of publicReadActions) {
      if (!existingActions.has(action)) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action, role: publicRole.id },
        });
        created++;
      }
    }

    if (created > 0) {
      strapi.log.info(`[bootstrap] Created ${created} public API permissions.`);
    } else {
      strapi.log.info('[bootstrap] Public API permissions already configured.');
    }
  } catch (error) {
    strapi.log.error('[bootstrap] Failed to setup public permissions:', error);
  }
}
