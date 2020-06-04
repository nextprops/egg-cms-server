'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.HomeService = ctx.service.home;
  }

  async index() {
    await this.ctx.render('index.html');
  }
  async demo() {
    await this.ctx.render('demo.html');
  }

  async dashboard() {
    const res = await this.HomeService.dashboard();
    this.ctx.body = res;
  }

}

module.exports = HomeController;
