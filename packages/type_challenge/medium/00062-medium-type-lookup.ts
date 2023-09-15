/**
 * type LookUp<T extends { type: string }, U extends string> = T['type'] extends U ? T : never
 * 这种解法是错误的，原因：
 * 这两种解法的主要区别在于它们对类型的检查方式。
 * 在第一种解法 `type LookUp<U, T> = U extends {type: T} ? U : never;` 中，
 * 我们是在检查 `U` 是否是一个具有 `type` 属性且该属性的类型为 `T` 的对象。
 * 如果是，那么返回 `U`，否则返回 `never`。这种方式是在检查 `U` 的整体结构。
 *
 * 在第二种解法 `type LookUp<T extends { type: string }, U extends string> = T['type'] extends U ? T : never` 中，
 * 我们是在检查 `T['type']` 是否可以赋值给 `U`。如果可以，那么返回 `T`，否则返回 `never`。这种方式是在检查 `T` 的 `type` 属性的值。
 *
 * 这两种解法的适用场景是不同的。第一种解法适用于你知道 `U` 的整体结构，并且想要根据 `type` 属性的类型来获取 `U`。
 * 第二种解法适用于你知道 `T` 的 `type` 属性的值，并且想要获取这个值对应的 `T`。
 *
 * 如果你在使用第二种解法时遇到问题，可能的原因是 `T['type']` 不能赋值给 `U`，或者 `T` 没有 `type` 属性。
 * 你需要检查你的类型定义和使用方式，确保它们是正确的。
 *
 * 我的看法
 * U extends {type:T}是在检查U的整体结构
 * T['type'] extends U是在检查T的type属性的值，所以是不一样的
 */
type LookUp<U, T> =U extends {type:T}?U:never;

interface Cat {
  type: 'cat'
  breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
  type: 'dog'
  breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
  color: 'brown' | 'white' | 'black'
}

type MyDog = LookUp<Cat | Dog, 'dog'> // expected to be `Dog`
