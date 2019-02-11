/** 
 * 
 * @fileoverview 实现Ｉndex的数据模型
 * @author zhuzhuxia@qq.com
 * 
 * 
 *  **/

const safeRequest = require('../utils/safeRequest');

/** 
 * Index类 获取后台关于图书相关的数据类
 * @class
 * 
 *  **/
class Index {
    /** 
     * @constructor
     * @param {string} app KOA2执行上下文
     * **/
    constructor(app) { }

    /**
     * 获取后台全部图书的数据方法
     * @param {*} options 配置项
     * @example
     * return new Promise
     * getData(options)
     *  **/
    getData(options) {
        return {};
    }
}
module.exports = Index;