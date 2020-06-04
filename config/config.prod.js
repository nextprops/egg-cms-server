'use strict';

exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  dialectOptions: {
    charset: 'utf8mb4',
  },
  database: 'blog',
  host: 'localhost',
  port: '3306',
  username: 'blog',
  password: 'blog',
  timezone: '+08:00',
};
