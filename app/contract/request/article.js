'use strict';

module.exports = {
  // 新建
  createArticleRequest: {
    user_id: { type: 'integer', required: true, description: '用户id' },
    tag_id: { type: 'integer', required: true, description: '标签id' },
    username: { type: 'string', required: true, description: '用户名' },
    status: { type: 'integer', required: true, description: '状态 0: 保存, 1:发布, 2:屏蔽' },
    title: { type: 'string', required: true, description: '标题' },
    type: { type: 'string', required: false, description: '文章类型' },
    description: { type: 'string', required: false, desÎcription: '简介' },
    content: { type: 'text', required: false, description: '内容' },
  },


  // 删除
  deleteArticleRequest: {
    article_id: { type: 'integer', required: true, description: '文章id' },
  },


  // 编辑
  updateArticleRequest: {
    article_id: { type: 'integer', required: true, description: '文章id' },
    user_id: { type: 'integer', required: true, description: '用户id' },
    tag_id: { type: 'integer', required: true, description: '标签id' },
    username: { type: 'string', required: true, description: '用户名' },
    status: { type: 'integer', required: true, description: '状态 0: 保存, 1:发布, 2:屏蔽' },
    title: { type: 'string', required: true, description: '标题' },
    type: { type: 'string', required: false, description: '文章类型' },
    description: { type: 'string', required: false, desÎcription: '简介' },
    content: { type: 'text', required: false, description: '内容' },
  },

  // 查询文章列表
  getArticleListRequest: {
    page: { type: 'integer', required: true, description: '页码' },
    pageSize: { type: 'integer', required: true, description: '数量' },
    status: { type: 'integer', required: false, description: '文章状态 0:保存,1:发布,2:屏蔽' },
    tag_id: { type: 'integer', required: false, description: '文章标签id' },
    type: { type: 'string', required: false, description: '文章类型' },
  },

  // 搜索文章
  searchArticleListRequest: {
    keyword: { type: 'string', required: true, description: '关键字, 搜索标题,内容,简介' },
  },
  // 发布文章
  publishArticleRequest: {
    article_id: { type: 'integer', required: true, description: '文章id' },
  },
  // 移除文章
  shieldArticletRequest: {
    article_id: { type: 'integer', required: true, description: '文章id' },
  },
};
