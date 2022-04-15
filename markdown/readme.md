## 计划
准备参考element-ui来实现，这样写练习的代码时，就简单很多了
## markdown-it
https://github.com/markdown-it/markdown-it
markdown-it是目前使用最广泛的markdown解析器工具。它将markdown语法的文件，解析为最终的html文件。绝大部分文档中心框架工具如Vuepress，处理markdown文件部分都是使用该工具以及扩展出的插件。了解它的解析过程，是进行自定义markdown插件的前提。
# 解析主要分两步：
- Parser：将md文档解析为Tokens（类似AST）
- Renderer：将Tokens内容渲染为html

# 我自己尝试的步骤记录
- yarn init
- yarn add markdown-it
- 看了下element-ui，发现是用webpack打包，把markdown-it写成了loader，来处理.md文件
- 学习怎么写webpack loader
- 找了篇教怎么写loader的文章：https://segmentfault.com/a/1190000040146131
