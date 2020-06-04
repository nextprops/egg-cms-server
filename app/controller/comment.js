'use strict';

const Controller = require('egg').Controller;


/**
 * @controller comment 留言接口
 */

class CommentController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.CommentService = ctx.service.comment;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @summary 创建留言
   * @description 创建留言
   * @router post /comment/add
   * @request body createCommentRequest *body
   * @response 200 baseResponse 创建成功
   */

  async add() {
    const params = this.ctx.request.body;
    this.ctx.validate({
      content: { type: 'string', required: true, allowEmpty: false },
      article_id: { type: 'integer', required: true },
    }, params);
    const response = await this.CommentService.add(params);
    this.ctx.body = response;
  }

  /**
   * @summary 公开留言
   * @description 公开留言
   * @router get /comment/publish
   * @request body publishArticleRequest *body
   * @response 200 baseResponse 操作成功
   */
  async publish() {
    const { comment_id } = this.ctx.query;
    const response = await this.CommentService.updateStatus(comment_id, 1);
    this.ctx.body = response;
  }
  /**
   * @summary 屏蔽留言
   * @description 屏蔽留言
   * @router get /comment/shield
   * @request body shieldArticletRequest *body
   * @response 200 baseResponse 操作成功
   */
  async shield() {
    const { comment_id } = this.ctx.query;
    const response = await this.CommentService.updateStatus(comment_id, 0);
    this.ctx.body = response;
  }

  /**
   * @summary 留言列表
   * @description 留言列表
   * @router get /comment/list
   * @response 200 baseResponse 查询成功
   */
  async list() {
    const params = this.ctx.request.body;
    const comments = await this.CommentService.list(params);
    this.ctx.body = comments;
  }

  /**
   * @summary 删除留言
   * @description 根据留言ID删除留言
   * @router delete /comment/delete
   * @request query string comment_id eg: 留言id
   * @response 200 baseResponse 删除成功
   */
  async delete() {
    const { comment_id } = this.ctx.query;
    const response = await this.CommentService.delete(comment_id);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(this.ctx.query, request, response);
  }

}

module.exports = CommentController;
