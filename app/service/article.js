'use strict';
const db = require('../model/db').db;
const articleModel = require("../model/article")(db);
const Service = require('egg').Service;

class ArticleService extends Service {
  async create(data) {
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

  async update(data) {
    try {
      await articleModel.updateArticle(data);
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

  async remove(articleId) {
    try {
      await articleModel.removeArticle(articleId);
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