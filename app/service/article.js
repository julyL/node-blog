"use strict";
const db = require("../model/db").db;
const articleModel = require("../model/article")(db);
const Service = require("egg").Service;

class ArticleService extends Service {
  async create(data) {
    try {
      await articleModel.createArticle(data);
      this.ctx.body = {
        code: 0
      };
    } catch (err) {
      this.ctx.body = {
        code: 0,
        msg: err
      };
    }
  }

  async update(data) {
    try {
      await articleModel.updateArticle(data);
      this.ctx.body = {
        code: 0
      };
    } catch (err) {
      this.ctx.body = {
        code: 0,
        msg: err
      };
    }
  }

  async remove(articleId) {
    try {
      await articleModel.removeArticle(articleId);
      this.ctx.body = {
        code: 0
      };
    } catch (err) {
      this.ctx.body = {
        code: 0,
        msg: err
      };
    }
  }

  async get(id) {
    return articleModel.getArticle(id);
  }

  async getArticleList(data) {
    var allList = await articleModel.getListFromPages(data),
      start = (data.page - 1) * data.limit - 1,
      end = start + data.limit - 1,
      list = [];
    allList.forEach((v, i) => {
      if (i >= start && i <= end) {
        list.push(v);
      }
    });
    return {
      list,
      page: {
        allcount: allList.length,
        page: data.page
      }
    };
  }
}

module.exports = ArticleService;
