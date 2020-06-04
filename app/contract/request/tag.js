'use strict';

module.exports = {
  // 新建
  createTagRequest: {
    user_id: { type: 'integer', required: true, description: '用户id' },
    username: { type: 'string', required: true, description: '用户名' },
    tag_name: { type: 'string', required: true, description: '标签名' },
  },


  // 删除
  deleteTagRequest: {
    tag_id: { type: 'integer', required: true, description: '标签id' },
  },

  // 查询标签列表
  getTagListRequest: {
    page: { type: 'integer', required: false, description: '页码' },
    pageSize: { type: 'integer', required: false, description: '数量' },
  },
  // 编辑
  updateTagRequest: {
    tag_id: { type: 'integer', required: true, description: '标签id' },
    user_id: { type: 'integer', required: true, description: '用户id' },
    username: { type: 'string', required: true, description: '用户名' },
    tag_name: { type: 'string', required: true, description: '标签名' },
  },

};
