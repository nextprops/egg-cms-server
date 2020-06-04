'use strict';

const Service = require('egg').Service;
const md5 = require('md5');
const _ = require('lodash');

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.UserModel = ctx.model.User
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }
  /**
   *
   * @param field {String}
   * @param value {String}
   * @return {Promise.<boolean>}
   */
  async _checkExistColByField(field, value) {
    const data = await this.UserModel.findOne({
      attributes: [field],
      where: {
        [field]: value
      },
    });
    return !!data;
  }


  /**
   * @feature 校验 username email
   * @param value {String}
   * @param type {String}
   * @return ServerResponse.msg
   */
  async checkValid(type, value) {
    if (type.trim()) {
      if (type === 'username') {
        return await this._checkExistColByField(type, value) ?
          this.ServerResponse.createByErrorMsg('用户名已存在') :
          this.ServerResponse.createBySuccessMsg('用户名不存在');
      }
      if (type === 'email') {
        return await this._checkExistColByField(type, value) ?
          this.ServerResponse.createByErrorMsg('邮箱已存在') :
          this.ServerResponse.createBySuccessMsg('邮箱不存在');
      }
    }
    return this.ServerResponse.createByErrorMsg('参数错误');
  }


  /**
 * 新增用户
 */
  async add(params) {
    const { username } = params;
    params.password = md5(params.password);
    params.create_time = `${new Date().getTime()}`;

    // 检查是否已存在名称
    const validResponse = await this.checkValid('username', username);
    if (validResponse.error) {
      return this.ServerResponse.createByErrorMsg('用户名已存在')
    }
    try {
      const res = await this.UserModel.create(params, {
        attributes: {
          exclude: ['password']
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('try注册失败');
      _.unset(params, 'password');
      return this.ServerResponse.createBySuccessMsgAndData('注册成功', res.toJSON());
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }

  /**
   * 登录
   */
  async login(params) {
    const { username, password, token } = params;
    // 检查用户名
    const validResponse = await this.checkValid('username', username);
    if (validResponse.isSuccess()) return validResponse;

    // 检查密码是否正确
    const user = await this.UserModel.findOne({
      attributes: {
        exclude: ['password', 'user_extend']
      },
      where: {
        username,
        password: md5(password),
      },
    });
    if (!user) return this.ServerResponse.createByErrorMsg('密码错误');
    const userInfo = user.toJSON()

    // 更新登录信息
    if (userInfo.login_time_now) {
      userInfo.login_time_last = userInfo.login_time_now;
    }


    userInfo.login_time_now = `${new Date().getTime()}`;
    userInfo.token = token;
    this.UserModel.update(userInfo, {
      where: {
        user_id: userInfo.user_id
      },
    });
    let redirectTo = '';
    return this.ServerResponse.createBySuccessMsgAndData('登录成功', { ...userInfo, redirectTo });
  }

  /**
   * 登出
   */
  async logout(params) {
    const { user_id, token } = params;

    const user = await this.UserModel.findOne({
      where: {
        user_id,
      },
    });
    const userInfo = user.toJSON()

    userInfo.token = "";
    this.UserModel.update(userInfo, {
      where: {
        user_id: user_id,
      },
    });
    let redirectTo = '';
    return this.ServerResponse.createBySuccessMsgAndData('登出成功');
  }

  //删除用户
  async delete(id) {
    try {
      const res = await this.UserModel.destroy({
        where: {
          user_id: id
        }
      });
      if (!res) return this.ServerResponse.createByErrorMsg('删除失败');
      return this.ServerResponse.createBySuccessMsgAndData('删除成功', res);
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }

  // 编辑
  async update(params) {
    // 更新时间
    if (params.password) {
      params.password = md5(params.password);
    }
    params.update_time = Date.now();
    try {
      const res = await this.UserModel.update(params, {
        where: {
          user_id: params.user_id
        },
        attributes: {
          exclude: ['password']
        },
      });
      const user = await this.UserModel.findOne({
        attributes: {
          exclude: ['password', 'token']
        },
        where: {
          user_id: params.user_id
        },
      });
      if (!user) return this.ServerResponse.createByErrorMsg('编辑失败');
      return this.ServerResponse.createBySuccessMsgAndData('编辑成功', user);
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }

  // 详情
  async detail(id) {
    try {
      const res = await this.UserModel.findOne({
        attributes: {
          exclude: ['password', 'token']
        },
        where: {
          user_id: id
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('查询失败');
      return this.ServerResponse.createBySuccessMsgAndData('查询成功', res.toJSON());
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }

  //分页查询/全部查询
  async list(params) {
    if (Number(params.page) > 0 &&Number(params.pageSize)> 0) {
      const {
        count,
        rows
      } = await this.UserModel.findAndCount({
        where: {
          role: params.type ? Number(params.type) : [0, 1, 2, 3, 4],
        },
        offset: (Number(params.page) - 1) * Number(params.pageSize),
        limit: Number(params.pageSize)
      });
      return this.ServerResponse.createBySuccessMsgAndData('用户列表查询成功', {
        list: rows || list,
        count: rows.length || 0,
        total: count,
      });
    } else {
      const list = await this.UserModel.findAll({
        where: {
          role: params.type ? Number(params.type) : [0, 1, 2, 3, 4],
        },
      });
      return this.ServerResponse.createBySuccessMsgAndData('用户列表查询成功', {
        list: list,
        total: list.length
      });
    }
  }
}

module.exports = UserService;
