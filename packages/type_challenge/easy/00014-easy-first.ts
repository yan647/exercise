type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

/**
 * 别人的答案 https://github.com/type-challenges/type-challenges/issues/16315
 * type First<T extends any[]> = T extends [] ? never : T[0]
 * type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
 * type First<T extends any[]> = T extends [infer A, ...infer rest] ? A : never
 *
 * T extends [] 和T['length'] extends 0用来判断T是否为空数组
 * infer表示在 extends 条件语句中待推断的类型变量。 参考 https://jkchao.github.io/typescript-book-chinese/tips/infer.html
 *
 * 我缺少了判断空数组的逻辑
 * */

// 我的解答
type First<T extends any[]>=T[0]

type head1 = First<arr1> // 应推导出 'a'
type head2 = First<arr2> // 应推导出 3
