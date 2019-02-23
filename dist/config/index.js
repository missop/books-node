'use strict';

var path = require('path');

// const { join } = require('path');
const _ = require("lodash");
let config = {
    "viewDir": path.join(__dirname, "..", "..", "web", "views"),
    "staticDir": path.join(__dirname, "..", "..", "web", "assets")
};
// console.log(config);

{
    const prodConfig = {
        cacheMode: 'memory',
        port: 8081
    };
    config = _.extend(config, prodConfig);
}
module.exports = config;
