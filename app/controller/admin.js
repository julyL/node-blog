'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
   async render(ctx) {
       await ctx.render("admin");
   }
}

module.exports = AdminController;
