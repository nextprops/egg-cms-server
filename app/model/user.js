'use strict';
module.exports = app => {
  const {
    INTEGER,
    STRING,
  } = app.Sequelize;

  const UserModel = app.model.define('user', {
    user_id: {
      type: INTEGER(10),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    role: {
      type: INTEGER(1),
      allowNull: false,
    },
    group_id: {
      type: INTEGER(32),
      allowNull: true,
    },
    username: {
      type: STRING(50),
      allowNull: false,
    },
    real_name: {
      type: STRING(50),
      allowNull: true,
    },
    password: {
      type: STRING(50),
      allowNull: false,
    },
    email: {
      type: STRING(50),
      allowNull: true,
    },
    mobile: {
      type: STRING(50),
      allowNull: true,
    },
    login_ip_now: {
      type: STRING(50),
      allowNull: true,
    },
    remark: {
      type: STRING(250),
      allowNull: true,
    },
    pic: {
      type: STRING(250),
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
      defaultValue: '',
    },
  }, {
    timestamps: false,
    tableName: 'user',
  });

  UserModel.beforeBulkUpdate(user => {
    user.attributes.updateTime = new Date();
    return user;
  });

  UserModel.beforeCreate(user => {
    return user;
  });

  return UserModel;
};
