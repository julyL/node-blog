"use strict";
const db = require("../model/db").db;
const articleModel = require("../model/article")(db);
const tagModel = require("../model/tag")(db);
const Service = require("egg").Service;
const moment = require('moment');
const getArticleIdFromTitle = require("../util").getArticleIdFromTitle;

class ArticleService extends Service {
  async create(data) {
    try {
      data.articleId = getArticleIdFromTitle(data.title);
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
      data.newId = getArticleIdFromTitle(data.title);
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

  // 获取分页文章列表
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

  // 获取最新的文章
  async getLatestArticles() {
    var data = await articleModel.getLatestArticles();
    return data;
  }

  // 添加标签
  async addTags(data){
    var data = await tagModel.addTags(data)
    return data;
  }
  
  async getTags(tagName){
    return await tagModel.getTags(tagName);
  }

}

module.exports = ArticleService;