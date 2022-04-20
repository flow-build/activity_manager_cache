const mqtt = require('async-mqtt');
const { v4: uuid } = require('uuid');
const { _logger } = require('./utils');

let client;

const subscribe = async (topic) => {
  if (client && client.connected) {
    _logger.info(`[mqtt] - subscribe on topic: ${topic}`);
    await client.subscribe(topic, { qos: 1 });
  }
};

const publish = async (topic, payload) => {
  if (client && client.connected) {
    _logger.info(`[mqtt] - publish on topic: ${topic}`);
    const message = await client.publish(topic, JSON.stringify(payload));
    _logger.info('[mqtt] - broker response: ', message.messageId);
  }
};

const onMessage = async (callback) => {
  if (client && client.connected) {
    client.on('message', callback);
  }
};

const connect = async () => {
  try {
    _logger.info('[mqtt] - trying to connect broker');
    client = await mqtt.connectAsync({
      hostname: process.env.MQTT_HOST || 'broker.hivemq.com',
      port: process.env.MQTT_PORT || 8000,
      protocol: process.env.MQTT_PROTOCOL || 'ws',
      path: process.env.MQTT_PATH || '/mqtt',
      clientId: uuid(),
    });
    _logger.info('[mqtt] - connected');
  } catch (error) {
    client = null;
    _logger.info(`[mqtt] - error on try connect ${JSON.stringify({ error })}`);
  }
};

module.exports = {
  subscribe,
  publish,
  onMessage,
  connect,
};
