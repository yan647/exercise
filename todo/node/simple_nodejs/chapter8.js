const http = require('http');
const url=require('url');
const querystring=require('querystring');

http.createServer((req, res) => {
  //8.1 处理不同类型的请求
  switch (req.method) {
    case 'POST':
      update(req, res);
      break;
    case 'DELETE':
      remove(req, res);
      break;
    case 'PUT':
      create(req, res);
      break;
    case 'GET':
    default:
      get(req, res);
  }

  //8.1.2 根据路径进行业务处理
  const pathname=url.parse(req.url).pathname;
  fs.readFile(path.join(ROOT,pathname),(err,file)=>{
    if(err){
      res.writeHead(404);
      res.end('找不到相关文件');
      return;
    }
    res.writeHead(200);
    res.end(file);
  });

  //8.1.2 根据路径选择控制器，预设路径为控制器和行为的组合，无须额外配置路由信息
  const handles={
    index:{
      get,
      create,
      remove,
      update,
      index:(req,res,foo)=>{
        res.writeHead(200);
        res.end(foo);
      }
    }
  }
  const paths=pathname.split('/');
  const controller=paths[1]||'index';
  const action=paths[2]||'index';
  const args=paths.slice(3);
  if(handles[controller] && handles[controller][action]){
    handles[controller][action].apply(null,[req,res].concat(args));
  } else{
    res.writeHead(500);
    res.end('找不到响应控制器');
  }

  //8.1.3 查询字符串
  const query=querystring.parse(url.parse(req.url).query);//很常用
  const query2=url.parse(req.url,true).query;


  //8.1.4 cookie
  todo

  //8.
  res.writeHead(200, {
    'Content-Type': 'text/plain',
  });
  res.end('hello world');
}).listen(1337, '127.0.0.1');

function update(req, res) {
}

function remove(req, res) {
}

function create(req, res) {
}

function get(req, res) {
}
