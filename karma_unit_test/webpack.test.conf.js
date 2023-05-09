'use strict';
// This is the webpack config used for unit tests.

// const utils = require('./utils');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.conf');

// find custom component
const lastIdx = process.argv.indexOf('run:component');
console.log(process.argv);
let testsContext = './';
if (lastIdx !== -1) {
  const customCompName = process.argv.slice(lastIdx + 1, lastIdx + 2)[0];
  testsContext += customCompName || '';
}

const webpackConfig = merge(baseWebpackConfig, {
  // use inline sourcemap for karma-sourcemap-loader
  // module: {
  //   rules: utils.styleLoaders()
  // },
  // resolveLoader: {
  //   alias: {
  //     // necessary to to make lang="scss" work in test when using vue-loader's ?inject option
  //     // see discussion at https://github.com/vuejs/vue-loader/issues/724
  //     'scss-loader': 'sass-loader'
  //   }
  // },
  plugins: [
    new webpack.DefinePlugin({
      TESTS_CONTEXT: JSON.stringify(testsContext)
    })
  ]
});

// no need for app entry during tests
delete webpackConfig.entry;
delete webpackConfig.externals;
module.exports = webpackConfig;
