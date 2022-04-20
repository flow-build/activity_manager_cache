const Router = require('@koa/router');
const ct = require('./controllers');

module.exports = (opts = {}) => {
  const router = new Router();

  router.get('/', ct.get);

  for (let middleware of opts.middlewares) {
    router.use(middleware);
  }

  router.get('/processes/:id/activity');
  router.get('/processes/activityManager/:id');

  return router.routes();
};
