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


