// 我的解法
// type TupleToUnion2<T extends any[]>=T[number]

// 其他解法 使用了infer
type TupleToUnion<T extends any[]> = T extends Array<infer U> ? U : never

type Arr = ['1', '2', '3']

type Test = TupleToUnion<Arr> // expected to be '1' | '2' | '3'
