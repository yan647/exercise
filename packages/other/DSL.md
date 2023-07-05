# DSL学习
DLS：为了解决某一类任务而专门设计的计算机语言。DSL 通过在表达能力上做的妥协换取在某一领域内的高效。 而有限的表达能力就成为了 GPL 和 DSL 之间的一条界限。
- 通用的计算机编程语言是可以用来编写任意计算机程序的，并且能表达任何的可被计算的逻辑，同时也是 图灵完备 的。
- DSL 并不是图灵完备的，它们的表达能力有限，只是在特定领域解决特定任务的。

DSL的缺点：由于 DSL 是一种新的语言，而不只是用已有语言写出来新函数，所以 DSL 必须经过一个学习和理解的过程，才能被其他人使用。

几个概念
- DSL（Domain Specific Language）领域特定语言，包括外部DSL、内部DSL/嵌入式DSL（Embedded DSL or Internal DSL）
- GPL（General Purpose Language）通用编程语言


外部DSL：Regex、SQL、HTML & CSS、JSX、JSON、YAML
- Regex：正则表达式仅仅指定了字符串的 pattern，其引擎就会根据 pattern 判断当前字符串跟正则表达式是否匹配。
- SQL：SQL 语句在使用时也并没有真正的执行，我们输入的 SQL 语句最终还要交给数据库来进行处理，数据库会从 SQL 语句中读取有用的信息，然后从数据库中返回使用者期望的结果。
- HTML & CSS：HTML 和 CSS 只是对 Web 界面的结构语义和样式进行描述，虽然它们在构建网站时非常重要，但是它们并非是一种编程语言，正相反，我们可以认为 HTML 和 CSS 是在 Web 中的领域特定语言


实现 DSL 总共有这么两个需要完成的工作：
1. 设计语法和语义，定义 DSL 中的元素是什么样的，元素代表什么意思
2. 实现 parser，对 DSL 解析，最终通过解释器来执行


### 参考
- [前端 DSL 实践指南（上）—— 内部 DSL](https://zhuanlan.zhihu.com/p/107947462)
- [谈谈 DSL 以及 DSL 的应用（以 CocoaPods 为例）](https://zhuanlan.zhihu.com/p/22824177)
- [DSL 的误区](https://www.yinwang.org/blog-cn/2017/05/25/dsl) `TODO`

