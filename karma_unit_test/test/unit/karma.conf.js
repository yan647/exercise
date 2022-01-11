var webpackConfig = require('../../webpack.test.conf');

module.exports = function karmaConfig (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['ChromeHeadlessNoSandbox'],//测试启动的浏览器
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox', // required to run without privileges in docker
          '--user-data-dir=/tmp/chrome-test-profile',
          '--disable-web-security'
        ]
      }
    },
    frameworks: ['mocha', 'sinon-chai'],//可用的框架
    reporters: ['spec', 'coverage'],//测试结果
    files: ['./index.js'],//需要加载到浏览器的文件列表
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    preprocessors: {//可用的预处理器
      './index.js': ['webpack', 'sourcemap']
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    }
  });
};
