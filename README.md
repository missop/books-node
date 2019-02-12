.
├── app.js                          启动文件
├── assets                          静态资源文件（css、js）
├── bin							    执行脚本
├── components						前端组建
├── config						    配置文件（文件路径、端口号）
├── controllers						路由
├── middlewares						中间件
├── model			                模型，专门请求后端数据				
├── package.json                    包文件
├── tests                           测试文件
└── views                           前端模板

一系列包的安装与配置
如何寻找合适的包呢?搜索koa有一个中间件列表，从中可以寻找自己想用的中间件
koa-simple-router:轻量高效
用法:
app.use(router(_ => {
    _.get('/', (ctx, next) => {
        ctx.body = 'hello'
    })
}));
把路由提取至controllers中
入口文件:index,js负责处理所有路由的设置，具体的操作交给action去做
module.exports = (app) => {
    app.use(router(_ => {
        _.get('/', ...);
        _.get('/test', ...);
    }));
}
IndexController 创建action进行数据渲染
class IndexController {
    constructor() { }
    actionIndex() {
        return async function (ctx, next) {
            ctx.body = 'hello';
        }
    }
}

module.exports = IndexController;

swig与前端组建化思想
index extends layout然后layout引入组件
为什么选择swig?
swig虽然停止维护,但是其效率极高，非常适合做ssr
swig
以块做开头和结尾，中间填写数据变量
https://www.jianshu.com/p/f0bffc42c1ce
swig渲染页面：
ctx.body = await ctx.render('index');
koa-static静态资源
会将资源文件assets放在根目录下,直接访问里面的内容即可

csr+node
index.html  +  一堆js
a/b   c/d 这种形式的路由需要history-api-fallback来进行跳转至index.html
真假路由,有的是vue-router的路由，有的是node路由(真)

nodejs容错重中之重--中间件
404容错：不承认404,404会被百度降权，把它设置为200,再加上一个页面
洋葱模型
容错需要写在路由前面,这样才能执行完后面的东西再绕回来
语法错误与500
在监听服务器的时候出现错误属于语法错误；
中间件里面调用未知函数会产生500
错误无法打印出来，就需要日志
为什么用对象作为中间件而不是类？

日志log4js　koa-log4
日志服务器  log4js生产消费不及时，用户走了日志还在干活
日志本应该是无侵入式的，就是与业务逻辑分离开来

其他容错机制
app.on('error')
process.on()

模型与docs
获取数据的模型，取后台数据的模型是很需要docs的，给老大去看
docs:
首先是作者
类的作用
constructor的参数说明
方法的使用例子

为什么使用fetch?
deno-向浏览器兼容,浏览器api可以使用

yii要改造的部分
前后端不分离：直接把数据render到模板中，我们要改造的就是这一块内容
前后端分离:直接输出json数据

swig(node)+vue ssr+csr
vue csr
vue ssr

增操作不涉及服务端渲染：只吐一个壳,后面不带数据
return async (ctx, next) => {
    ctx.body = await ctx.render('index');
}

