const Router = require('@koa/router');

module.exports = (opts = {}) => {
  const router = new Router();

  router.get('/');

  return router.routes();
};
