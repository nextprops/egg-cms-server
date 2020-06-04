'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');

/**
 * @controller user 用户接口
 */

class UserController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.UserService = ctx.service.user;
    this.SystemLogService = ctx.service.systemLog;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  // 创建目录
  mkdir(response, username) {
    if (response.success === 200) {
      const target = path.join(this.config.baseDir, `../public/${username}`);
      console.log('====>target', target);
      fs.mkdir(target, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  // 删除目录
  rmdir(response, username) {
    if (response.success === 200) {
      const target = path.join(this.config.baseDir, `../public/${username}`);
      console.log('====>target', target);
      fs.rmdir(target, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router post /user/add
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */

  async add() {
    const params = this.ctx.request.body;
    const response = await this.UserService.add(params);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(params, request, response);
    this.mkdir(response, params.username);
  }

  /**
   * @summary 登录
   * @description 用户登录，
   * @router post /user/login
   * @request body loginRequest *body
   * @response 200 baseResponse 登录成功
   */
  async login() {
    const { ctx, app, UserService, SystemLogService, config } = this;
    const params = ctx.request.body;
    const token = app.jwt.sign({
      username: params.username,
    }, config.jwt.secret, { expiresIn: 60 * 60 * 4 });
    params.token = token;
    const response = await UserService.login(params);
    const request = ctx.request;
    ctx.body = response;
    await SystemLogService.add(params, request, response);

    if (response.data) {
      response.data.token = token;
    }
    // if (response.isSuccess()) {}

    ctx.body = response;
  }

  /**
   * @summary 登出
   * @description 用户登出，
   * @router get /user/logout
   * @request query string user_id eg: 用户id
   * @response 200 baseResponse 登出成功
   */
  async logout() {
    const query = this.ctx.query;
    const users = await this.UserService.logout(query);
    this.ctx.body = users;
  }


  /**
   * @summary 编辑用户
   * @description 编辑用户
   * @router post /user/update
   * @request header string Authorization eg: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg4NDA3MDEwfQ.5Sm5jEJN2q5us5jKS_Noih2IgysRby6tvd2y2G-Onh0
   * @request body updateUserRequest *body
   * @response 200 baseResponse 登出成功
   */
  async update() {
    const params = this.ctx.request.body;
    const response = await this.UserService.update(params);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(params, request, response);
  }

  /**
   * @summary 用户详情
   * @description 根据用户ID查询用户详情
   * @router get /user/detail
   * @request header string Authorization eg: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg4NDA3MDEwfQ.5Sm5jEJN2q5us5jKS_Noih2IgysRby6tvd2y2G-Onh0
   * @request query string user_id eg: 用户id
   * @response 200 baseResponse 登录成功
   */
  async detail() {
    const { user_id } = this.ctx.query;
    const response = await this.UserService.detail(user_id);
    this.ctx.body = response;
  }


  /**
   * @summary 用户列表
   * @description 分页查询用户列表
   * @router post /user/list
   * @request header string Authorization eg: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg4NDA3MDEwfQ.5Sm5jEJN2q5us5jKS_Noih2IgysRby6tvd2y2G-Onh0
   * @request body getUserListRequest *body
   * @response 200 baseResponse 登录成功
   */
  async list() {
    const params = this.ctx.request.body;
    const users = await this.UserService.list(params);
    this.ctx.body = users;
  }

  /**
   * @summary 删除用户
   * @description 根据用户ID查询用户详情
   * @router delete /user/delete
   * @request header string Authorization eg: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg4NDA3MDEwfQ.5Sm5jEJN2q5us5jKS_Noih2IgysRby6tvd2y2G-Onh0
   * @request query string user_id eg: 用户id
   * @response 200 baseResponse 登录成功
   */
  async delete() {
    const { user_id, username } = this.ctx.query;
    const response = await this.UserService.delete(user_id);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(this.ctx.query, request, response);
    this.rmdir(response, username);
  }

}

module.exports = UserController;
