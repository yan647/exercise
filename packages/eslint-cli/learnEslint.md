### 开始使用
- pnpm install eslint -w
- 在项目根目录下使用eslint --init根据提示自动生成.eslintrc.js

### 常用的默认配置：
- eslint:recommended：ESLint 内置的推荐规则，即 ESLint Rules 列表中打了钩的那些规则
- eslint:all：ESLint 内置的所有规则
- eslint-config-standard：standard 的 JS 规范
- eslint-config-prettier：关闭和 ESLint 中以及其他扩展中有冲突的规则
- eslint-config-airbnb、eslint-config-airbnb-base：airbab 的 JS 规范。
  eslint-config-airbnb-base是最基本的规范，eslint-config-airbnb包含ECMAScript 6 + 以及React 的规范
- eslint-config-google：Google JavaScript 风格指南（ES2015+ 版本）的ESLint规范
- eslint-config-alloy：腾讯 AlloyTeam 前端团队出品，可以很好的针对你项目的技术栈进行配置选择，比如可以选 React、Vue（现已支持 Vue 3.0）、TypeScript 等
- eslint-plugin-vue：对 .vue 文件进行代码校验的插件

### 参考
[ESLint官方文档](https://eslint.org/)
[ESLint的简单介绍](https://www.freecodecamp.org/news/the-essentials-eslint/)
