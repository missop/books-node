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

<p>{{ message }}</p>vue中的这个ｐ出不来，因为模板引擎都用的大括号，这样导致了冲突，所以需要修改swig
模板的形式
刷新之后页面不更新的问题：swig的缓存机制，需要在开发环境禁用缓存，在生产环节再启用
在config中设置cacheMode:false(开发环境)/memory(生产环境)

V8对es6的新语法优化有很多，如果全部都编译为es5则会导航这些优化的浪费，所以需要判断是否需要编译为es5
支持的好说，直接用import
不支持的babel编译
编译命令："build": "babel ./assets/scripts/add.js --out-file ./assets/scripts/add-bundle.js",
编译配置文件：
{
    "presets": [
        "@babel/preset-env"
    ]
}
编译之后报错，exports is not defined---------system.js(万能模块加载器)
@babel/plugin-transform-modules-systemjs 辅助使得system支持babel的es6语法
spa单页
mpa多页

save（post请求单独处理）
php部分：
首先必须关闭csrf,
转化为json再输出
YII::$app->response->format = Response::FORMAT_JSON;
return $result;

safeRequest:中的fetch方法的定义
把参数放到body里面,
并且需要定义method(默认是get)
模型:中定义save对应方法
控制器:需要使用url模块中的URLSearchParams来处理所要发送的数据

<!-- 第三周目录结构变化了 -->
scripty代表了shell命令

npm run server:dev时报错没有权限的处理方法：
一　如果把scripts文件的权限提升之后就没有权限在图形界面中打开了，这种方法不好
二　如果用chod -x加权限那么每次都要加sudo来运行文件
三  最佳处理方式是部分加权限：chmod -R +x scripts

missing script:script:dev
没有正确安装scripty,它是依赖于supervisor,所以supervisor也必须安装

第一步：先使用gulp-rollup完成import的编译
<!-- 必须输出return -->
return gulp.src(entry)
        .pipe(rollup({
            <!-- 需要指定输出文件 -->
            output: {
                format: 'cjs'
            },
            /* 一定是具体的文件 */
            input: './src/server/config/index.js'
        }))
        .pipe(gulp.dest('./dist'));
        
        这样就能够编译import，但是仍然不能清洗if(){}等条件判断

第二步：gulp不认识NODE_ENV，所以用换的做法,rollup-plugin-replace
