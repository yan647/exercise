/**
 * 太难了，完全看答案写的
 * 1、需要传默认参数 T={}
 * 2、需要判断K不能重复 K extends keyof T ? never : K
 * 3、判断K值相同，类型相同才算重复 K extends keyof T ? V extends T[K] ? never : K : K
 *
 * 参考：
 * https://github.com/type-challenges/type-challenges/issues/13951
 * https://juejin.cn/post/7107262802674319367
 */
type Chainable<T = {}> = {
  option: <K extends string, V>(key: K extends keyof T ? V extends T[K] ? never : K : K, value: V) => Chainable<Omit<T, K> & Record<K, V>>
  get: () => T
}

declare const config: Chainable;

const result = config
  .option('foo', 123)
  .option('name', 'type-challenges')
  .option('bar', { value: 'Hello World' })
  .get();

// expect the type of result to be:
interface Result {
  foo: number
  name: string
  bar: {
    value: string
  }
}
