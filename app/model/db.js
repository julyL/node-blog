const mongoose = require("mongoose");
const dbconfig = require("../../config/mongoDB.config");
mongoose.Promise = Promise;
module.exports = {
    db: mongoose,
    async connect() {
        mongoose.connect(dbconfig.dburl);
        return new Promise((re, rj) => {
            mongoose.connection.on("connected", () => {
                re();
                console.log("\nMongoose connect " + dbconfig.dburl + " success\n");
            });

            //连接异常现实错误原因
            mongoose.connection.on("error", function (err) {
                rj(err)
                console.log("Mongoose connect Error:" + err);
            });
        })
    }
}