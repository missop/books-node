const CopyPlugin = require('copy-webpack-plugin');
const { join } = require('path');
module.exports = {
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
                to: '../components'
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