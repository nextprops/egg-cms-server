<h1 style="color: #009c6a">egg + mysql + swagger-ui 博客内容管理服务端示例</h1>



## 前言
- 针对想学习nodejs服务端知识的同学。
- 准备好一个可以连接mysql数据库【必须】。
- 下面的内容，需要花一点点时间阅读，如果对入门而言，将会有所收获。
- 项目仅是用于个人学习的示例，不是很完善，如有错漏，欢迎在issue中指正，不一定能及时改。

（服务启动后的界面）
![image](://api.nextprops.com/public/upload/Snipaste_2020-05-07_12-50-29.png)\
（swagger-ui页面）
![image](://api.nextprops.com/public/upload/Snipaste_2020-05-07_12-57-15.png)
## 技术介绍
- 服务框架 阿里团队的 [egg](https://eggjs.org/zh-cn/) 框架。
- 数据库 [mysql](https://www.mysql.com/)
- ORM框架 [sequelize](https://sequelize.org/) （方便操作数据库）


## 特点
- 适合前端同学上手。
- 适合作为博客管理系统二次开发和学习。
- 集成了swagger-ui，方便查阅接口。
- 编写了部分用于博客内容管理的接口示例
- 编写了部分接口简易测试的页面。


## 已提供的接口
- [x] 用户管理
- [x] 鉴权
- [x] 标签管理
- [x] 文章管理 (文章content字段可以修改成mediumtext类型,这样可以存多内容)
- [x] 评论管理
- [x] 日志记录
- [x] 文件上传 (默认路径: public/upload)
    
## 准备开始吧😎！
<p style="color: #6296ff">安装好mysql，并新建一个数据库，确保可以用可视化工具访问成功!</p>
<p style="color: #6296ff">安装好mysql，并新建一个数据库，确保可以用可视化工具访问成功!</p>
<p style="color: #6296ff">安装好mysql，并新建一个数据库，确保可以用可视化工具访问成功!</p>



2. 安装好工程依赖。
3. 配置好链接数据库的参数。
    ```
    在两个文件中配置好参数
    config/config.prod.js
    config/config.local.js
    
    exports.sequelize = {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      dialectOptions: {
        charset: 'utf8mb4',
      },
      database: '数据库名',  // 例如 'blog'
      host: 'host',         // 例如 '123.123.12.123'或'localhost'
      port: '3306',
      username: '数据库用户名', // 例如 'blog'
      password: '数据库密码',
      timezone: '+08:00',
    };
    ```
4. 运行 npm run db:migrate 在数据库中创建表。
5. 运行 npm run dev   
<p style="color: #e04949">🤡如果出现以下报错，是因为数据库无法正常链接。请确保数据库有权限且能正常链接🤡</p>
<p style="color: #e04949">SequelizeConnectionRefusedError: connect ECONNREFUSED 127.0.0.1:3306</p>


## 开发

### 目录概述
```
app/
    contract/    swagger-ui的出入参项
    controller/  解析用户的输入，处理后返回相应的结果，也可以用于渲染页面
    migrate/     在数据库中记录模型文件
    model/       放置sequelize相关模型
    service/     使用不同的方法，操作数据库，是编写业务逻辑层。
    router.js    路由
    
config/
    config.default.js 全部相关配置项
    config.local.js   本地sequelize配置 【重要】
    config.prod.js    线上sequelize配置 【重要】
    plugin.js         插件引入
    sequelize.js      sequelize配置 
```

#### 注意！要先配置好数据库的参数，并确保能连接成功。

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/

// 通过node指令，操作数据库。
$ npm run db:migrate  // 迁移全部表（在新数据库中创建表）
$ npm run db:migrate:undo:all  // 删除已经迁移的表
$ npm run db:migrate:undo  // 删除最近的一次迁移的表
$ npm run db:migrate:undo:name  // 删除指定表 npm run db:migrate:undo:name --name 表名

```

### 部署

```bash
$ npm start
$ npm stop

ps: 如果使用Jenkins部署的话要注意，Jenkins任务结束时候会自动关掉了所有的子进程
可参考：https://blog.csdn.net/qq_25559693/article/details/72844340
```

### 单元测试
- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)

### 内置指令


- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org

## 感谢大佬
参考过很多不同的范例，因为时间隔得比较久不记得了。感谢大佬。
