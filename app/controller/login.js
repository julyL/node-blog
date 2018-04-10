"use strict";

const Controller = require("egg").Controller;

// 用户登录相关
class LoginController extends Controller {
  async render(ctx) {
    await ctx.render("login");
  }
  async submit(ctx) {
    await ctx.service.login.submit();
  }
}
module.exports = LoginController;