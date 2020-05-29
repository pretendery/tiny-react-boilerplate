const webpack = require("webpack");
const { resolve } = require("path");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const CSS_DEV = {
  test: /\.css$/,
  include: [resolve(__dirname, "src")],
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
        localIdentName: "[local]-[hash:base64:5]",
      },
    },
    {
      loader: "postcss-loader",
      options: {
        plugins: [autoprefixer(), cssnano()],
      },
    },
  ],
};

const devConfig = {
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
  },
  devServer: {
    hotOnly: true,
    stats: "errors-only",
    compress: true,

    // Enable error/warning overlay
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  module: {
    rules: [CSS_DEV],
  },
  plugins: [
    new webpack.DefinePlugin({
      baseUrl: JSON.stringify("/dist"),
    }),
  ],
};

module.exports = devConfig;
