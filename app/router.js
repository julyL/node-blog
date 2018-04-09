"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middlewares } = app;
  router.get("/", controller.home.index);

  router.get("/login", controller.login.render);
  router.post("/login", controller.login.submit);
  
  router.get("/admin", middlewares.checkLogin(), controller.admin.render);

  router.get(/^\/admin\/article(\/\d*)?$/,middlewares.checkLogin(), controller.article.render);

  router.post("/article/create", middlewares.checkLogin(), controller.article.createArticle);
  router.post("/article/update", middlewares.checkLogin(), controller.article.updateArticle);

  router.get("/archives",controller.article.renderList)
};
