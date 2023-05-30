/**
 * Created by lsq on 2020/8/29.
 */

'use strict';
// const path = require('path');

module.exports={
  entry:"./main.js",
  output: {
    filename: "bundle.js"
  },
  target:'node',
  module:{
    rules:[{
      test:/\.js?&/,
      exclude: /node_modules/,
      use:{
        loader:"babel-loader",
        options:{
          presets:["es2015"]
        }
      }
    }]
  }
}
