const Koa = require('koa');
const { _logger, koaLogger } = require('./utils');

const startServer = async (port) => {
  const app = new Koa();

  app.use(koaLogger(_logger));

  return app.listen(port, () => {
    _logger.info(`Cache Service is running`);
  });
};

module.exports = { startServer };
