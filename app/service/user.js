const Service = require("egg").Service;
class user extends Service {
  async login() {
    console.log(this.ctx.body);
  }
}
module.exports = user;
