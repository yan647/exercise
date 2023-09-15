/**
 * 1. 加上了 as const 的类型，就会加上 readonly 修饰符。
 * 2. 直接使用list:readonly T会报错：'readonly' type modifier is only permitted on array and tuple literal types.
 * 因为不确定T的类型，对象的属性是可以被修改的，所以将对象声明为只读是没有意义的。必须写成[...T]，这种数组形式
 * 3. declare 为一个方法或函数约定参数和返回值
 * 参考：https://www.typescriptlang.org/docs/handbook/declaration-files/by-example.html
 *
 * 参考：
 * 1. https://juejin.cn/post/7108382349464862757 差一个case
 * 2. https://blog.csdn.net/Jioho_chen/article/details/125831933?ydreferer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8%3D 全部正确
 */
type Awaited<T>=T extends Promise<infer R> ? Awaited<R> :T

// 这种方式解决TS报的循环引用的错
// type Awaited<T> = T extends PromiseLike<infer U> ? U extends PromiseLike<any> ? Awaited<U> : U : T;

declare function PromiseAll<T extends any[]>(list:readonly [...T]):Promise< {
  [K in keyof T]:Awaited<T[K]>
} >

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

// 应推导出 `Promise<[number, 42, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);

// 官方的PromiseLike的实现
interface PromiseLike1<T> {
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike1<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike1<TResult2>) | undefined | null
  ):
    PromiseLike1<TResult1 | TResult2>;
}
