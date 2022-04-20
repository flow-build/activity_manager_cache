const axios = require('axios');
const { v1: uuid, v4: uuidv4 } = require('uuid');

async function sendEvent(event) {
  if (process.env.NEW_RELIC_ENABLED) {
    const nr_account_id = process.env.NEW_RELIC_ACCOUNT_ID;
    const license_key = process.env.NEW_RELIC_INSIGHTS_API_KEY;

    try {
      const URL =
        process.env.NEW_RELIC_INSIGHTS_API ||
        `https://insights-collector.newrelic.com/v1/accounts/${nr_account_id}/events`;
      return await axios({
        method: 'post',
        url: URL,
        data: event,
        headers: {
          'X-License-Key': license_key,
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      return e;
    }
  }
}

async function sendMetric(data) {
  if (process.env.NEW_RELIC_ENABLED) {
    const license_key = process.env.NEW_RELIC_INSIGHTS_API_KEY;

    let metric = [
      {
        name: data.metric,
        type: data.type, //count, distribution, gauge, summary, uniqueCount
        value: data.value,
        timestamp: Math.floor(new Date().getTime() / 1000),
        attributes: data.attributes,
      },
    ];

    try {
      const URL =
        process.env.NEW_RELIC_METRIC_API ||
        'https://metric-api.newrelic.com/metric/v1';

      return await axios({
        method: 'post',
        url: URL,
        data: metric,
        headers: {
          'Api-Key': license_key,
          'Content-Type': 'application/json',
          'x-request-id': uuidv4(),
        },
      });
    } catch (e) {
      return e;
    }
  }
}

async function sendTrace(workflow_name, process_id, root_id, name, duration) {
  if (process.env.NEW_RELIC_ENABLED) {
    const license_key = process.env.NEW_RELIC_INSIGHTS_API_KEY;

    let data = [
      {
        common: {
          attributes: {
            'service.name': 'flowbuild',
          },
        },
        spans: [
          {
            'trace.id': process_id,
            id: uuid(),
            attributes: {
              'duration.ms': duration,
              name: name,
              'parent.id': root_id,
              workflow_name: workflow_name,
            },
          },
        ],
      },
    ];

    try {
      const URL =
        process.env.NEW_RELIC_TRACE_API ||
        'https://trace-api.newrelic.com/trace/v1';
      return await axios({
        method: 'post',
        url: URL,
        data: JSON.stringify(data),
        headers: {
          'Api-Key': license_key,
          'Data-Format': 'newrelic',
          'Data-Format-Version': 1,
          'Content-Type': 'application/json',
        },
      });
    } catch (e) {
      return e;
    }
  }
}

module.exports = {
  sendEvent,
  sendTrace,
  sendMetric,
};
