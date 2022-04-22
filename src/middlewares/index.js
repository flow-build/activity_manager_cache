const jwtMiddleware = require('./jwt');
const { captureActorData } = require('./actor_data');

module.exports = { jwtMiddleware, captureActorData };
