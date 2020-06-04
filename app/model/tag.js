'use strict';
module.exports = app => {
  const {
    INTEGER,
    STRING,
  } = app.Sequelize;

  const Tag = app.model.define('tag',
    {
      tag_id: {
        type: INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: INTEGER(10),
        allowNull: false,
      },
      username: {
        type: STRING(50),
        allowNull: false,
      },
      tag_name: {
        type: STRING(200),
        allowNull: false,
      },
      type: {
        type: STRING(200),
        allowNull: true,
      },
      create_time: {
        type: STRING(50),
        allowNull: true,
      },
      update_time: {
        type: STRING(50),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'tag',
    }
  );

  Tag.beforeBulkUpdate(tag => {
    tag.attributes.updateTime = new Date();
    return tag;
  });

  Tag.beforeCreate(tag => {
    return tag;
  });

  return Tag;
};
