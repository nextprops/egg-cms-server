'use strict';

const Controller = require('egg').Controller;


/**
 * @controller article 文章接口
 */

class ArticleController extends Controller {

  constructor(ctx) {
    super(ctx);
    this.ArticleService = ctx.service.article;
    this.SystemLogService = ctx.service.systemLog;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * @summary 创建文章
   * @description 创建文章，记录文章账户/密码/类型
   * @router post /article/add
   * @request body createArticleRequest *body
   * @response 200 baseResponse 创建成功
   */

  async add() {
    const params = this.ctx.request.body;
    this.ctx.validate({
      title: { type: 'string', required: true, allowEmpty: false },
      status: { type: 'integer', required: true, allowEmpty: false },
      description: { type: 'string', required: true, allowEmpty: false },
      content: { type: 'string', required: false, allowEmpty: true },
      tag_id: { type: 'integer', required: true },
      user_id: { type: 'integer', required: true },
      username: { type: 'string', required: true },
    }, params);
    const response = await this.ArticleService.add(params);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(params, request, response);
  }


  /**
   * @summary 编辑文章
   * @description 编辑文章
   * @router post /article/update
   * @request header string Authorization eg: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg4NDA3MDEwfQ.5Sm5jEJN2q5us5jKS_Noih2IgysRby6tvd2y2G-Onh0
   * @request body updateArticleRequest *body
   * @response 200 baseResponse 登出成功
   */
  async update() {
    const params = this.ctx.request.body;
    const response = await this.ArticleService.update(params);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(params, request, response);
  }


  /**
   * @summary 文章详情
   * @description 根据文章ID查询文章详情
   * @router get /article/detail
   * @request query string article_id eg: 文章id
   * @response 200 baseResponse 查询成功
   */
  async detail() {
    const { article_id } = this.ctx.query;
    const response = await this.ArticleService.detail(article_id);
    this.ctx.body = response;
  }


  /**
   * @summary 文章列表
   * @description 分页查询文章列表
   * @router post /article/list
   * @request body getArticleListRequest *body
   * @response 200 baseResponse 查询成功
   */
  async list() {
    const params = this.ctx.request.body;
    const articles = await this.ArticleService.list(params);
    this.ctx.body = articles;
  }

  /**
   * @summary 搜索文章
   * @description 搜索文章
   * @router get /article/list
   * @request body searchArticleListRequest *body
   * @response 200 baseResponse 查询成功
   */
  async search() {
    const { keyword } = this.ctx.query;
    const articles = await this.ArticleService.search(keyword);
    this.ctx.body = articles;
  }

  /**
   * @summary 发布文章
   * @description 发布文章
   * @router get /article/publish
   * @request body publishArticleRequest *body
   * @response 200 baseResponse 查询成功
   */
  async publish() {
    const { article_id } = this.ctx.query;
    const articles = await this.ArticleService.updateStatus(article_id, 1);
    this.ctx.body = articles;
  }
  /**
   * @summary 屏蔽文章
   * @description 屏蔽文章
   * @router get /article/shield
   * @request body shieldArticletRequest *body
   * @response 200 baseResponse 查询成功
   */
  async shield() {
    const { article_id } = this.ctx.query;
    const articles = await this.ArticleService.updateStatus(article_id, 2);
    this.ctx.body = articles;
  }

  /**
   * @summary 删除文章
   * @description 根据文章ID删除文章
   * @router delete /article/delete
   * @request header string Authorization eg: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTg4NDA3MDEwfQ.5Sm5jEJN2q5us5jKS_Noih2IgysRby6tvd2y2G-Onh0
   * @request query string article_id eg: 文章id
   * @response 200 baseResponse 删除成功
   */
  async delete() {
    const { article_id } = this.ctx.query;
    const response = await this.ArticleService.delete(article_id);
    const request = this.ctx.request;
    this.ctx.body = response;
    this.ctx.service.systemLog.add(this.ctx.query, request, response);
  }

}

module.exports = ArticleController;
