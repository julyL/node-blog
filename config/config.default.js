"use strict";
const path = require("path");
const dbConfig = require("./mongoDB.config");
module.exports = appInfo => {
  const config = (exports = {
    dburl: dbConfig.dburl,
    keys: appInfo.name + "_julyL_cookiekey",
    middleware: [],
    mapping: { ".ejs": "ejs" },
    view: { defaultViewEngine: "ejs", defaultExtension: ".ejs" },
    ejs: {
      root: path.join(appInfo.baseDir, "app/view"),
      cache: true,
      debug: false,
      compileDebug: true,
      delimiter: null,
      strict: false
    },
    static: {
      prefix: "/public/",
      dir: path.join(appInfo.baseDir, "app/public"),
      dynamic: true,
      preload: false,
      buffer: false,
      maxFiles: 1000
    },
    security: {
      csrf: {
        enable: false
      }
    }
  }); // support lazy load

  return config;
};
