const merge = require('webpack-merge');
const { stdBase } = require('./webpack.config.std');
const commonConfig = require('./webpack.config.common');
const devConfig = require('./webpack.config.dev');

module.exports = (_, argv) => merge(stdBase, commonConfig(_, argv), devConfig);
