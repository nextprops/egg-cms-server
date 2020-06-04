'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const md5 = require('md5');
const _ = require('lodash');

class ArticleService extends Service {
  constructor(ctx) {
    super(ctx);
    this.ArticleModel = ctx.model.Article;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }


  // 新增
  async add(params) {
    if (!params.create_time) {
      params.create_time = `${new Date().getTime()}`;
    }
    try {
      const res = await this.ArticleModel.create(params);
      if (!res) return this.ServerResponse.createByErrorMsg('新建失败');
      return this.ServerResponse.createBySuccessMsgAndData('新建成功', {});
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }


  // 删除
  async delete(id) {
    try {
      const res = await this.ArticleModel.destroy({
        where: {
          article_id: id,
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('删除失败');
      return this.ServerResponse.createBySuccessMsgAndData('删除成功', res);
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }


  // 编辑
  async update(params) {
    params.update_time = Date.now();
    try {
      await this.ArticleModel.update(params, {
        where: {
          article_id: params.article_id,
        },
      });
      const res = await this.ArticleModel.findOne({
        where: {
          article_id: params.article_id,
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('编辑失败');
      return this.ServerResponse.createBySuccessMsgAndData('编辑成功', res);
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }

  // 改变状态
  async updateStatus(article_id, status) {
    const params = {
      update_time: Date.now(),
      status,
      article_id,
    };

    try {
      await this.ArticleModel.update(params, {
        where: {
          article_id: params.article_id,
        },
      });
      const res = await this.ArticleModel.findOne({
        where: {
          article_id: params.article_id,
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('编辑失败');
      return this.ServerResponse.createBySuccessMsgAndData('编辑成功', res);
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }


  // 详情
  async detail(id) {
    try {
      const res = await this.ArticleModel.findOne({
        where: {
          article_id: id,
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('查询失败');
      return this.ServerResponse.createBySuccessMsgAndData('查询成功', res.toJSON());
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }
  // 搜索
  async search(keyword) {
    try {
      const rows = await this.ArticleModel.findAll({
        where: {
          [Op.or]: [
            {
              content: {
                // 模糊查询
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              title: {
                // 模糊查询
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              type: {
                // 模糊查询
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              keyword: {
                // 模糊查询
                [Op.like]: `%${keyword}%`,
              },
            },
            {
              description: {
                // 模糊查询
                [Op.like]: `%${keyword}%`,
              },
            },
          ],
        },
        attributes: {
          exclude: [ 'content' ],
        },
      });
      return this.ServerResponse.createBySuccessMsgAndData('查询成功', {
        list: rows || [],
        total: rows.length || 0,
      });
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }

  // 分页查询/全部查询
  async list(params) {
    // order: [
    //   [ 'create_time', 'DESC' ],
    // ],
    const where = {};
    if (params.status) {
      where.status = Number(params.status);
    }
    if (params.tag_id) {
      where.tag_id = Number(params.tag_id);
    }
    if (params.type) {
      where.type = params.type;
    }
    if (Number(params.page) > 0 && Number(params.pageSize) > 0) {
      const {
        count,
        rows,
      } = await this.ArticleModel.findAndCount({
        where,
        attributes: {
          exclude: [ 'content' ],
        },
        offset: (Number(params.page) - 1) * Number(params.pageSize),
        limit: Number(params.pageSize),
        order: params.order || [],
      });
      return this.ServerResponse.createBySuccessMsgAndData('文章列表查询成功', {
        list: rows || [],
        count: rows.length || 0,
        total: count,
      });
    }
    const list = await this.ArticleModel.findAll({
      where: {
        exclude: [ 'content' ],
        status: params.status ? Number(params.status) : [ 0, 1, 2 ],
      },
    });
    return this.ServerResponse.createBySuccessMsgAndData('文章列表查询成功', {
      list,
      total: list.length,
    });

  }
}

module.exports = ArticleService;
