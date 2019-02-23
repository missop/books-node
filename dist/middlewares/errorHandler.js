"use strict";

const errorHandler = {
  error(app, logger) {
    // 500容错,生成日志
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        ctx.status = 500;
        logger.error(error);
        ctx.body = '哭';
      }
    }); // 404容错

    app.use(async (ctx, next) => {
      await next();

      if (404 != ctx.status) {
        return;
      }

      ctx.status = 200;
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>';
    });
  }

};
module.exports = errorHandler;