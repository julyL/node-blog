"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async render(ctx) {
    var renderData = {};
    await ctx.render('home');
  }
}

module.exports = HomeController;