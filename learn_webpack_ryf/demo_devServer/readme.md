启动 yarn run dev

页面 http://localhost:9000则跳转到baidu
```
proxy: {
  '/': {
    target: 'https://www.baidu.com',
    changeOrigin: true,
  }
}
```


页面http://localhost:9000/api 跳转到baidu
```
proxy: 
{
  '/api': {
    target: 'https://www.baidu.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  }
}
```

```
'/': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      }
```
