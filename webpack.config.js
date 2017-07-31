const webpack = require('webpack');
const path = require('path');
const production = process.env.NODE_ENV === 'production';

const LIBRARY_NAME = 'solvers';

const config = {
  entry: __dirname + '/src/index.js',

  output: {
    path: __dirname + '/lib',
    filename: 'bundle.js',
  },

  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
    ]
  },

  plugins: production ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
  ] : [],
};

module.exports = config;
