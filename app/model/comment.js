'use strict';
module.exports = app => {
  const {
    INTEGER,
    STRING,
    TEXT,
  } = app.Sequelize;

  const Comment = app.model.define('comment',
    {
      comment_id: {
        type: INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      article_id: {
        type: INTEGER(10),
        allowNull: false,
      },
      status: {
        type: INTEGER(10),
        allowNull: false,
      },
      real_name: {
        type: STRING(50),
        allowNull: true,
      },
      article_name: {
        type: STRING(100),
        allowNull: true,
      },
      email: {
        type: STRING(50),
        allowNull: true,
      },
      content: {
        type: TEXT,
        allowNull: false,
      },
      create_time: {
        type: STRING(50),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'comment',
    }
  );

  Comment.beforeBulkUpdate(comment => {
    comment.attributes.updateTime = new Date();
    return comment;
  });

  Comment.beforeCreate(comment => {
    return comment;
  });

  return Comment;
};
