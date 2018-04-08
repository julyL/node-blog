"use strict";
const path = require("path");
const password = "xxxx";  // dbpassword
module.exports = appInfo => {
  const config = (exports = {
    dburl: `mongodb://blog:${password}@ds235775.mlab.com:35775/node-blog`,
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
