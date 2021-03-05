'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  //文件上传
  router.post('/uploadFile', controller.utils.uploadFile);
  //切片整合
  router.post('/mergeFile', controller.utils.mergeFile);
  //判断切片是否已存在
  router.post('/checkFile', controller.utils.checkFile);
};
