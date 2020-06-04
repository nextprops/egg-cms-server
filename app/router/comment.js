'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/comment/add', controller.comment.add);
  router.post('/comment/list', controller.comment.list);
  router.get('/comment/publish', app.jwt, controller.comment.publish);
  router.get('/comment/shield', app.jwt, controller.comment.shield);
  router.delete('/comment/delete', app.jwt, controller.comment.delete);
};
