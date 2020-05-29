const merge = require('webpack-merge');
const { stdBase, stdProd } = require('./webpack.config.std');
const commonConfig = require('./webpack.config.common');
const prodConfig = require('./webpack.config.prod');

module.exports = (env, argv) =>
  merge(stdBase, commonConfig(env, argv), prodConfig, stdProd(env));
