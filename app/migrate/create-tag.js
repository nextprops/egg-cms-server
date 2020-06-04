'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    const {
      INTEGER,
      STRING,
    } = Sequelize;
    return queryInterface.createTable('tag', {
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
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('tag');
  },
};

