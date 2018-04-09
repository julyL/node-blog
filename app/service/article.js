'use strict';
const db = require('../model/db').db;
const articleModel = require("../model/article")(db);
const Service = require('egg').Service;

class ArticleService extends Service {
  async create() {
    let data = this.ctx.request.body;
    try {
      await articleModel.createArticle(data);
      this.ctx.body = {
        code: 0
      }
    } catch (err) {
      this.ctx.body = {
        code: 0,
        msg: err
      }
    }
  }
  async update() {
    console.log('update');
  }

  async get(id) {
    return articleModel.getArticle(id);
  }

  async loadArchives() {
    let ctx = this.ctx,
      data = ctx.request.body;
    return await articleModel.getListFromPages();
  }

}

module.exports = ArticleService;