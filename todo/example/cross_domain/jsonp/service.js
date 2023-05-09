/**
 * Created by lsq on 2020/12/10.
 * 服务端代码
 */

'use strict';

const http=require('http');
const data={
  name:'bruceLee',
  password:'123456'
};
const server=http.createServer((request,response)=>{
  if(request.url==='/'){
    response.writeHead(200,{
      'Content-Type':'application/json;charset=utf-8'
    });
    response.end(`jsonpCallBack(${JSON.stringify(data)})`);
  }
});
server.listen(3000,()=>{
  console.log('the server is running at http://localhost:3000')
});
