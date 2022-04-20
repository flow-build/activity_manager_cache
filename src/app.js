const Koa = require('koa');
const { _logger, koaLogger } = require('./utils');
const router = require('./router')

const startServer = async (port) => {
  const app = new Koa();

  app.use(koaLogger(_logger));

  app.use(router({
    middlewares: [],
  }))

  return app.listen(port, () => {
    _logger.info(`Cache Service is running ${port}`);
  });
};

module.exports = { startServer };
