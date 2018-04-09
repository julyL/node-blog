module.exports = (mongoose) => {
    var Schema = mongoose.Schema;

    //创建一个schema实例
    var ArticleSchema = new Schema({
        content: {
            type: "String"
        }, // markdown内容
        html: {
            type: "String"
        }, // markdown转换后的html
        title: {
            type: "String"
        },
        date: {
            type: "String"
        },
    });
    var ArticleModel = mongoose.model("Article", ArticleSchema);
    return {
        createArticle(data) {
            var article = new ArticleModel({
                content: data.content,
                html: data.html,
                title: data.title,
                date: data.date
            })
            return article.save();
        },
        updateArticle(data) {
            return ArticleModel.update({
                _id: data.articleId
            }, {
                title: data.title,
                content: data.content,
                html: data.html,
                date: data.date
            })
        },
        removeArtilce(data) {
            return ArticleModel.remove(data)
        },
        getArticle(id) {
            return ArticleModel.findOne({
                _id: id
            });
        },
        getListFromPages(data){
            return ArticleModel.find({})
        }
    }
}