'use strict';
module.exports = app => {
  const {
    INTEGER,
    STRING,
  } = app.Sequelize;

  const SystemLog = app.model.define('systemLog',
    {
      id: {
        type: INTEGER(10),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: INTEGER(10),
        allowNull: true,
      },
      username: {
        type: STRING(50),
        allowNull: true,
      },
      method: {
        type: STRING(200),
        allowNull: true,
      },
      url: {
        type: STRING(200),
        allowNull: true,
      },
      ip: {
        type: STRING(64),
        allowNull: true,
      },
      create_time: {
        type: STRING(50),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: 'systemLog',
    }
  );

  SystemLog.beforeBulkUpdate(systemLog => {
    systemLog.attributes.updateTime = new Date();
    return systemLog;
  });

  SystemLog.beforeCreate(systemLog => {
    return systemLog;
  });

  return SystemLog;
};
