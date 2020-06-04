'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    const {
      INTEGER,
      STRING,
    } = Sequelize;
    return queryInterface.createTable('user', {
      user_id: {
        type: INTEGER(10),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role: {
        type: INTEGER(1),
        allowNull: false,
        comment: '用户类型 0:用户;1:管理员',
      },
      group_id: {
        type: INTEGER(32),
        allowNull: true,
        comment: '分组id',
      },
      username: {
        type: STRING(50),
        allowNull: false,
        comment: '用户名',
      },
      real_name: {
        type: STRING(50),
        allowNull: true,
        comment: '姓名',
      },
      password: {
        type: STRING(50),
        allowNull: false,
        comment: '密码',
      },
      email: {
        type: STRING(50),
        allowNull: true,
        comment: '邮箱',
      },
      mobile: {
        type: STRING(50),
        allowNull: true,
        comment: '电话',
      },
      login_ip_now: {
        type: STRING(50),
        allowNull: true,
        comment: '当前登录ip',
      },
      login_ip_last: {
        type: STRING(50),
        allowNull: true,
        comment: '上次登录ip',
      },
      remark: {
        type: STRING(250),
        allowNull: true,
        comment: '备注',
      },
      pic: {
        type: STRING(250),
        allowNull: true,
        comment: '头像',
      },
      create_time: {
        type: STRING(50),
        allowNull: true,
      },
      update_time: {
        type: STRING(50),
        allowNull: true,
      },
      login_time_now: {
        type: STRING(50),
        allowNull: true,
      },
      login_time_last: {
        type: STRING(50),
        allowNull: true,
      },
      token: {
        type: STRING(250),
        allowNull: true,
        comment: '令牌',
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('user');
  },
};
