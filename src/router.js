const Router = require('@koa/router');
const ct = require('./controllers');

module.exports = (opts = {}) => {
  const router = new Router();

  router.get('/processes/:id/activity')
  router.get('/processes/activityManager/:id')
  router.get('/', ct.get);

  return router.routes();
};
