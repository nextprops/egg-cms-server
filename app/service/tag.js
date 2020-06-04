'use strict';

const Service = require('egg').Service;


class TagService extends Service {
  constructor(ctx) {
    super(ctx);
    this.TagModel = ctx.model.Tag;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }


  // 新增
  async add(params) {
    params.create_time = `${new Date().getTime()}`;
    try {
      const res = await this.TagModel.create(params);
      if (!res) return this.ServerResponse.createByErrorMsg('新建失败');
      return this.ServerResponse.createBySuccessMsgAndData('新建成功', res.toJSON());
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }


  // 删除
  async delete(id) {
    try {
      const res = await this.TagModel.destroy({
        where: {
          tag_id: id,
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
      await this.TagModel.update(params, {
        where: {
          tag_id: params.tag_id,
        },
      });
      const res = await this.TagModel.findOne({
        where: {
          tag_id: params.tag_id,
        },
      });
      if (!res) return this.ServerResponse.createByErrorMsg('编辑失败');
      return this.ServerResponse.createBySuccessMsgAndData('编辑成功', res);
    } catch (e) {
      return this.ServerResponse.logError(e);
    }
  }

  // 分页查询/全部查询
  async list(params) {
    const find = {};
    if (params.type) {
      find.where = {
        type: params.type,
      };
    }
    if (Number(params.page) > 0 && Number(params.pageSize) > 0) {
      find.offset = (Number(params.page) - 1) * Number(params.pageSize);
      find.limit = Number(params.pageSize);
      const {
        count,
        rows,
      } = await this.TagModel.findAndCount(find);
      return this.ServerResponse.createBySuccessMsgAndData('列表查询成功', {
        list: rows || [],
        count: rows.length || 0,
        total: count,
      });
    }
    const {
      count,
      rows,
    } = await this.TagModel.findAndCount(find);
    return this.ServerResponse.createBySuccessMsgAndData('列表查询成功', {
      list: rows || [],
      total: count,
    });

  }
}

module.exports = TagService;
