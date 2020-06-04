'use strict';

const Service = require('egg').Service;


class HomeService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ArticleModel = ctx.model.Article;
    this.CommentModel = ctx.model.Comment;
    this.TagModel = ctx.model.Tag;
    this.UserModel = ctx.model.User;
    this.SystemLogModel = ctx.model.SystemLog;

    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  // 查询dashboard
  async dashboard() {
    const articleCount = await this.ArticleModel.count();
    const commentCount = await this.CommentModel.count();
    const tagCount = await this.TagModel.count();
    const userCount = await this.UserModel.count();
    const logCount = await this.SystemLogModel.count();
    return this.ServerResponse.createBySuccessMsgAndData('查询成功', {
      articleCount,
      commentCount,
      tagCount,
      userCount,
      logCount,
    });
  }
}

module.exports = HomeService;
