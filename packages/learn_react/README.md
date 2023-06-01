# eg_react
## 学习react
- 照着官网教程敲一遍代码，熟悉一下react的写法
- [官网教程](https://react.dev/learn/tutorial-tic-tac-toe)
- [从vue转到React遇到的疑惑或问题](./doc/index.md)

## 开始
- pnpm start

## 搭建react webpack的步骤
- pnpm init
- pnpm add react react-dom webpack webpack-cli
- npx webpack init
- 

## React官网部分译文
- [useState翻译](/translate/useState.md)
- [useEffect翻译](/translate/useEffect.md) `TODO`
- [build-in react hooks翻译](/translate/builtInReactHooks.md) `TODO`

## css
使用CSS Module
参考：[阮一峰的CSS Module教程](https://www.ruanyifeng.com/blog/2016/06/css_modules.html)
https://webpack.docschina.org/loaders/css-loader/

## 遇到的问题
- 报错：![Cannot find module './styles.scss' or its corresponding type declarations.](/assets/styleBug.png)

解决方案： 在global.d.ts中添加
```typescript
declare module '*.scss'{
  const classes: { readonly [key: string]: string }
  export default classes
}
```

- 报错:![export 'default' (imported as 'Styles') was not found in './styles.scss' (module has no exports)](/assets/styleBug2.png)

解决方案： 在webpack.config.js中添加：
```javascript
{
  loader: MiniCssExtractPlugin.loader,
  options: {
    esModule: false
  }
}
```

