module.exports = function (env, argv) {
  env = env || {};
  let app_name = env.app || "main";
  const app_url = {
    main: {entry: "/app/main.js", output: "/app/public"},
    vue: {entry: "/vue/index/index.js", output: "/vue/public"}
  };
  return {
    //“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
    devtool: 'eval-source-map',
    entry: {
      index: __dirname + app_url[app_name]["entry"]
    },//入口文件
    output: {
      path: __dirname + app_url[app_name]["output"],//打包后的文件存放的地方
      filename: "bundle.js"//打包后输出文件的文件名
    },
    devServer: {//描述影响 webpack-dev-server(简写为：dev-server) 行为的选项，扮演了一个代理服务器的角色
      contentBase: __dirname + app_url[app_name]["output"],//本地服务器所加载的页面所在的目录，处理静态资源
      historyApiFallback: true,//不跳转   当404出现的时候，是否重定向
      inline: true,//实时刷新
      hot: true, //开启 HMR，由 webpack-dev-server 发送 "webpackHotUpdate" 消息到客户端代码
      compress: true, //开启资源的 gzip 压缩
      //proxy:[],//启动proxy代理，去把请求代理到一个外部的服务器
      clientLogLevel: "info",//在 inline 模式下用于控制在浏览器中打印的 log 级别，如`error`, `warning`, `info` or `none`.
      quiet: false,//不在控制台打印任何 log
      noInfo: false,//不输出启动 log
      disableHostCheck: true,//不检查host地址
      before: function (app) {
      },//在服务内部的所有其他中间件之前， 提供执行自定义中间件的功能。 这可以用来配置自定义处理程序
      after: function (app) {
      }//在服务内部的所有其他中间件之后， 提供执行自定义中间件的功能
    },
    module: {
      rules: [//加载器
        {test: /\.html$/, loader: 'raw-loader'},
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
        {test: /\.(png|jpg|ico)$/, loader: 'url?limit=8192'},
        {
          test: /\.js$/,
          exclude: /node_modules/,
          //include 表示哪些目录中的 .js 文件需要进行 babel-loader
          //exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
          loader: 'babel-loader'
        }, {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: "vue-loader"
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        automaticNameDelimiter: "-",
        name: "example"
      }
    },
    resolve:{
      alias:{
        "vue$":"vue/dist/vue.esm.js"
      }
    }
  };
};

