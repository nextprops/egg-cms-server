'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    const {
      INTEGER,
      STRING,
      TEXT,
    } = Sequelize;
    return queryInterface.createTable('systemLog', {
      id: {
        type: INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: INTEGER(10),
        allowNull: true,
        comment: '用户id',
      },
      username: {
        type: STRING(50),
        allowNull: true,
        comment: '用户名',
      },
      method: {
        type: STRING(200),
        allowNull: true,
        comment: '请求方法',
      },
      url: {
        type: STRING(200),
        allowNull: true,
        comment: '路由',
      },
      ip: {
        type: STRING(64),
        allowNull: true,
        comment: 'ip地址',
      },
      create_time: {
        type: STRING(50),
        allowNull: true,
        comment: '创建时间',
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('systemLog');
  },
};

