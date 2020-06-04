'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/demo', controller.home.demo);
  router.get('/dashboard', app.jwt, controller.home.dashboard);
  require('./router/user')(app);
  require('./router/article')(app);
  require('./router/tag')(app);
  require('./router/comment')(app);
  require('./router/upload')(app);
};
