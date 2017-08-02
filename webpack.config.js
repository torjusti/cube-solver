const webpack = require('webpack');
const path = require('path');
const production = process.env.NODE_ENV === 'production';

const LIBRARY_NAME = 'cube-solver';

const config = {
  entry: __dirname + '/src/index.js',

  output: {
    path: __dirname + '/lib',
    filename: 'bundle.js',
    path: __dirname + '/lib',
    library: LIBRARY_NAME,
    libraryTarget: 'umd',
    umdNamedDefine: true
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
