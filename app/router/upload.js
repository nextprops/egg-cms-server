'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/upload/singleUpload', app.jwt, controller.upload.singleUpload);
};
