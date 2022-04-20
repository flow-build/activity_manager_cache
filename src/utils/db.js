const Knex = require('knex');
const knexConfig = require('../../knexfile');

const _config = knexConfig[process.env.KNEX_ENV || 'docker'];

module.exports = Knex(_config);
