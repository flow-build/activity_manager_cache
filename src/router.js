const Router = require('@koa/router');
const ct = require('./controllers');

module.exports = (opts = {}) => {
  const router = new Router();

  router.get('/', ct.get);

  for (let middleware of opts.middlewares) {
    router.use(middleware);
  }

  router.get('/activities/available', ct.act.activities);
  router.get('/processes/:id/activity', ct.act.activity);
  router.get('/processes/activityManager/:id', ct.act.activity_manager);

  return router.routes();
};
