### husky学习笔记

### 我的操作步骤
1. pnpm install husky -w
2. npx husky install // 在当前项目中安装 Husky，并将其配置到项目的 .git/hooks 目录中。该命令只需要在项目中运行一次。该命令执行完后，项目中会多出一个 .husky 的目录
3. 



### 用到的其他功能
#### npx
1. ****轻松运行一个本地安装的软件包:****npx 将检查 `<command>` 或 `<package>` 是否存在于 `$PATH` 或本地项目的二进制文件中，如果存在，npx 将执行它。
2. ****执行以前没有安装的软件包:****有时你只是想使用一些 CLI 工具，但你不想为了测试它们而在全局安装它们。这意味着你可以节省一些磁盘空间，只在需要时才运行它们。这也意味着你的全局变量将受到更少的污染。
3. ****直接从 GitHub 上运行代码:用 npx 来运行任何 GitHub gist 和仓库。****
4. **测试不同版本的包:**npx 使测试一个 Node.js 包或模块的不同版本变得非常容易。

npx 可以帮助我们避免版本问题、依赖问题和安装我们只是想尝试一下的不必要的软件包。

它还为执行软件包、命令、模块，甚至是 GitHub 的清单和仓库提供了一个清晰而简单的方法。

### 参考

1. https://www.freecodecamp.org/chinese/news/npm-vs-npx-whats-the-difference/
2. https://typicode.github.io/husky/getting-started.html
3. https://juejin.cn/post/7154010934401302541
