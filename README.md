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

webpack打前端资源包
前端文件目录
.
├── assets
│   ├── scripts
│   │   ├── add-bundle.js
│   │   ├── add.js
│   │   ├── index.js
│   │   └── yd.js
│   └── style
│       ├── common.css
│       └── index.css
├── components
│   ├── add
│   │   ├── add.css
│   │   ├── add.html
│   │   └── add.js
│   ├── common
│   │   ├── common.css
│   │   ├── common.js
│   │   └── navigation.html
│   └── list
│       ├── list.css
│       ├── list.html
│       └── list.js
└── views
    ├── books
    │   ├── books-add.entry.js
    │   ├── books-list.entry.js
    │   └── pages
    │       ├── add.html
    │       └── list.html
    ├── common
    │   └── layout.html
    └── index.html
首先需要创建入口文件，引入css
import './list.css';
const list = {
    init() {
        console.log("组件对应的入口文件");
    }
}
export default list;
然后webpack中去找入口

## 4.1-前端文件打包(下)
上节课的回顾：
4.1-1 创建入口文件，文件名称为路由-action.entry.js,打包时解析文件名
4.1-2 将js文件打包至dist/assets中,html文件打包至dist中，文件目录不变

本节课的内容提要：
4.1-3 首先需要把基础配置和环境配置合并一下，用到merge插件,
打包后我们发现views打到assets里面去了，所以需要把views的打包路径向外设置一层即可,
接下来我们需要去打包components＋layout.html,并且把assets中的js,css路径注入到模板对应位置
本节课重点：打包components＋layout.html,并且把assets中的js,css路径注入到模板对应位置(mpa+ssr)
画个图加强理解：
{%图4.1-3.1%}
落地页---搜索引擎直接抓取到的页面<----直出有利于seo，但是资源会重复请求，例如
ａ路由与ｂ路由同时都要请求xx.js,那么从ａ切到ｂ之后会再次请求xx.js，
这是下节课需要处理的问题：只切换页面变化的部分，就是SPA,
本节课是MPA

4.1-4先把html文件提取出来，由于html只是模板文件，只需要原封不动地复制出来即可，用到了一个插件：
copy-webpack-plugin,注意以下配置：
copyUnmodified: true,
ignore: [
    '*.js', '*.css'
]

4.1-5自定义webpack插件拦截webpack打包过程，把对应文件地址注入，webpack有生命周期钩子，在所有任务
之前触发
由于webpack更新之后很多包不能使用，所以很多代码都与官方不一致，因此需要去从源码中寻找蛛丝马迹(node_modules),
html-webpack-plugin源码
4.1-5-1何时才能拦截最后生成的swig
4.1-5-2怎么分清swig对应的js,css
由于生命周期是html-webpack-plugin提供的，所以我们自定义的插件需要在它后面执行
 new HtmlAfterWebpackPlugin(),..._plugins(!会报错)
 在这个钩子中能够打印出所有打包文件的信息，但是我们需要将每个文件分开，此时需要使用chunks
 webpack.config.js=>配置chunks: [entryKey]
这里犯了一个错误：没有赋值
 _html = _html.replace('<!-- injectscript -->', result.js.join(""));
路径的/写成了中文的／
 { Error: ENOENT: no such file or directory, open '/home/yideng/mine/books-web/dist/components／list/list.html'
 css-loader style-loader


webpack运行时马上执行webpack的自定义插件

##5.1 性能优化（上）
上节课的回顾：
5.1-1 前端文件打包，html使用copy-webpack-plugin拷贝，css和js用自定义的webpack插件进行注入
上节课的遗留问题：link打包成了script

本节课内容提要：
5.1-2 xtag的使用(web components)
载入x-tag库，填写模板，绑定事件
https://cdn.staticfile.org/x-tag/2.0.9-alpha/x-tag-raw.js
'::template(true)'() {}
'click::event'(){}
5.1-3 切页时只替换改变的DOM,不重复加载资源
pjax代理了页面的a标签，发送了一个请求给服务端，请求头中有x-pjax
前端:jQuery+pjax,后端:cheerio(相当于jQ)
5.1-4 quicklink 可以执行下一个页面的JS/css
add.html中的css和js都是webpack插入的，需要加一个类名来取地址，然后填到组件中
* Detects links within the viewport (using Intersection Observer)
监听是否在视窗范围内
* Waits until the browser is idle (using requestIdleCallback) 
浏览器空闲时加载
* Checks if the user isn't on a slow connection (using navigator.connection.effectiveType) or has data-saver enabled (using navigator.connection.saveData)
慢网速就不预加载了
* Prefetches URLs to the links (using <link rel=prefetch> or XHR). Provides some control over the request priority (can switch to fetch() if supported).
使用link-prefetch

##5.2 性能优化（下）
上节课回顾:
5.2-1 quicklink实现资源预加载，xtag实现web components

本节课：代码解耦合
* nodejs=>controller=>init=>app.js 
这样的话一个引一个，一旦某一个发生改变则整个链条断了
* 使用AOP解决代码耦合度高的问题：
把依赖都放到一个容器中，需要的时候再去引入(控制反转)
* 首先去掉controller的引入,然后引入awilix-koa(重磅成员)
5.2-2 awilix---Dependency Injection(依赖注入)
Extremely powerful Dependency Injection (DI) container for JavaScript/Node, written in TypeScript. Make IoC great again!
5.2-3 awilix-koa
model=>services
从awilix中引入以下方法:Lifetime/createContainer/
从awilix-koa中引入:scopePerRequest/loadControllers
需要注意代码位置:
在静态资源之下每次实例化servives:
```app.js
// 创造一个容器
const container = createContainer();
// 把所有serveice注入容器中去
container.loadModules(__dirname + '/services/*.js', {
    // 驼峰转化
    formatName: 'camelCase',
    registerOptions: {
        lifetime: Lifetime.SCOPED
    }
});
app.use(scopePerRequest(container));
```
listen前面进行路由载入:
```app.js
app.use(loadControllers(__dirname +  '/controllers/*.js'));
```
最后在IndexController里面修改原来的代码就可以了
```IndexController.js
import {
    route,
    GET,
    POST
} from 'awilix-koa'
@route('/index')
@GET()
```
5.2-4 gulp增加一个babel装饰器编译插件
'decorators-legacy' isn't currently enabled
配置改为这样就好了
["@babel/plugin-proposal-decorators", {
   legacy: true
}]
5.2-5 报错处理
我们在使用awilix之后找不到页面了，这种情况一般有以下原因：
5.2-5-1 dist还有原来打包的文件，需要清除掉，重新打包
5.2-5-2 可能是一些写法问题，这个时候需要复制一个去排查错误




