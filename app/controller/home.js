"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async render(ctx) {
    let renderData = {};
    let page = ctx.params.page || 1;
    let articleList = await ctx.service.article.getArticleList({
      page,
      limit: 7
    });
    articleList.list.forEach(v => {
      v.intr = v.html;
    });
    renderData.articleList = articleList;
    console.log(renderData);
    await ctx.render("home", {
      data:renderData
    });
  }
}

module.exports = HomeController;
