/**
 * 参考
 * https://juejin.cn/post/7265996663406968844#heading-16
 * https://www.typescriptlang.org/zh/docs/handbook/2/conditional-types.html
 * 使用了条件类型
 */
type MyExclude<T, U>=T extends U? never :T;

type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
