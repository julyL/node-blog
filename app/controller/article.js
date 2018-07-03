'use strict';
const Controller = require('egg').Controller;
class ArticleController extends Controller {

    // 文章详情页
    async renderArticle(ctx) {
        var renderData = await ctx.service.article.findByArticleId(ctx.params.id);
        let tags = await ctx.service.tag.findByName();
        if (renderData) {
            await ctx.render('/mainLayout', {
                data: renderData,
                layout: 'article',
                tags
            });
        } else {
            ctx.redirect('/404')
        }
    }

    // 新建文章页
    async renderCreate(ctx) {
        await ctx.render('/admin/newArticle', {
            data: {}
        });
    }

    // 修改文章页
    async renderUpdate(ctx) {
        let articleId = ctx.params.id;
        let renderData = await ctx.service.article.findByArticleId(articleId);
        await ctx.render('/admin/article', {
            data: renderData
        });
    }

    // 新建
    async createArticle(ctx) {
        var data = ctx.request.body;
        var isExists = await ctx.service.article.findByArticleId(data.articleId);
        if (isExists) {
            ctx.body = {
                code: 1000,
                msg: "标题已存在"
            }
        } else {
            return Promise.all([
                ctx.service.article.create(data),
                ctx.service.tag.addTagList(data)
            ])
        }
    }

    // 修改
    async updateArticle(ctx) {
        let data = ctx.request.body,
            before = await ctx.service.article.findByArticleId(data.articleId);
        return Promise.all([
            ctx.service.tag.update(before, data),
            ctx.service.article.update(data)
        ])
    }

    // 删除
    async removeArticle(ctx) {
        var data = ctx.request.body,
            article = await ctx.service.article.findByArticleId(data.articleId);
        return Promise.all([
            ctx.service.article.article.removeArticleById(data.articleId),
            ctx.service.tag.removeByName(article)
        ])
    }

    // 归档文章列表
    async renderList(ctx) {
        let renderData = await ctx.service.article.getArticleListByPage({
            page: 1,
            limit: 99
        });
        await ctx.render('/archives', {
            data: {
                list: renderData.list
            }
        });
    }
}

module.exports = ArticleController;