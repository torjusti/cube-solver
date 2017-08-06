const webpack = require('webpack');
const path = require('path');

const production = process.env.NODE_ENV === 'production';

const LIBRARY_NAME = 'cube-solver';

const config = {
  entry: path.join(__dirname, '/src/index.js'),

  output: {
    path: path.join(__dirname, '/lib'),
    filename: 'bundle.js',
    library: LIBRARY_NAME,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
  },

  plugins: production ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    }),
  ] : [],
};

module.exports = config;
