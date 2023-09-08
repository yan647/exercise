/**
 * 这次是我自己写的答案，终于进步了，太难了，😭
 */
type Pop<T extends any[]> = T['length'] extends 0 ? [] : T extends [...infer First, infer Last] ? First : never

type arr1 = ['a', 'b', 'c', 'd']
type arr2 = [3, 2, 1]

type re1 = Pop<arr1> // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2> // expected to be [3, 2]

type Push<T extends any[], U> = [...T, U]
type UnShift<T extends any[], U> = [U, ...T]
type Shift<T extends any[], U> = T extends [infer First, ...infer Last] ? First : never
