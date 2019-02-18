const Index = require('../models');
const { URLSearchParams } = require('url');

class IndexController {
    constructor() { }
    actionIndex() {
        return async (ctx, next) => {
            const index = new Index();
            const result = await index.getData();
            // console.log(result);

            ctx.body = await ctx.render('index', {
                data: result.data
            });
        }
    }
    actionAdd() {
        return async (ctx, next) => {
            ctx.body = await ctx.render('add');
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