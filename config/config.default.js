'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1521088945166_6453';

  // add your config here
  config.middleware = [ 'responseTime' ];


  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
    allowHeaders: 'Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,uploadpath,origin,X-Requested-With',
  };

  config.jwt = {
    secret: 'cms',
    getToken(ctx) {
      if (
        ctx.headers.authorization &&
        (ctx.headers.authorization.split(' ')[0] === 'Bearer' ||
          ctx.headers.authorization.split(' ')[0] === 'Token')
      ) {
        return ctx.headers.authorization.split(' ')[1];
      } else if (ctx.query && ctx.query.token) {
        return ctx.query.token;
      }
      return null;
    },
  };

  // 公用：获取客户端IP
  config.getClientIP = function(ctx) {
    const req = ctx.request;
    const ip = ctx.ip ||
      req.headers['x-forwarded-for'] ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress || '';
    const arr = ip.match(/(\d{1,3}\.){3}\d{1,3}/);
    return arr ? arr[0] : '';
  };

  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg-mysql-server-api',
      description: 'example for swaggerdoc',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    enable: true,
    routerMap: false,
  };

  config.view = {
    mapping: {
      '.html': 'nunjucks',
    },
  };

  // 上传文件的配置
  // https://github.com/eggjs/egg-multipart
  config.multipart = {
    // 只允许上传的图片格式
    whitelist: [ '.png', '.jpg', '.jpeg' ],
    // 文件允许大小
    fileSize: '50mb',
  };


  return config;
};
