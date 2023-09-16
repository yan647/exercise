/**
 * TS类型运算时也是可以用模版字符串的
 * 参考https://github.com/type-challenges/type-challenges/issues/346
 */
type Space=' ' | '\n' | '\t'
type TrimLeft<S extends string> = S extends `${Space}${infer T}` ? TrimLeft<T>:S;

type trimed = TrimLeft<'  Hello World  '> // 应推导出 'Hello World  '
