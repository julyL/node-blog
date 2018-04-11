'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {

    // 文章详情页
    async renderArticle(ctx) {
        var renderData = await ctx.service.article.get(ctx.params.id);
        if (renderData) {
            await ctx.render('/article', {
                data: renderData
            });
        } else {
            ctx.redirect('/404')
        }
    }

    // 新建文章页
    async renderCreate(ctx) {
        await ctx.render('/admin/create', {
            data: {}
        });
    }

    // 修改文章页
    async renderUpdate(ctx) {
        let articleId = ctx.params.id;
        let renderData = await ctx.service.article.get(articleId);
        await ctx.render('/admin/updateArticle', {
            data: renderData
        });
    }

    // 新建
    async createArticle(ctx) {
        var data = ctx.request.body;
        data.articleId = data.title; // 暂时直接用标题作为id
        await ctx.service.article.create(data);
    }

    // 修改
    async updateArticle(ctx) {
        var data = ctx.request.body;
        data.articleId = data.title;
        await ctx.service.article.update(data);
    }

    // 删除
    async removeArticle(ctx) {
        var articleId = ctx.request.body.articleId;
        await ctx.service.article.remove(articleId)
    }

    // 归档文章列表
    async renderList(ctx) {
        let renderData = await ctx.service.article.getArticleListByPage({
            page:1,
            limit:99
        });
        await ctx.render('/archives', {
            data: {
                list: renderData.list
            }
        });
    }
}

module.exports = ArticleController;