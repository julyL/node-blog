module.exports = (mongoose) => {
    var Schema = mongoose.Schema;

    //创建一个schema实例
    var TagSchema = new Schema({
        name: "String",
        number: "Number",
        ids: []
    });

    var tagModel = mongoose.model("tag", TagSchema);
    return {
        /**
         * 新建标签
         * @param {String} tagName 标签名
         * @param {Object} data 文章数据
         */
        async create(tagName, data) {
            var tag = new tagModel({
                name: tagName,
                number: 1,
                ids: [data.articleId]
            });
            return tag.save();
        },
        /**
         * 根据标签名返回相应的tagModel数据
         * @param {String} name 标签名
         */
        async findByName(name) {
            return await tagModel.findOne({
                name
            })
        },
        /**
         * 增加标签数量
         * @param {Object} tag tagModel数据
         * @param {Object} data 文章数据
         */
        async addTagNum(tag, data) {
            tag.ids.push(data.articleId);
            return tagModel.update({
                name: tag.name
            }, {
                $set: {
                    number: tag.number + 1,
                    ids: tag.ids
                }
            })
        },
        /**
         * 减少标签数量
         * @param {Object} tag tagModel数据
         * @param {Object} data 文章数据
         */
        async subtractTagNum(tag, data) {
            var ind = tag.ids.indexOf(data.articleId);
            tag.ids.splice(ind, 1);
            return tagModel.update({
                name: tag.name
            }, {
                $set: {
                    number: tag.number - 1,
                    ids: tag.ids
                }
            })
        },
        /**
         * 移除标签
         * @param {Object} tag tagModel数据 
         */
        async removeByName(tag) {
            return tagModel.remove({
                name: tag.name
            })
        },
        /**
         * 获取所有标签
         * @param {String|undefined} name 标签名
         */
        async find(name) {
            if (name) {
                return await tagModel.findOne({
                    name
                })
            } else {
                return await tagModel.find({})
            }
        }
    }
}