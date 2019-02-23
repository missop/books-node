// const { join } = require('path');
import {join} from 'path';
const _ = require("lodash");
let config = {
    "viewDir": join(__dirname, "..", "..", "web", "views"),
    "staticDir": join(__dirname, "..", "..", "web", "assets")
}
// console.log(config);

if (process.env.NODE_ENV == "development") {
    const localConfig = {
        baseURL: 'http://localhost:8080/?r=',
        cacheMode: false,
        port: 3000
    }
    config = _.extend(config, localConfig);
}
if (process.env.NODE_ENV == "production") {
    const prodConfig = {
        cacheMode: 'memory',
        port: 8081
    }
    config = _.extend(config, prodConfig);
}
module.exports = config;