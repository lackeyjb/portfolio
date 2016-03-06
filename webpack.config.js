/* eslint-disable */
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  src: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
  entry: PATHS.src,
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: PATHS.build,
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /.js$/,
      loaders: ['babel?cacheDirectory'],
      include: PATHS.src
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }]
  }
};

if (TARGET === 'start:dev' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    module: {
      loaders: [{
        test: /\.(css|scss)$/,
        loaders: [
          'style',
          'css',
          'sass'
        ],
        include: PATHS.src
      }]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if (TARGET === 'build:client') {
  module.exports = merge(common, {
    entry: {
      src: PATHS.src,
      vendor: Object.keys(pkg.dependencies).filter(function (key) {
        return key !== 'express' && key !== 'morgan' && key !== 'compression' && key !== 'ejs';
      })
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    module: {
      loaders: [{
        test: /(\.css|\.scss)$/,
        loader: ExtractTextPlugin.extract('style', 'css', 'sass'),
        include: PATHS.src
      }]
    },
    plugins: [
      new Clean([PATHS.build], {
        verbose: false
      }),
      new ExtractTextPlugin('styles.css'),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest']
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}
