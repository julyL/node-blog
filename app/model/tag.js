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
        async addTags(data) {
            var tasks = data.tags.map(async name => {
                var tag = await tagModel.find({
                    name
                })
                if (tag.length > 0) {
                    return tag.update({
                        name,
                        number: tag.nubmer ? tag.number + 1 : 1,
                        ids: tag.ids.push(data.articleId)
                    })
                } else {
                    var tag = new tagModel({
                        name,
                        number: 1,
                        ids: [data.articleId]
                    });
                    return tag.save();
                }
            })
            return Promise.all(tasks);
        },
        async getTags(name) {
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