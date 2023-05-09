/**
 * Created by lsq on 2021/2/28.
 */

'use strict';
//http://guaji.djjlll.com/News-getInfo-id-929.html

const express=require('express');
const request=require('request');
const app=express();
app.use('/',(req,res)=>{
  const url='https:www.baidu.com/'+req.url;
  req.pipe(request(url)).pipe(res);//把浏览器的请求数据传给request客户端，然后将目标服务器的响应数据传回浏览器
});
app.listen('3000');
