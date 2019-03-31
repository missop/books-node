const CopyPlugin = require('copy-webpack-plugin');
var minify = require('html-minifier').minify;
const { join } = require('path');
module.exports = {
    output: {
        path: join(__dirname, '../dist/assets'),
        publicPath: '/',
        filename: 'scripts/[name].[contenthash].bundle.js'
    },
    plugins: [
        /* 主要是为了把layout.html与components等等模板文件复制出来 */
        new CopyPlugin([
            {
                from: join(__dirname, '../src/web/views/common/layout.html'),
                to: '../views/common/layout.html'
            }
        ]),
        new CopyPlugin(
            [{
                from: join(__dirname, '../src/web/components'),
                to: '../components',
                transform(content) {
                    // html hint + fix
                    var result = minify(content.toString('utf-8'), {
                        collapseWhitespace: true
                    });
                    return result;
                }
            }],
            {
                /* 模板没有变就不重新编译 */
                copyUnmodified: true,
                ignore: [
                    '*.js', '*.css'
                ]
            }
        )
    ]
}