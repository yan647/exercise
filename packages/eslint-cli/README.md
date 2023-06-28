## Eslint配置自动化工具

### 背景

### 目的

### 进度
- [x] 做计划
- [x] 调研目前这些配置工具业界比较好的默认配置
- [x] 定一份我自己常用的eslint配置：每个项目至少要支持的语言scss、typescript，至少要支持prettier、stylelint、commitlint，
用户也就是我自己只需要选择实验vue还是react，是node环境还是browser
- [x] 命令行的选择器，参考eslint使用enquirer包
- [x] 调研一下用哪个包开发命令行
- [ ] 学习commander，参考eslint --init（代码位置：eslint项目的lib/init中）来写交互对话
- [ ] 假设用户使用vue ts scss，需要配置的工具包括：eslint prettier stylelint commitlint
- [ ] 让用户选择支持哪种开发语言：vue react ts scss
- [ ] 安装需要的npm包
- [ ] 使用eslint 等工具检查代码，fix代码

### 过程中遇到的问题
1. 应该使用enquirer、inquirer、commander等中的哪个？ 
- enquirer inquirer基本没有区别（原因：https://github.com/SBoudrias/Inquirer.js/issues/839 ， https://github.com/enquirer/enquirer/issues/205 ）。
都是编写终端交互式面板的工具。
enquirer更加简单易用，适合于一些简单的命令行提示场景；而inquirer则更加灵活可定制，适合于一些复杂的命令行交互场景。
根据[npm trend](https://npmtrends.com/enquirer-vs-inquirer-vs-prompt-vs-prompts)得知，inquirer使用者最多，交互方面使用inquirer。

- commander.js 用于创建命令行工具。编写 node 命令。是一个轻量级的、可扩展的、用户友好的命令行工具，支持解析命令行参数和选项，可以很方便地创建命令行工具。
适用于需要创建命令行工具的场景，如创建一个命令行工具来执行某个任务。
首先注册命令行参数处理规则，随后通过甄别用户输入（node 环境中的 progress.argv），再从已注册的处理规则中选取其一并应用之。
commander.js 本质是非交互式的，在用户输入完成后调用 commander.js 模块进行处理，无需监听键盘事件。
Inquirer.js、enquirer 是交互式的，需要监听用户侧的键盘输入，以实现单选、多选、密码等交互动作。它们借助 readline 模块处理标准输入 process.stdin、标准输出 process.stdout。

- 根据[npm trend](https://npmtrends.com/commander-vs-enquirer-vs-inquirer)得知，commander使用者最多，命令行方面使用commander。

2. eslint的eslint --init的原理？
- 在package.json中有：

```json
{
  "bin": {
    "eslint": "./bin/eslint.js"
  }
}
```

当你全局安装了eslint后，执行eslint --init，会到./bin/eslint.js中，判断如果用户输入的是--init，会执行../lib/init/config-initializer的initializeConfig函数

- 使用enquirer.prompt与用户实现各种交互。
- 没有使用commander就是这样的写法了。

3. 新版的inquirer只支持ES6的import导入方式，如何让Node支持import？
参考了[node支持ES module (import) 的三种方式](https://juejin.cn/post/7085724713565208589)中最简单的方法，把文件后缀js改为mjs



### 自测的方法
在本目录下执行node src/index.mjs init

### 在本地测试npm包是否起作用
1. 因为用的包管理器是pnpm，因此使用npm link不管用，需要在本项目中使用pnpm link --global 来建立全局的软链
2. 在使用者项目中使用pnpm link eslint-cli来使用本地的包
3. 在使用者项目中，执行eslint-cli-eg init发现成功了！！！

### 使用方法



### 参考
[commander官方文档](https://github.com/tj/commander.js/tree/master)
[inquirer官方文档](https://github.com/SBoudrias/Inquirer.js)
https://zhuanlan.zhihu.com/p/125528291
