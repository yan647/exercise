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
      // '/pop/livePreview/g/fe': {
      //   target: 'http://web.qcs.st.sankuai.com/',
      //   changeOrigin: true,
      //   secure: true,
      //   // pathRewrite: { '/api': '' },
      // },

      //失败
      // '/api': {
      //   target: 'http://localhost:8081/pop/gameCenter/fissionActivityList',
      //   changeOrigin: true,
      //   secure: true,
      //   pathRewrite: { '/api': '' },
      // },

      // 成功
      '/baidu': {
        target: 'https://www.baidu.com',
        changeOrigin: true,
        pathRewrite: { '^/baidu': '' },
      },
      // '/api': {
      //   target: 'https://www.baidu.com',
      //   changeOrigin: true,
      //   pathRewrite: { '/api': '/s' },
      // },
      // '/api': {
      //   target: 'https://www.baidu.com/s',
      //   changeOrigin: true,
      //   pathRewrite: { '/api': '' },
      // },
      // '/': {
      //   target: 'http://localhost:8081',
      //   changeOrigin: true,
      // },
    },
    before(app) {
      console.log('@@@before');
      app.get('/baidu*', () => {
        console.log('@@@livePreview');
      });
    }
  }
}
