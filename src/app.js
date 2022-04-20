const Koa = require('koa');
const { _logger, koaLogger, db } = require('./utils');
const router = require('./router');
const mqtt = require('./mqtt');
const { Queue } = require('./services/cache');

const startServer = async (port) => {
  const app = new Koa();

  app.use(koaLogger(_logger));

  app.use(
    router({
      middlewares: [],
    })
  );

  const queue = new Queue(db);

  await mqtt.connect();
  await mqtt.onMessage(async (topic, message) => {
    try {
      _logger.info(`[mqtt] message received topic: [${topic}]`);

      if (topic.endsWith('/am/create') || topic.endsWith('/am/finished')) {
        const activity_manager = JSON.parse(message.toString());

        _logger.info(
          `[mqtt] message added on queue ${JSON.stringify(activity_manager)}`
        );

        queue.push({
          topic,
          activity_manager,
          actor_id: activity_manager.props.result.actor_id,
        });

        if (!queue.running) {
          await queue.processQueue();
        }
      }
    } catch (err) {
      _logger.error(`[mqtt] error on process message`);
    }
  });
  await mqtt.subscribe('/process/#');

  return app.listen(port, () => {
    _logger.info(`Cache Service is running ${port}`);
  });
};

module.exports = { startServer };
