/**
 * [any, ...T] 表示一个新的数组类型，它的第一个元素是 any 类型，后面的元素是 T 中的元素。这样，新数组的长度就比 T 的长度多 1。
 * [any, ...T][T["length"]] 表示取新数组的第 T["length"] 个元素的类型。由于新数组的长度比 T 的长度多 1，所以 T["length"] 正好是新数组的最后一个元素的索引。
 *
 * 为什么要这么麻烦，因为TS的类型操作里，T['length']-1会报错，不能用T[T['length']-1]。因为 TypeScript 的类型系统不支持在类型级别进行数学运算。
 * 在 TypeScript 的类型系统中，T['length'] 是一个类型，而不是一个值，所以不能对它进行数学运算。尝试对它进行数学运算会导致编译错误。
 *
 *
 * 参考
 * https://github.com/type-challenges/type-challenges/issues/100
 */
type Last1<T extends any[]> = [any, ...T][T['length']];

type Last2<T extends any[]> = T extends [...any, infer L] ? L : never;

/**
 * 我想到了这种方法，但最后Rest['length'] extends 0 ? First : Last<Rest>这部分没写对，如果Rest为空数组，应该取First这里没想到
 */
type Last<T extends any[]> = T extends [infer First, ...infer Rest]? Rest['length'] extends 0 ? First : Last<Rest> : never

type arr11 = ['a', 'b', 'c']
type arr22 = [3, 2, 1]

type tail1 = Last<arr11> // 应推导出 'c'
type tail2 = Last<arr22> // 应推导出 1
