const Index = require('../models');
const { URLSearchParams } = require('url');
import cheerio from 'cheerio';

class IndexController {
    constructor() { }
    actionIndex() {
        return async (ctx, next) => {
            // console.log(1);

            const index = new Index();
            // console.log(2);

            const result = await index.getData();
            const html = await ctx.render('books/pages/list', {
                data: result.data
            });
            // console.log(3);
            if (ctx.request.header['x-pjax']) {
                /* 点击过来的才有pjax */
                const $ = cheerio.load(html);
                ctx.body = $('#js-hooks').html();
            } else {
                ctx.body = html;
            }
        }
    }
    actionAdd() {
        return async (ctx, next) => {
            const html = await ctx.render('books/pages/add');
            if (ctx.request.header['x-pjax']) {
                const $ = cheerio.load(html);
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
        }
    }
}

module.exports = IndexController;