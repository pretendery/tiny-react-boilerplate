const { resolve } = require('path');

const commonConfig = (_, argv) => {
  const IS_DEV = argv.mode === 'development';

  const BABEL_PLUGINS = [
    [
      'babel-plugin-styled-components',
      { ssr: false, displayName: false, pure: true },
    ],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    ['@babel/plugin-transform-runtime'],
  ];

  IS_DEV && BABEL_PLUGINS.push('react-hot-loader/babel');

  const BABEL_OPTIONS = {
    loader: 'babel-loader',
    test: /\.(js|jsx)$/,
    include: resolve(__dirname, 'src'),
    options: {
      presets: [
        [
          '@babel/env',
          {
            targets: {
              browsers: ['last 2 versions'],
            },
            modules: false,
            loose: true,
          },
        ],
        '@babel/react',
      ],
      plugins: BABEL_PLUGINS,
      comments: false,
      babelrc: false,
    },
  };

  const URL_OPTIONS = {
    loader: 'url-loader',
    exclude: /node_modules/,
    test: /\.(gif|jpg|png|svg)$/,
    options: {
      limit: 10000,
      name: 'images/[name].[ext]',
    },
  };

  return {
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        'react-dom': '@hot-loader/react-dom',
      },
    },
    module: {
      rules: [BABEL_OPTIONS, URL_OPTIONS],
    },
  };
};

module.exports = commonConfig;
