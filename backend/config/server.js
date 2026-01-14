module.exports = ({
  connection: {
    client: 'postgres',
    connection: env('DATABASE_URL'),
    pool: { min: 2, max: 10 },
  },
});
