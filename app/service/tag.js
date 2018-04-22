"use strict";
const db = require("../model/db").db;
const tagModel = require("../model/tag")(db);
const Service = require("egg").Service;


class TagService extends Service {
  async addEach(data) {
    if (data.tags) {
      var tasks = data.tags.map(async tag => {
        return this.addOne(tag, data)
      })
      return Promise.all(tasks)
    } else {
      return Promise.resolve();
    }
  }

  async addOne(name, data) {
    let tag = await tagModel.find(name);
    if (tag) {
      return await tagModel.add(tag, data);
    } else {
      return await tagModel.create(name, data);
    }
  }

  async findAll(tagName) {
    return await tagModel.findAll(tagName);
  }

  /**
   * 
   * @param {Object} beforeData 更新之前的文章数据
   * @param {Object} nowData 用于更新的文章数据
   */
  async update(beforeData, nowData) {
    var tasks = [];
    // 根据tags前后的变化来更新tag集合
    beforeData.tags.forEach(name => {   
      let ind = nowData.tags.indexOf(name);
      if (ind == -1) {
        this.subtratOne(name, beforeData);      
      }
    })
    nowData.tags.forEach(name => {   
      let ind = beforeData.tags.indexOf(name);
      if (ind == -1) {
        this.addOne(name, nowData);
      }
    })
  }
  async remove(data) {
    if (data.tags) {
      var tasks = data.tags.map(async tag => {
        return this.subtratOne(tag, data)
      })
      return Promise.all(tasks)
    } else {
      return Promise.resolve();
    }
  }

  async subtratOne(name, data) {
    let tag = await tagModel.find(name);
    if (!tag) {
      return;
    }
    if (tag.ids.length > 1) {
      return await tagModel.subtract(tag, data);
    } else {
      return await tagModel.remove(tag);
    }
  }
}

module.exports = TagService;