"use strict";

const Controller = require("egg").Controller;

class LoginController extends Controller {
  async render(ctx) {
    await ctx.render("login");
  }
  async submit(ctx) {
    var body = ctx.request.body;
    if (body.username == "root" && body.password == "root") {
      this.ctx.session.user = "admin";
      ctx.body = {
        code: 0,
        data: {
          redirectUrl: "/admin"
        }
      }
    }
  }
}
module.exports = LoginController;