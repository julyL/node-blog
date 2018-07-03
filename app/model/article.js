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
        async updateArticle(data) {
            if (data.newId == data.articleId) {
                return ArticleModel.update({
                    articleId: decodeURI(data.articleId)
                }, {
                    $set: {
                        tags: data.tags,
                        html: data.html,
                        markdown: data.markdown,
                        date: data.date,
                        title: data.title,
                        fullMd: data.fullMd
                    }
                })
            } else {  //articleId发生变化则直接删除旧的建新的
                await this.removeArticleById(data.articleId);
                data.articleId = data.newId;
                return this.createArticle(data);
            }
        },
        // 根据文章ID删除文章
        removeArticleById(articleId) {
            return ArticleModel.remove({
                articleId: decodeURI(articleId)
            })
        },
        // 根据文章ID获取文章详情
        findByArticleId(articleId) {
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