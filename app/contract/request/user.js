'use strict';

module.exports = {
  // 新建
  createUserRequest: {
    username: { type: 'string', required: true, description: '用户名' },
    password: { type: 'string', required: true, description: '密码' },
    role: { type: 'integer', required: true, description: '角色 0:普通用户, 1:管理员' },
    real_name: { type: 'string', required: false, description: '姓名/昵称' },
    remark: { type: 'string', required: false, description: '备注' },
    email: { type: 'string', required: false, example: 'hedongxiaoshimei@gmail.com', format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, description: '邮箱' },
    mobile: { type: 'string', required: false, example: '13333333333', format: /^1[34578]\d{9}$/, description: '电话' },
    pic: { type: 'string', required: false, description: '头像地址' },
  },

  // 登录
  loginRequest: {
    username: { type: 'string', required: true, description: '用户名' },
    password: { type: 'string', required: true, description: '密码' },
  },

  // 登出
  logoutRequest: {
    user_id: { type: 'integer', required: true, description: '用户id' },
  },
  // 删除
  deleteUserRequest: {
    user_id: { type: 'integer', required: true, description: '用户id' },
  },


  // 编辑
  updateUserRequest: {
    user_id: { type: 'integer', required: true, description: '用户id' },
    role: { type: 'integer', required: true, description: '角色 0:普通用户, 1:管理员' },
    password: { type: 'string', required: false, description: '密码' },
    real_name: { type: 'string', required: false, description: '姓名/昵称' },
    remark: { type: 'string', required: false, description: '备注' },
    email: { type: 'string', required: false, example: 'hedongxiaoshimei@gmail.com', format: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, description: '邮箱' },
    mobile: { type: 'string', required: false, example: '13333333333', format: /^1[34578]\d{9}$/, description: '电话' },
    pic: { type: 'string', required: false, description: '头像地址' },
  },
  // 查询用户列表
  getUserListRequest: {
    page: { type: 'integer', required: true, description: '页码' },
    pageSize: { type: 'integer', required: true, description: '数量' },
  },
};
