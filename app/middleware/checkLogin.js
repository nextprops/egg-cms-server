const jwt = require('jsonwebtoken');

// const {
//   ROLE_ADMAIN,
// } = require('../common/role');

// module.exports = options => {

//   return async function checkLogin(ctx, next) {
//     const user = ctx.session.currentUser;
//     console.info(ctx)
//     if (!user) return ctx.body = ctx.response.ServerResponse.createByErrorCodeMsg(
//       ctx.response.ResponseCode.NEED_LOGIN, '用户未登录');

//     // if (options.checkAdmin && user.role !== ROLE_ADMAIN) return ctx.body = ctx.response.ServerResponse.createByErrorCodeMsg(ctx.response.ResponseCode.NO_AUTH, '用户不是管理员无权操作');
//     // else await next();

//     await next();
//   };
// };


module.exports = options => {
  return async function checkLogin(ctx, next) {
    const token = ctx.request.header.authorization;
    if (token) {
      console.log('===========>', token);
      await next();
    } else {
      // 缺少token，则跳转到登陆页面
      return ctx.body = ctx.response.ServerResponse.createByErrorCodeMsg(
        ctx.response.ResponseCode.NEED_LOGIN, '用户未登录');
    }
  };
};
