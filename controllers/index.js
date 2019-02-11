const router = require('koa-simple-router');
const IndexController = require('./IndexController');
const indexController = new IndexController;
const TestController = require('./TestController');
const testController = new TestController;

module.exports = (app) => {
    app.use(router(_ => {
        _.get('/', indexController.actionIndex());
        _.get('/test', testController.actionIndex());
    }));
}