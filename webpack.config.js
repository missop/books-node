/* 拿到用户参数_mode */
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || 'development';
/* 开发环境和生产环境引入不同配置 */
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const merge = require('webpack-merge');
const { join } = require('path');
/* 看文件源码包 */
const glob = require('glob');
const files = glob.sync('./src/web/views/**/*.entry.js');
const HTMLWebpackplugin = require('html-webpack-plugin');
const HtmlAfterWebpackPlugin = require('./config/HtmlAfterWebpackPlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// console.log(files);
const _entry = {};
const _plugins = [];
for (let item of files) {
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.js$)/g.test(item) == true) {
        // console.log(RegExp.$1);
        const entryKey = RegExp.$1;
        _entry[entryKey] = item;
        const [dist, template] = entryKey.split('-');
        _plugins.push(new HTMLWebpackplugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/web/views/${dist}/pages/${template}.html`,
            chunks: [entryKey],
            /* 不让它去插入，我们自己来操作 */
            inject: false
        }))
    }
}

let webpackConifg = {
    entry: _entry,
    module: {
        rules: [
            /* {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }, */
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            }
        ]
    },
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: '/',
        filename: 'scripts/[name].bundle.js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "styles/[name].css",
            chunkFilename: "styles/[id].css"
        }),
        ..._plugins,
        new HtmlAfterWebpackPlugin()
    ]
}

module.exports = merge(webpackConifg, _mergeConfig);