const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

const cssProd = {
  test: /\.css$/,
  include: [resolve(__dirname, 'src')],
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        importLoaders: 1,
        localIdentName: '[local]-[hash:base64:5]',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [autoprefixer()],
      },
    },
  ],
};

const prodConfig = {
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [cssProd],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            ascii_only: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
};

module.exports = prodConfig;
