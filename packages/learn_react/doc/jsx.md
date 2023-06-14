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


### 对于函数组件，React的每次重渲染，函数组件的整个函数体都会被重新执行。
在函数组件被调用时，React会执行函数体并生成Virtual DOM树，然后将Virtual DOM树更新到真正的DOM树上。每次更新时，React都会重新执行函数体，并通过对比新旧Virtual DOM树找出差异，更新相应的DOM。由于函数组件没有生命周期函数，因此会被完全重新执行。

然而，React也有一些优化策略，比如React Hooks。通过使用Hooks可以让函数组件保存一些内部状态，从而避免每次重新生成函数组件。Hooks可以让函数组件像类组件一样拥有状态，也可以让函数组件订阅生命周期函数。Hooks让函数组件能够更灵活、更高效地管理组件的状态和生命周期，从而提升React的性能和开发效率。

这点与Vue非常不同，需要特别注意。

在Vue中，函数组件的行为与React中的函数组件略有不同。在Vue中，函数组件被称为“单文件组件”（Single File Component，SFC），它们通常使用.vue文件扩展名，并且包含了模板、脚本和样式等内容。

与React中的函数组件不同，Vue中的函数组件是基于模板的，它们的模板会被编译成渲染函数，然后被用于生成虚拟DOM。在Vue中，每个组件都有一个渲染函数，它是由Vue编译器生成的。渲染函数是一个JavaScript函数，它接受一个上下文对象作为参数，并返回一个虚拟DOM。

当组件被渲染时，Vue会调用渲染函数来生成虚拟DOM。然后，Vue会比较新旧虚拟DOM的差异，并只更新需要更新的部分。这种方式可以提高性能，因为只有需要更新的部分才会被重新渲染。

因此，在Vue中，函数组件的整个函数体并不会在每次重渲染时都被重新执行。相反，只有渲染函数会被调用，并且只有需要更新的部分才会被重新渲染。这种方式可以提高性能，因为不需要重新计算整个组件的状态和属性，只需要更新需要更新的部分即可。
