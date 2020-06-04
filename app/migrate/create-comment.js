'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    const {
      INTEGER,
      STRING,
      TEXT,
    } = Sequelize;
    return queryInterface.createTable('comment', {
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
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('comment');
  },
};
