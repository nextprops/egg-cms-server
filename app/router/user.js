'use strict';

module.exports = app => {
  const { router, controller } = app;
  // const checkLogin = app.middleware.checkLogin({});
  router.post('/user/login', controller.user.login);
  router.post('/user/add', controller.user.add);
  router.post('/user/update', app.jwt, controller.user.update);
  router.delete('/user/delete', app.jwt, controller.user.delete);
  router.get('/user/logout', app.jwt, controller.user.logout);
  router.post('/user/list', app.jwt, controller.user.list);
  router.get('/user/detail', app.jwt, controller.user.detail);
};
