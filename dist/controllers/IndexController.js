"use strict";

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Index = require('../models');

const {
  URLSearchParams
} = require('url');

class IndexController {
  constructor() {}

  actionIndex() {
    return async (ctx, next) => {
      // console.log(1);
      const index = new Index(); // console.log(2);

      const result = await index.getData();
      const html = await ctx.render('books/pages/list', {
        data: result.data
      }); // console.log(3);

      if (ctx.request.header['x-pjax']) {
        /* 点击过来的才有pjax */
        const $ = _cheerio2.default.load(html);

        ctx.body = $('#js-hooks').html();
      } else {
        ctx.body = html;
      }
    };
  }

  actionAdd() {
    return async (ctx, next) => {
      ctx.body = await ctx.render('books/pages/add');
    };
  }

  actionSave() {
    return async (ctx, next) => {
      const index = new Index();
      /* post */

      const params = new URLSearchParams();
      /* 添加一条数据 */

      params.append("Books[bookname]", "测试");
      params.append("Books[author]", "测试111");
      const result = await index.saveData({
        params
      });
      ctx.body = result;
    };
  }

}

module.exports = IndexController;