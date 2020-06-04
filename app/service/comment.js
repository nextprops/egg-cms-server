'use strict';

const Service = require('egg').Service;


class CommentService extends Service {
  constructor(ctx) {
    super(ctx);
    this.CommentModel = ctx.model.Comment;
    this.ArticleModel = ctx.model.Article;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }


  // 新增
  async add(params) {
    params.create_time = `${new Date().getTime()}`;
    params.status = 0; // 默认添加为不可见
    try {
      const res = await this.CommentModel.create(params);
      const article = await this.ArticleModel.findOne({
        where: {
          article_id: params.article_id,
        },
      });
      const comment_total = (article.comment_total || 0) + 1;
      await this.ArticleModel.update({ comment_total }, {
        where: {
          article_id: params.article_id,
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('新建失败');
      return this.ServerResponse.createBySuccessMsgAndData('新建成功', res.toJSON());
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }

  // 改变状态
  async updateStatus(comment_id, status) {
    const params = {
      status,
    };
    try {
      await this.CommentModel.update(params, {
        where: {
          comment_id,
        },
      });
      return this.ServerResponse.createBySuccessMsgAndData('发布成功', {});
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }


  // 删除
  async delete(id) {
    try {
      const res = await this.CommentModel.destroy({
        where: {
          comment_id: id,
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('删除失败');
      return this.ServerResponse.createBySuccessMsgAndData('删除成功', res);
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }


  // 分页查询/全部查询
  async list(params) {
    // 单篇文章如果留言很多,需要分页
    const where = {
      status: params.status,
    };
    if (params.article_id) {
      where.article_id = params.article_id;
    }
    console.log('======>', where);
    if (Number(params.page) > 0 && Number(params.pageSize) > 0) {
      const {
        count,
        rows,
      } = await this.CommentModel.findAndCount({
        where,
        offset: (Number(params.page) - 1) * Number(params.pageSize),
        limit: Number(params.pageSize),
      });
      return this.ServerResponse.createBySuccessMsgAndData('留言列表查询成功', {
        list: rows || [],
        count: rows.length || 0,
        total: count,
      });
    }
    const list = await this.CommentModel.findAll({
      where: {
        article_id: Number(params.article_id),
      },
    });
    return this.ServerResponse.createBySuccessMsgAndData('留言列表查询成功', {
      list,
      total: list.length,
    });

  }
}

module.exports = CommentService;
