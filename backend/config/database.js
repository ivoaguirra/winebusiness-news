// config/database.js
module.exports = ({ env }) => {
  const databaseUrl = env("DATABASE_URL");

  if (databaseUrl) {
    return {
      connection: {
        client: "postgres",
        connection: {
          connectionString: databaseUrl,
          ssl: env.bool("DATABASE_SSL", true) ? { rejectUnauthorized: false } : false,
        },
        pool: { min: 0, max: 10 },
      },
    };
  }

  // fallback (caso você use vars separadas)
  return {
    connection: {
      client: "postgres",
      connection: {
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "postgres"),
        user: env("DATABASE_USERNAME", "postgres"),
        password: env("DATABASE_PASSWORD", ""),
        ssl: env.bool("DATABASE_SSL", false) ? { rejectUnauthorized: false } : false,
      },
      pool: { min: 0, max: 10 },
    },
  };
};

