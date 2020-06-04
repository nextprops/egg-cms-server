'use strict';
module.exports = app => {
  const {
    INTEGER,
    STRING,
    TEXT,
  } = app.Sequelize;

  const ArticleModel = app.model.define('article',
    {
      article_id: {
        type: INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comments: '文章ID',
      },
      user_id: {
        type: INTEGER(10),
        allowNull: false,
        comments: '用户ID',
      },
      tag_id: {
        type: INTEGER(10),
        allowNull: false,
        comments: '标签ID',
      },
      tag_name: {
        type: STRING(50),
        allowNull: false,
        comments: '标签名',
      },
      username: {
        type: STRING(50),
        allowNull: false,
        comments: '用户名',
      },
      real_name: {
        type: STRING(50),
        allowNull: false,
        comments: '作者',
      },
      type: {
        type: STRING(50),
        allowNull: true,
        comments: '类型',
      },
      keyword: {
        type: STRING(250),
        allowNull: true,
        comments: '关键字',
      },
      status: {
        type: INTEGER(10),
        allowNull: false,
        comments: '文章状态 0:保存, 1:发布, 2:屏蔽',
      },
      title: {
        type: STRING(100),
        allowNull: false,
        comment: '文章标题',
      },
      description: {
        type: STRING,
        allowNull: true,
        comment: '文章简介',
      },
      content: {
        type: TEXT,
        allowNull: true,
        comments: '文章内容 MD',
      },
      comment_total: {
        type: INTEGER(32),
        allowNull: false,
        comments: '留言数',
        defaultValue: 0,
      },
      create_time: {
        type: STRING(50),
        allowNull: true,
        comments: '创建时间 时间戳 STRING',
      },
      update_time: {
        type: STRING(50),
        allowNull: true,
        comments: '更新时间 时间戳 STRING',
      },
    },
    {
      timestamps: false,
      tableName: 'article',
    }
  );

  ArticleModel.beforeBulkUpdate(article => {
    article.attributes.updateTime = new Date();
    return article;
  });

  ArticleModel.beforeCreate(article => {
    return article;
  });

  return ArticleModel;
};
