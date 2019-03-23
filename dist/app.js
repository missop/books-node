"use strict";

var _errorHandler = require("./middlewares/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _awilix = require("awilix");

var _awilixKoa = require("awilix-koa");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Koa = require('koa');

const app = new Koa();

const path = require('path');

const render = require('koa-swig');

const co = require('co');

const serve = require('koa-static');

const log4js = require('log4js');

const config = require('./config');

// 静态资源
app.use(serve(config.staticDir)); // 创造一个容器

const container = (0, _awilix.createContainer)(); // 把所有serveice注入容器中去

container.loadModules(__dirname + '/services/*.js', {
  // 驼峰转化
  formatName: 'camelCase',
  registerOptions: {
    lifetime: _awilix.Lifetime.SCOPED
  }
});
app.use((0, _awilixKoa.scopePerRequest)(container)); // 注入路由机制

app.context.render = co.wrap(render({
  root: path.join(config.viewDir),
  autoescape: true,
  cache: config.cacheMode,
  // disable, set to false
  ext: 'html',
  varControls: ["[[", "]]"],
  writeBody: false
})); // 日志配置

log4js.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: 'src/server/logs/yd.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error'
    }
  }
});
const logger = log4js.getLogger('cheese'); // 容错

_errorHandler2.default.error(app, logger); // 自动装载路由


app.use((0, _awilixKoa.loadControllers)(__dirname + '/controllers/*.js'));
app.listen(config.port, () => {
  console.log(`服务已启动于${config.port}端口`);
});