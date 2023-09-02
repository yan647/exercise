/**
 * 参考：https://blog.csdn.net/pfourfire/article/details/127361821
 * 思路值得借鉴，先把题目看做JS，用JS做出来，按照JS的思路改成TS
 *
 * 判断空数组：T['length'] extends 0
 *
 * 看的题解，没有独立写出来
 */
type TupleToNestedObject<T extends any[], U> = T extends [infer First, ...infer Rest] ? {
    [K in First & string]: TupleToNestedObject<Rest, U>
  } : U

type a = TupleToNestedObject<['a'], string> // {a: string}
type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
