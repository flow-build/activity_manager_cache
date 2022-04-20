const { _logger } = require('./logger');

module.exports = (queue) => async (topic, message) => {
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
};
