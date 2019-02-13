const Index = require('../models');

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
}

module.exports = IndexController;