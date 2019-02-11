class IndexController {
    constructor() { }
    actionIndex() {
        return async function (ctx, next) {
            ctx.body = await ctx.render('index',{
                data:'第一节node实战'
            });
        }
    }
}

module.exports = IndexController;