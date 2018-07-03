"use strict";
const db = require("../model/db").db;
const tagModel = require("../model/tag")(db);
const Service = require("egg").Service;


class TagService extends Service {
  async addTagList(data) {
    if (data.tags) {
      var tasks = data.tags.map(async tag => {
        return this.addTag(tag, data)
      })
      return Promise.all(tasks)
    } else {
      return Promise.resolve();
    }
  }

  async addTag(name, data) {
    let tag = await tagModel.find(name);
    if (tag) {
      return await tagModel.addTagNum(tag, data);
    } else {
      return await tagModel.create(name, data);
    }
  }

  async findByName(tagName) {
    return await tagModel.find(tagName);
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
        this.removeTag(name, beforeData);      
      }
    })
    nowData.tags.forEach(name => {   
      let ind = beforeData.tags.indexOf(name);
      if (ind == -1) {
        this.addTag(name, nowData);
      }
    })
  }
  async remove(data) {
    if (data.tags) {
      var tasks = data.tags.map(async tag => {
        return this.removeTag(tag, data)
      })
      return Promise.all(tasks)
    } else {
      return Promise.resolve();
    }
  }

  async removeTag(name, data) {
    let tag = await tagModel.find(name);
    if (!tag) {
      return;
    }
    if (tag.ids.length > 1) {
      return await tagModel.subtractTagNum(tag, data);
    } else {
      return await tagModel.remove(tag);
    }
  }
}

module.exports = TagService;