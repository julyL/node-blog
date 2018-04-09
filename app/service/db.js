const Service = require("egg").Service;
const mongoose = require("mongoose");
mongoose.Promise = Promise;

class db extends Service {
  async connect(ctx) {
    var ctx = this.ctx;
    mongoose.connect(this.config.dburl);
    return new Promise((re,rj)=>{
      mongoose.connection.on("connected", ()=> {
        re();
        console.log("\nMongoose connect " + this.config.dburl+ " success\n");
      });
  
      //连接异常现实错误原因
      mongoose.connection.on("error", function(err) {
        rj(err)
        console.log("Mongoose connect Error:" + err);
      });
    })
  }
}

module.exports = db;
