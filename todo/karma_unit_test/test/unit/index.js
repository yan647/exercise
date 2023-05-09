import Vue from 'vue';

Vue.config.productionTip = false;

// require all test files or specified component (files that ends with .spec.js)
const testsContext = require.context(TESTS_CONTEXT, true, /\.spec\.js$/); // eslint-disable-line
const srcContext = require.context('./', true, /\.spec\.js$/);

testsContext.keys().forEach(testsContext);
srcContext.keys().forEach(srcContext);
