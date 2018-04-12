"use strict";
const db = require("../model/db").db;
const articleModel = require("../model/article")(db);
const Service = require("egg").Service;
const moment = require('moment');

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
      await articleModel.removeArticleById(articleId);
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
    return articleModel.getArticleById(id);
  }

  async getArticleListByPage(data) {
    var allList = await articleModel.getAllArticleList(data),
      start = (data.page - 1) * data.limit - 1,
      end = start + data.limit - 1,
      list = [];
    allList.forEach((v, i) => {
      if (i >= start && i <= end) {
        list.push(v);
      }
    });

    // 处理date
    list.forEach(v => {
      if (new Date(+v.date) > new Date(0)) {  // 只有是有效时间戳才处理
        v.date = moment(+v.date).format('YYYY年MM月DD日');
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

  async getLatestArticles() {
    var data = await articleModel.getLatestArticles();
    return data;
  }
}

module.exports = ArticleService;