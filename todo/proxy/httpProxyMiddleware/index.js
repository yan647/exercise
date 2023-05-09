/**
 * Created by lsq on 2021/2/28.
 */

'use strict';
//https://www.cnblogs.com/xfpBlog/p/11311558.html

const express = require('express');
const proxyMiddleWare = require('http-proxy-middleware');//代理
const app = express();

//使用反向代理
app.use('/api', proxyMiddleWare(
  {
    target: 'https://www.baidu.com',changeOrigin:true
  }
));

//启动服务
app.listen('8080');
