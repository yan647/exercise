'use strict';
const path = require('path');
// const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode:'development',
  entry: path.join(__dirname, './index.js'),//'./index.js',
  // context: path.join(__dirname, './index.js'),
  output: {
    path: path.join(__dirname, './', 'lib'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.md', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use:[
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        // exclude: /\/node_modules\//
      },
      // {
      //   test: /\.js$/,
      //   use: 'babel-loader',
      //   // exclude: /\/node_modules\//
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      // chunksSortMode: 'dependency',
      inject: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new VueLoaderPlugin()
  ],
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.join(__dirname, './index.html')
        }
      ]
    },
    clientLogLevel: 'warning',
    // hot: true,
    //contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: '127.0.0.1',
    open: false,
    disableHostCheck: true,
    publicPath: '/',
    //quiet: true // necessary for FriendlyErrorsPlugin
  }
};
