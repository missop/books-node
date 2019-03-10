const Koa = require('koa');
const app = new Koa();
const path = require('path')
const render = require('koa-swig');
const co = require('co');
const serve = require('koa-static');
import errorHandler from './middlewares/errorHandler';
const log4js = require('log4js');
const config = require('./config');

// 静态资源
app.use(serve(config.staticDir));

// 注入路由机制
app.context.render = co.wrap(render({
    root: path.join(config.viewDir),
    autoescape: true,
    cache: config.cacheMode, // disable, set to false
    ext: 'html',
    varControls: ["[[", "]]"],
    writeBody: false
}));

// 日志配置
log4js.configure({
    appenders: { cheese: { type: 'file', filename: 'src/server/logs/yd.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');

// 容错
errorHandler.error(app, logger);

require('./controllers')(app);

app.listen(config.port, () => {
    console.log(`服务已启动于${config.port}端口`);
});