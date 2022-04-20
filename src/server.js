require('dotenv').config();

const { startServer } = require('./app');

const server = startServer(process.env.PORT || 3000);

module.exports = server;
