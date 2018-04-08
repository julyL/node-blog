'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {
    keys: appInfo.name + '_julyL_cookiekey',
    middleware: [],
    mapping: {
      '.ejs': 'ejs'
    },
    view: {
      defaultViewEngine:"ejs",
      defaultExtension: '.ejs',
    },
    ejs: {
      root: path.join(appInfo.baseDir, 'app/view'),
      cache: true,
      debug: false,
      compileDebug: true,
      delimiter: null,
      strict: false,
    }
  };


  return config;
};