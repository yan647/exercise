/**
 * Created by lsq on 2021/2/28.
 */

'use strict';
//https://cloud.tencent.com/developer/article/1431819

const http=require('http');
http.createServer((req,res)=>{
  const options={
    host:'www.baidu.com',
    port:8086,
    path:req.url,
    method:req.method
  };
  http.request(options,(_res)=>{
    _res.pipe(req);
  }).end();
}).listen(3000,'localhost');
