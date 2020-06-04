'use strict';

const Controller = require('egg').Controller;


/**
 * @controller tag 标签接口
 */

class TagController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.TagService = ctx.service.tag;
    this.SystemLogService = ctx.service.systemLog;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @summary 创建标签
   * @description 创建标签
   * @router post /tag/add
   * @request body createTagRequest *body
   * @response 200 baseResponse 创建成功
   */

  async add() {
    const params = this.ctx.request.body;
    this.ctx.validate({
      tag_name: { type: 'string', required: true, allowEmpty: false },
      user_id: { type: 'integer', required: true },
      username: { type: 'string', required: true },
    }, params);
    const response = await this.TagService.add(params);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(params, request, response);
  }


  /**
   * @summary 编辑标签
   * @description 编辑标签
   * @router post /tag/update
   * @request header string Authorization eg: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg4NDA3MDEwfQ.5Sm5jEJN2q5us5jKS_Noih2IgysRby6tvd2y2G-Onh0
   * @request body updateTagRequest *body
   * @response 200 baseResponse 编辑成功
   */
  async update() {
    const params = this.ctx.request.body;
    this.ctx.validate({
      tag_name: { type: 'string', required: true, allowEmpty: false },
      user_id: { type: 'integer', required: true },
      tag_id: { type: 'integer', required: true },
      username: { type: 'string', required: true },
    }, params);
    const response = await this.TagService.update(params);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(params, request, response);
  }

  /**
   * @summary 标签列表
   * @description 标签列表
   * @request body getTagListRequest *body
   * @router post /tag/list
   * @response 200 baseResponse 查询成功
   */
  async list() {
    const params = this.ctx.request.body;
    const tags = await this.TagService.list(params);
    this.ctx.body = tags;
  }

  /**
   * @summary 删除标签
   * @description 根据标签ID删除标签
   * @router delete /tag/delete
   * @request header string Authorization eg: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg4NDA3MDEwfQ.5Sm5jEJN2q5us5jKS_Noih2IgysRby6tvd2y2G-Onh0
   * @request query string tag_id eg: 标签id
   * @response 200 baseResponse 删除成功
   */
  async delete() {
    const { tag_id } = this.ctx.query;
    const response = await this.TagService.delete(tag_id);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(this.ctx.query, request, response);
  }

}

module.exports = TagController;
