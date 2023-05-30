var koa = require('koa');
var proxy = require('koa-proxy');
var app = koa();
app.use(proxy({
  host: 'http://alicdn.com'
}));
app.listen(3000);
