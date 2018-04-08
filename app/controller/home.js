"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    if (this.ctx.session && this.ctx.session.adming) {
      this.ctx.body = "hi, egg";
    } else {
      this.ctx.redirect("/login");
    }
  }
}

module.exports = HomeController;
