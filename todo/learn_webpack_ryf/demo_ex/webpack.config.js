var resolve = require("path").resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: "./index.js",
  output: {
    filename: "build.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '/index.html'), // 我们要使用的 html 模板地址
      filename: 'index.html', // 打包后输出的文件名
      title: '设计说明' // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
    }),
  ],
  devServer: {
    historyApiFallback: true,
    // contentBase: resolve(__dirname, '/'),
    port: 8000,
    publicPath: '/'
  },
};
