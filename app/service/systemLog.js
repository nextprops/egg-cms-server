'use strict';

const Service = require('egg').Service;

class SystemLogService extends Service {

  constructor(ctx) {
    super(ctx);
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async add(data, request, response) {
    try {
      const params = {
        user_id: response.user_id || data.user_id || 1, // 有待考虑 客户端取
        username: response.username || data.username || 1, // 有待考虑 客户端取
        url: request.url,
        method: request.method,
        create_time: `${Date.now()}`,
        ip: 1000000, // 客户端取
      };
      const res = await this.ctx.model.SystemLog.create(params, { attributes: {} });
      return this.ServerResponse.createBySuccessMsgAndData('记录成功', res.toJSON());
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }


}

module.exports = SystemLogService;

