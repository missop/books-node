"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _awilixKoa = require("awilix-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object['ke' + 'ys'](descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object['define' + 'Property'](target, property, desc); desc = null; } return desc; }

const {
  URLSearchParams
} = require('url');

let IndexController = (_dec = (0, _awilixKoa.route)('/index'), _dec2 = (0, _awilixKoa.route)('/index'), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.route)('/add'), _dec5 = (0, _awilixKoa.GET)(), _dec6 = (0, _awilixKoa.route)('/save'), _dec7 = (0, _awilixKoa.POST)(), _dec(_class = (_class2 = class IndexController {
  constructor({
    indexService
  }) {
    // di
    this.indexService = indexService;
  }

  async actionIndex(ctx, next) {
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
  }

  async actionAdd(ctx, next) {
    const html = await ctx.render('books/pages/add');

    if (ctx.request.header['x-pjax']) {
      ctx, next;

      const $ = _cheerio2.default.load(html);

      let _result = '<x-add></x-add>';
      $('.layload-css').each(function () {
        _result += `<link href="${$(this).attr('href')}">`;
      });
      $('.layload-js').each(function () {
        _result += `<script src="${$(this).attr('src')}"></script>`;
      });
      ctx.body = _result;
    } else {
      ctx.body = html;
    }
  }

  async actionSave(ctx, next) {
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
  }

}, (_applyDecoratedDescriptor(_class2.prototype, "actionIndex", [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "actionIndex"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionAdd", [_dec4, _dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "actionAdd"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "actionSave", [_dec6, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "actionSave"), _class2.prototype)), _class2)) || _class);
exports.default = IndexController;