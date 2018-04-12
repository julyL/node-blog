"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {

  // 获取渲染数据
  async getRenderData(ctx) {
    let renderData = {};
    let page = ctx.params.page || 1;

    renderData.articleList = await ctx.service.article.getArticleListByPage({
      page,
      limit: 100
    });

    renderData.tags = await ctx.service.article.getTags();

    return renderData;
  }

  // 渲染主页
  async renderHome(ctx) {
    let renderData = await this.getRenderData(ctx);
    renderData.layout = 'articleList';

    await ctx.render("mainLayout", {
      data: renderData
    });
  }

  // 渲染归档页面
  async renderArchives(ctx) {
    let renderData = await this.getRenderData(ctx);

    renderData.layout = 'archives';

    await ctx.render("mainLayout", {
      data: renderData
    })
  }

  // 根据tag获取列表
  async renderArchivesByTags(ctx) {
    let tagName = ctx.params.tagName;
    let renderData = await this.getRenderData(ctx);
    renderData.tags.forEach(v => {
      v.active = v.name == tagName; // 标记选中的tag
    });
    renderData.layout = 'tag';

    // 根据tag筛选文章
    var activeTags = await ctx.service.article.getTags(tagName)
    renderData.articleList.list = renderData.articleList.list.filter(art => {
      return activeTags.ids.indexOf(art.articleId) != -1;
    })

    await ctx.render("mainLayout", {
      data: renderData
    })

  }
}

module.exports = HomeController;