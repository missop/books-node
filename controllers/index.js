const router = require('koa-simple-router');
const IndexController = require('./IndexController');
const indexController = new IndexController;
const TestController = require('./TestController');
const testController = new TestController;

module.exports = (app) => {
    app.use(router(_ => {
        _.get('/', indexController.actionIndex());
        _.get('/add', indexController.actionAdd());
        _.get('/save', indexController.actionSave());
        _.get('/test', testController.actionIndex());
    }));
}