
- 练习各种前端技术的地方
- 使用pnpm workspace管理 
- 全局安装pnpm:npm install pnpm -g 
- 安装npm使用pnpm install
- 给特定子集安装依赖包：pnpm install commander -D --filter eslint-cli
其中eslint-cli是对应包中package.json中的name，不是文件路径，也不一定是文件名
- 给全部项目安装依赖包：pnpm install eslint -w

### todo
- eslint stylelint prettier 
- commit lint
- typescript
- 单测


### doing
- 


### done
- pnpm workspace配置：packages下的子目录作为子工作区 参考 https://juejin.cn/post/7163202341758304270
- 迁移eg_react项目到本仓库
- 迁移learn_leetcode项目到本仓库
- 迁移learn_typescript项目到本仓库
- 迁移learn_refactoring项目到本仓库
- 迁移learnVue项目到本仓库

### 参考
[pnpm官方文档](https://pnpm.io/zh/motivation)
