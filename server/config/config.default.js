/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1608616113800_1989';

  //获取formData数据
  config.multipart = {
    mode: 'file',
    whitelist: () => true
  }

  //文件存储目录
  config.UPLOAD_DIR = path.resolve(__dirname,'..','app/public')

  // add your middleware config here
  config.middleware = [];
  // config.security = {
  //   csrf: {
  //     headerName: 'x-csrf-token',// 自定义请求头
  //   }
  // }
  config.security = {
    csrf: {
      enable: false,
    }
  }
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo:{
      title: '测试接口',
      description: '接口测试',
      version: '1.0.0'
    },
    schemes: ['http','https'],
    consumes: ['application/json'],
    produces: ['applicition/json'],
    enableSecurity: false,
    routerMap: true,
    enable: true
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
