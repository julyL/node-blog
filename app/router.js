"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
    middlewares
  } = app;
  router.get("/", controller.renderMain.renderHome);
  router.get("/archives", controller.renderMain.renderArchives)
  router.get("/page/:page", controller.renderMain.renderHome);

  router.get("/404", (ctx) => {
    ctx.render('/404');
  });

  router.get("/login", controller.login.render);
  router.post("/login", controller.login.submit);

  router.get("/admin", middlewares.checkLogin(), controller.admin.render);

  router.get("/article/:id", controller.article.renderArticle);
  router.get("/admin/create", middlewares.checkLogin(), controller.article.renderCreate);
  router.get("/admin/article/:id", middlewares.checkLogin(), controller.article.renderUpdate);

  router.post("/article/create", middlewares.checkLogin(), controller.article.createArticle);
  router.post("/article/update", middlewares.checkLogin(), controller.article.updateArticle);
  router.post("/article/remove", middlewares.checkLogin(), controller.article.removeArticle);

 
};