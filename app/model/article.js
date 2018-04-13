module.exports = (mongoose) => {
    var Schema = mongoose.Schema;

    //创建一个schema实例
    var ArticleSchema = new Schema({
        fullMd: {
            type: "String"
        },
        markdown: {
            type: "String"
        },
        html: {
            type: "String"
        },
        date: {
            type: "String"
        },
        tags: [],
        title: {
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
            console.log('update',data);
            return ArticleModel.update({
                articleId: decodeURI(data.newId)
            }, data)
        },
        removeArticleById(articleId) {
            return ArticleModel.remove({
                articleId: decodeURI(articleId)
            })
        },
        getArticleById(articleId) {
            return ArticleModel.findOne({
                articleId: decodeURI(articleId)
            });
        },
        // 获取所有的文章
        getAllArticleList() {
            return ArticleModel.find({})
        },
        // 获取最新文章
        getLatestArticles(limit) {
            return ArticleModel.find({}).limit(limit || 7).sort({
                "date": 1
            })
        }
    }
}