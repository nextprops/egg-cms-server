'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/article/add', app.jwt, controller.article.add);
  router.post('/article/update', app.jwt, controller.article.update);
  router.post('/article/list', controller.article.list);
  router.get('/article/search', controller.article.search);
  router.get('/article/detail', controller.article.detail);
  router.get('/article/publish', app.jwt, controller.article.publish);
  router.get('/article/shield', app.jwt, controller.article.shield);
  router.delete('/article/delete', app.jwt, controller.article.delete);
};
