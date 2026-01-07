/**
 * newsletter-subscriber router
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/newsletter-subscribers',
      handler: 'newsletter-subscriber.create',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/newsletter-subscribers/confirm/:token',
      handler: 'newsletter-subscriber.confirm',
      config: {
        auth: false,
      },
    },
    {
      method: 'GET',
      path: '/newsletter-subscribers/export',
      handler: 'newsletter-subscriber.exportCsv',
    },
    {
      method: 'GET',
      path: '/newsletter-subscribers',
      handler: 'newsletter-subscriber.find',
    },
    {
      method: 'GET',
      path: '/newsletter-subscribers/:id',
      handler: 'newsletter-subscriber.findOne',
    },
    {
      method: 'DELETE',
      path: '/newsletter-subscribers/:id',
      handler: 'newsletter-subscriber.delete',
    },
  ],
};
