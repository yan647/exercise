/**
 * 学习generator
 *
 * 参考：https://segmentfault.com/a/1190000017370622
 */

// 斐波那契数列
function* Fib() {
  let x = 0;
  let y = 1;
  while (true) {
    const temp = x;
    x = y;
    y = temp + y;
    yield x;
  }
}

const fib = Fib();

console.log('斐波那契数列的结果:');
for (let i = 0; i < 5; i++) {
  console.log(fib.next());
}

// 阶乘函数
function* Factorial() {
  let x = 1;
  let fac = 1;
  while (true) {
    yield fac;
    fac *= (x++);
  }
}

const fac = Factorial();

console.log('阶乘的结果：');
for (let i = 0; i < 5; i++) {
  console.log(fac.next());
}
