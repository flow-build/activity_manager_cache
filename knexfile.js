const path = require('path');
const BASE_PATH = __dirname;

module.exports = {
  docker: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST || 'localhost',
      user: process.env.PG_USER || 'postgres',
      password: process.env.PG_PASSWORD || 'postgres',
      database: process.env.PG_DATABASE || 'cache_service',
      port: process.env.PG_PORT || 5432,
    },
    migrations: {
      directory: path.join(BASE_PATH, 'db/migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'db/seeds'),
    },
    pool: {
      min: Number(process.env.POOL_MIN) || 0,
      max: Number(process.env.POOL_MAX) || 200,
    },
  },
};
