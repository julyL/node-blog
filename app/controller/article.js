'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
    // 渲染文章编辑页面 or 文章修改页面
    async render(ctx) {
        let params = ctx.params,
            renderData = {
                data: {}
            };
            let articleId = params && params[0] && params[0].slice(1);
        if (articleId) {
            let d = await ctx.service.article.get(articleId);
            console.log(d);
            await ctx.render('/admin/updateArticle', renderData);
        } else {
            await ctx.render('/admin/createArtilce', renderData);
        }
    }

    async createArticle(ctx) {
        ctx.service.article.create();
    }

    async updateArticle(ctx) {
        ctx.service.article.update();
    }
    // 归档文章列表
    async renderList(ctx){
        let renderData = await ctx.service.article.loadArchives();
        console.log(renderData);
        await ctx.render('/archives',renderData);
    }
}

module.exports = ArticleController;