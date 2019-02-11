class TestController {
    actionIndex() {
        return async function (ctx, next) {
            ctx.body = {
                data: "TestController"
            }
        }
    }
}

module.exports = TestController;