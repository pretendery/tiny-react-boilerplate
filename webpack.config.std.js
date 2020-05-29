const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTML_MINIFY = {
  collapseWhitespace: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

const stdBase = {
  entry: {
    main: ['./src/main.js'],
  },
  output: {
    path: resolve(__dirname, 'dist', 'assets'),
    publicPath: '/',
  },
};

const stdProd = (env) => {
  const BASE_URL = env.target === 'local' ? '.' : '';
  const ASSETS_URL = `${BASE_URL}/assets/`;

  return {
    output: {
      publicPath: ASSETS_URL,
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['**/*', '!css', '!css/base.css'],
      }),
      new HtmlWebpackPlugin({
        title: 'Index',
        filename: resolve(__dirname, 'dist', 'index.html'),
        template: './src/templates/index.html',
        chunks: ['main'],
        inject: 'body',
        minify: HTML_MINIFY,
      }),
    ],
  };
};

module.exports = { stdBase, stdProd };
