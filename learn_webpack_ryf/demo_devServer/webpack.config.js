/**
 * Created by lsq on 2020/8/29.
 */

'use strict';
const path = require('path');

module.exports={
  entry:"./main.js",
  output: {
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    proxy: {
      '/': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
      }
    }
  }
}
