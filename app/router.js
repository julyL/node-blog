"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, service } = app;
  router.get("/", controller.home.index);
  router.get("/login", controller.login.render);
  router.post("/login", controller.login.submit);
};
