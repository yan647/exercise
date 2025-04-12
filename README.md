### 描述
- 练习各种前端技术的地方
- 使用pnpm workspace管理 
- 全局安装pnpm:npm install pnpm -g 
- 安装依赖包使用pnpm install
- 给特定子集安装依赖包：pnpm install commander -D --filter eslint-cli
其中eslint-cli是对应包中package.json中的name，不是文件路径，也不一定是文件名
- 给全部项目安装依赖包：pnpm install eslint -w

### TODOList
- [x] pnpm workspace配置：packages下的子目录作为子工作区 参考 https://juejin.cn/post/7163202341758304270
- [x] 迁移eg_react项目到本仓库
- [x] 迁移learn_leetcode项目到本仓库
- [x] 迁移learn_typescript项目到本仓库
- [x] 迁移learn_refactoring项目到本仓库
- [x] 迁移learnVue项目到本仓库
- [x] 迁移learnEffectiveTypeScript项目到本仓库
- [ ] eslint stylelint prettier
- [ ] commit lint
- [ ] typescript
- [ ] 单测


### 项目启动
- 全局安装pnpm:npm install pnpm -g
- 安装依赖包使用pnpm install（使用yarn会报错）
- 启动每个项目：分别根据对应项目的package.json中的script进行启动

### 参考
- [pnpm官方文档](https://pnpm.io/zh/motivation)
- [npm-vs-yarn-vs-pnpm](https://www.atatus.com/blog/npm-vs-yarn-vs-pnpm/)`TODO`
