/**
 * Created by lsq on 2020/8/29.
 */

'use strict';

module.exports={
  entry:"main.jsx",
  output: {
    filename: "bundle.js"
  },
  module:{
    rules:[{
      test:/\.jsx?&/,
      exclude: /node_modules/,
      use:{
        loader:"babel-loader",
        options:{
          presets:["es2015","react"]
        }
      }
    }]
  }
}
