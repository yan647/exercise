'use strict';
const path = require('path');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
        loader: ['style-loader', 'css-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: vueLoaderConfig,
        exclude: /\/node_modules\//
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env']
          // },
        },
        exclude: /\/node_modules\//
      }
    ]
  },
  // externals: {
  //   vue: 'vue'
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
      chunksSortMode: 'dependency',
      inject: true,
      minify: {
        collapseWhitespace: true
      }
    }),
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
