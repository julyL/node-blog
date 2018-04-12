"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async renderHome(ctx) {
    let renderData = {};
    let page = ctx.params.page || 1;

    renderData.articleList = await ctx.service.article.getArticleListByPage({
      page,
      limit: 7
    });

    renderData.router = 'home';

    await ctx.render("mainLayout", {
      data: renderData
    });
  }

  async renderArchives(ctx) {
    let renderData = {};
    let page = ctx.params.page || 1;

    renderData.archiveList = await ctx.service.article.getArticleListByPage({
      page,
      limit: 100
    });

    renderData.router = 'archives';

    await ctx.render("mainLayout", {
      data: renderData
    })
  }
}

module.exports = HomeController;