'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/tag/add', app.jwt, controller.tag.add);
  router.post('/tag/update', app.jwt, controller.tag.update);
  router.post('/tag/list', controller.tag.list);
  router.delete('/tag/delete', app.jwt, controller.tag.delete);
};
