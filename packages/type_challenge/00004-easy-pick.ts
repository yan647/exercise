/* eslint-disable */
interface Todo {
  title: string
  description: string
  completed: boolean
}

/**
 * keyof T， 索引类型查询操作符。 对于任何类型 T， keyof T的结果为 T上已知的公共属性名的联合。
 * T[K]， 索引访问操作符。只要确保类型变量 K extends keyof T就可以使用T[K]
 * { [K in Keys]: boolean }，映射类型。语法与索引签名的语法类型，内部使用了 for .. in。 具有三个部分：
 *    1. 类型变量 K，它会依次绑定到每个属性。
 *    2. 字符串字面量联合的 Keys，它包含了要迭代的属性名的集合。
 *    3. 属性的结果类型。
 *
 * 为什么不用interface而是用type？
 * 因为在interface中不能使用in，否则会报下面两个错误：
 * TS1169: A computed property name in an interface must refer to an expression whose type is a literal type or a 'unique symbol' type.
 * TS2464: A computed property name must be of type 'string', 'number', 'symbol', or 'any'.
 *
 *
 * 参考：tslang.cn/docs/handbook/advanced-types.html
 * */
type MyPick<T, K extends keyof T>={
  [k in K]:T[k]
}

// 会报错
// interface MyPick3<T, K extends keyof T>{
//   [k in K]:T[K]
// }

type TodoPreview = MyPick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
