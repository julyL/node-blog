'use strict';

const Service = require('egg').Service;

class LoginService extends Service {
    async submitLogin() {
        var ctx = this.ctx;
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

module.exports = LoginService;