"use strict";

const Controller = require("egg").Controller;
const moment = require('moment');

class HomeController extends Controller {
  async render(ctx) {
    let renderData = {};
    let page = ctx.params.page || 1;
    let articleList = await ctx.service.article.getArticleListByPage({
      page,
      limit: 100
    });
    articleList.list.forEach(v => {
      v.date = moment(+v.date).format('YYYY年MM月DD日 HH时MM分');
    });

    renderData.articleList = articleList;
    renderData.latestArticles = await ctx.service.article.getLatestArticles();

    renderData.friendLinks = [{
      url:"https://github.com/julyL",
      name:"julyL"
    }];

    await ctx.render("home", {
      data: renderData
    });
  }
}

module.exports = HomeController;