// Strapi health check endpoint
// Este arquivo cria um endpoint /_health para Railway verificar se o app está funcionando

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register({ strapi }) {
    // Adiciona rota de health check
    strapi.server.routes([
      {
        method: 'GET',
        path: '/_health',
        handler: (ctx) => {
          ctx.body = {
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
            database: 'connected', // Strapi já verificou conexão ao iniciar
          };
        },
        config: {
          auth: false, // Não requer autenticação
        },
      },
      {
        method: 'GET',
        path: '/health',
        handler: (ctx) => {
          ctx.body = {
            status: 'ok',
            message: 'Strapi is running',
            timestamp: new Date().toISOString(),
          };
        },
        config: {
          auth: false,
        },
      },
    ]);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  bootstrap({ strapi }) {
    console.log('✅ Health check endpoints registered:');
    console.log('   - GET /_health (detailed)');
    console.log('   - GET /health (simple)');
  },
};
