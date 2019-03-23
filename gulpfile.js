const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
/* 流清洗的库 */
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const entry = './src/server/**/*.js';
// 开发环境
function builddev(params) {
    /* 此时需要对代码进行监控 */
    return watch(entry, {
        ignoreInitial: false
    }, function () {
        gulp.src(entry)
            .pipe(babel({
                /* 忽略外面的babelrc,这个对象其实相当于一个babelrc文件 */
                babelrc: false,
                plugins: [
                    "transform-es2015-modules-commonjs",
                    ["@babel/plugin-proposal-decorators", {
                        legacy: true
                    }]
                ]
            }))
            .pipe(gulp.dest('dist'));
    });
}
// 上线环境
function buildprod(params) {
    return gulp.src(entry)
        .pipe(babel({
            /* 忽略外面的babelrc,这个对象其实相当于一个babelrc文件 */
            babelrc: false,
            /* 上线环境可以忽略掉config文件，交给后端去处理了,必须是一个数组 */
            ignore: ['./src/server/config/*.js'],
            plugins: [
                "transform-es2015-modules-commonjs",
                "@babel/plugin-proposal-decorators"
            ]
        }))
        .pipe(gulp.dest('dist'));
}
// 对代码进行检查的环境
function buildlint(params) {
    return gulp.src(entry)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}
// 清洗环境
function buildconfig(params) {
    return gulp.src(entry)
        .pipe(rollup({
            output: {
                format: 'cjs'
            },
            /* 对流清洗的关键代码 */
            plugins: replace({
                "process.env.NODE_ENV": JSON.stringify('production')
            }),
            /* 一定是具体的文件 */
            input: './src/server/config/index.js'
        }))
        .pipe(gulp.dest('./dist'));
}
if (process.env.NODE_ENV == 'development') {

}
let build = gulp.series(builddev);
if (process.env.NODE_ENV == 'production') {
    build = gulp.series(buildprod, buildconfig);
}
if (process.env.NODE_ENV == 'lint') {

}
gulp.task('default', build);