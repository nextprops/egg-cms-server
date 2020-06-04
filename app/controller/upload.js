
'use strict';

// npm install mz-modules --save
// 此模块解决上传超时卡死
// https://github.com/node-modules/mz-modules

const pump = require('mz-modules/pump');
const path = require('path');
const fs = require('fs');

const Controller = require('egg').Controller;
// 上传控制器
class UploadController extends Controller {

  // 单文件上传 ajax
  async singleUpload() {
    const stream = await this.ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.name);
    const target = path.join(this.config.baseDir, 'app/public/upload/', filename);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    this.ctx.body = { url: '/public/upload/' + filename };
  }

  // 多文件上传 (暂时有点问题 可以循环调用singleUpload代替)
  // async multiUpload() {
  //   const { ctx } = this;
  //   const parts = ctx.multipart();
  //   let part;
  //   while ((part = await parts()) != null) {
  //     if (part.length) {
  //       // 处理其他参数
  //       console.log('field: ' + part[0]);
  //       console.log('value: ' + part[1]);
  //       console.log('valueTruncated: ' + part[2]);
  //       console.log('fieldnameTruncated: ' + part[3]);
  //     } else {
  //       if (!part.filename) {
  //         continue;
  //       }
  //       // otherwise, it's a stream
  //       const writePath = path.join(this.config.baseDir, 'app/public/upload/');
  //       const writeStrem = fs.createWriteStream(writePath);
  //       await part.pipe(writeStrem);
  //     }
  //   }

  //   ctx.body = { code: 200, message: '', data: parts };
  // }


}

module.exports = UploadController;
