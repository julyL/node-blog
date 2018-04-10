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
        articleId: {
            type: "String"
        }
    });
    var ArticleModel = mongoose.model("Article", ArticleSchema);
    return {
        createArticle(data) {
            var article = new ArticleModel(data);
            return article.save();
        },
        updateArticle(data) {
            var articleId = data.articleId;
            data.articleId = data.title;
            return ArticleModel.update({
                articleId
            }, data)
        },
        removeArticle(articleId) {
            return ArticleModel.remove({
                articleId
            })
        },
        getArticle(articleId) {
            return ArticleModel.findOne({
                articleId
            });
        },
        getListFromPages(data) {
            return ArticleModel.find({})
        }
    }
}