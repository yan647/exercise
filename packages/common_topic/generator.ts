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

for (let i = 0; i < 10; i++) {
  console.log(fib.next());
}


