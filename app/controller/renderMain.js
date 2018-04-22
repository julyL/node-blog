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
    renderData.admin = ctx.session.user;
    return renderData;
  }

  // 渲染主页
  async renderHome(ctx) {
    let renderData = await this.getRenderData(ctx);
    let tags = await ctx.service.tag.findAll();

    await ctx.render("mainLayout", {
      data: renderData,
      layout : 'articleList',
      tags
    });
  }

  // 渲染归档页面
  async renderArchives(ctx) {
    let renderData = await this.getRenderData(ctx);
    let tags = await ctx.service.tag.findAll();
    await ctx.render("mainLayout", {
      data: renderData,
      layout : 'archives',
      tags
    })
  }

  // 根据tag获取列表
  async renderArchivesByTags(ctx) {
    let tagName = ctx.params.tagName;
    let renderData = await this.getRenderData(ctx);
    let tags = await ctx.service.tag.findAll();

    tags.forEach(v => {
      v.active = v.name == tagName; // 标记选中的tag
    });
    renderData.tags = tags;

    // 根据tag筛选文章
    var activeTags = await ctx.service.tag.findAll(tagName)
    renderData.articleList.list = renderData.articleList.list.filter(art => {
      return activeTags.ids.indexOf(art.articleId) != -1;
    })

    await ctx.render("mainLayout", {
      data: renderData,
      layout : 'tag',
      tags
    })

  }
}

module.exports = HomeController;