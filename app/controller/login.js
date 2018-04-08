"use strict";

const Controller = require("egg").Controller;

class LoginController extends Controller {
  async render(ctx) {
    await ctx.render("login");
  }
  async submit(ctx) {
    var body = ctx.request.body;
    console.log(body);
    if (body.username == "root" && body.password == "root") {
      ctx.response.end({ code: 0, data: { redirectUrl: "/home" } });
    }
  }
}
module.exports = LoginController;
