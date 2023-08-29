/**
 * 参考 https://github.com/type-challenges/type-challenges/issues/12338
 * https://juejin.cn/post/7103545848570576904
 */

type MyAwaited<T extends Promise<any> > = T extends Promise<infer R> ?
  (R extends Promise<any>?MyAwaited<R>:never) : never;

type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
