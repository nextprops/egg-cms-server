'use strict';

module.exports = {
  // 新建
  createCommentRequest: {
    article_id: { type: 'integer', required: true, description: '文章id' },
    article_name: { type: 'string', required: true, description: '文章名称' },
    content: { type: 'string', required: true, description: '评论内容' },
    email: { type: 'string', required: true, description: '邮箱' },
    real_name: { type: 'string', required: true, description: '称呼' },
  },

};
