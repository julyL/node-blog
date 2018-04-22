'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
  async submit(data) {
    var ctx = this.ctx;
    var body = ctx.request.body;
    if (body.username == "root" && body.password == "root") {
      console.log(ctx.session);
      this.ctx.session.user = "admin";
      ctx.body = {
        code: 0,
        data: {
          redirectUrl: "/"
        }
      }
    } else {
      ctx.body = {
        code: 1000
      }
    }
  }
}

module.exports = LoginService;