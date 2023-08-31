// 看了别人写的才写出来的
type MyParameters<T extends (...args: any[])=>any> =
  T extends (...args: infer P) => any ? P : never;

const foo = (arg1: string, arg2: number): void => {};

type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
