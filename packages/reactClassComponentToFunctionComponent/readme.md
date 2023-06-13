## 把类组件改写成带有hook的函数组件的工具

### 背景
在使用阿里的低代码平台时，它只支持类组件，不支持函数组件，需要把生成的类组件自动转为函数组件。
实际开发过程中，也可能会遇到这样的情形：升级了React版本后，需要将类组件改写为函数组件，这一过程重复、繁琐，没什么技术提升，不如交给代码自己完成。

### 目的
- 自动把类组件改写成带有hook的函数组件

### 进度
- [x] 做计划（测试一下待办事项的格式）
- [ ] 学习babel中的工具@babel/generator
- [ ] 学习AST
- [ ] 把类改写成函数
- [ ] 把所有方法改写成函数
- [ ] 类组件中的生命周期函数改用hook替代
- [ ] 类组件中的state、setState改用useState
- [ ] 将PureComponent转换为React.memo
- [ ] 支持TypeScript
- [ ] 父子组件传值 useContext
- [ ] 高阶组件HOC的改写
- [ ] 测试用例的编写
- [ ] 单测


### 过程中遇到的问题


### 使用方法


### 参考
https://juejin.cn/post/6844903830203678727
https://www.gingerdoc.com/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks   TODO
