## husky学习笔记

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

#### validate-commit-msg

将其作为git hook来验证commit信息

#### git hooks

git hooks 就是在 Git 的命令之前或之后执行一些脚本。常见的脚本：
1. precommit：定义在 commit 之前的脚本 
2. prepush：定义 push 之前的脚本

这些脚本都被放在了 .git/hooks隐藏目录内，以可执行文件的形式存在

#### husky

husky 是基于 git hooks 实现的一套共享 hooks 脚本的解决方案，便于团队协作

`.git/hooks`是默认的保存 hooks 脚本的目录，但是用户可以自己修改，Git 提供了`core.hooksPath`选项让用户自定义脚本目录，husky 就是利用了这个原理。

在.git下，vim config，可以看到配置core.hooksPath的地方改成了.husky

husky 把 hooks 脚本目录改成了 .husky 目录，好处就是可以跟随代码一起提交到远程，大家一起遵循 hooks 约束。

lint-staged 最重要的功能是：只处理暂存区的文件

husky add 用于添加 Git Hook。

#### husky-init 脚本的作用如下：
1. 在 package.json 中新增 husky 依赖，并在 package.json 的 scripts 中新增脚本："prepare": "husky install"；
2. 生成 .husky/_/.husky.sh 文件，以及一个简单的 hooks demo（pre-commit）；
3. 执行脚本：git config core.hooksPath .husky；这就是项目git hooks新目录执行.husky


#### lint-staged

增量检查。是一个在 git 暂存文件上（也就是被 git add 的文件）运行已配置的 linter（或其他）任务。lint-staged 总是将所有暂存文件的列表传递给任务。

步骤：
1. pnpm install --save-dev lint-staged
2. package.json中配置"lint-staged": {}
3. .husky/pre-commit中配置npx lint-staged


### 参考

1. https://www.freecodecamp.org/chinese/news/npm-vs-npx-whats-the-difference/
2. https://typicode.github.io/husky/getting-started.html
3. [用 husky 约束 Git 提交](https://juejin.cn/post/7154010934401302541)
4. [pro git中对git hook的介绍](https://www.progit.cn/#_git_hooks)
5. [](https://juejin.cn/post/7109337539697180703)
6. [lint-staged官网](https://github.com/lint-staged/lint-staged#readme)
