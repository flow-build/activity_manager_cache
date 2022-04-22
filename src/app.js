const Koa = require('koa');
const { _logger, koaLogger, db, onMessageQueue } = require('./utils');
const middlewares = require('./middlewares');
const router = require('./router');
const mqtt = require('./mqtt');
const { Queue } = require('./services/cache');

const startServer = async (port) => {
  const app = new Koa();

  app.use(koaLogger(_logger));

  app.use(async function errorHandler(ctx, next) {
    try {
      ctx.db = db;
      await next();
    } catch (error) {
      ctx.status = 500;
      if (error && error.status) {
        ctx.status = error.status;
      }
    }
  });

  app.use(
    router({
      middlewares: [middlewares.jwtMiddleware, middlewares.captureActorData],
    })
  );

  const queue = new Queue(db);

  await mqtt.connect();
  await mqtt.onMessage(onMessageQueue(queue));
  await mqtt.subscribe('/process/#');

  return app.listen(port, () => {
    _logger.info(`Cache Service is running ${port}`);
  });
};

module.exports = { startServer };
