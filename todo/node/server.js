/**
 * Created by lsq on 2020/10/24.
 */

'use strict';
const http=require("http");
const url=require("url");
function start(route) {
  function onRequest(request, response) {
    const pathName=url.parse(request.url).pathname;
    console.log(`request for ${pathName} received.`);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("hello world");
    response.end();
  }
  http.createServer(onRequest).listen(8888);

  console.log("server running at http://127.0.0.1:8888/");
}

exports.start=start;
