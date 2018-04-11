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
        removeArticleById(articleId) {
            return ArticleModel.remove({
                articleId
            })
        },
        getArticleById(articleId) {
            return ArticleModel.findOne({
                articleId
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