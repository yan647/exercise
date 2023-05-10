### webpack如何识别jsx?
在使用Webpack打包React应用程序时，需要使用babel及babel-loader将JSX语法转为浏览器可读取的JavaScript代码。为此，我们需要在Webpack配置文件中添加相应的loader配置。

首先需要安装babel-loader、@babel/core及@babel/preset-react依赖包，可以使用npm或yarn进行安装，命令如下：

```
npm install babel-loader @babel/core @babel/preset-react --save-dev
```

接着在Webpack配置文件中，通过以下配置使用babel-loader对JSX进行转译：

```javascript
module.exports = {
    // ...
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react"],
                    },
                },
            },
        ],
    },
    // ...
};
```
上述配置中的test属性用于设置需要匹配的文件类型，这里设置为JSX文件，使用正则表达式进行匹配。exclude属性用于设置需要排除的文件夹，这里设置为node_modules。use属性指定使用的loader及其配置项，这里为babel-loader，并通过options属性传递@babel/preset-react的配置。

这样，Webpack就能够正确识别JSX语法并将其转为浏览器可读取的JavaScript代码。


<br/>
本项目中用的awesome-typescript-loader，
