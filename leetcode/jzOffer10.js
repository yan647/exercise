/**
 * Created by lsq on 2020/9/12.
 * https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/
 */

'use strict';

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else return fib(n - 1) + fib(n - 2);
};
//console.log(fib(100));

//加缓存
let fib2 = function (n) {
  let result = 0;
  if (n === 0) {
    fib2.result = [0];
    return 0;
  } else if (n === 1) {
    fib2.result = [0, 1];
    return 1;
  } else {
    result = fib2(n - 1) + fib2.result[n - 2];
    fib2.result.push(result);
    return result % (10 ** 9 + 7);
  }
};
console.log(fib2(100));

//动态规划
let fib3 = function (n) {
  let i = 0, j = 1, sum = 0;
  for (let a = 0; a < n; a++) {
    sum = (i + j) % (10 ** 9 + 7);
    i = j;
    j = sum;
  }
  return i;
};
console.log(fib3(100));
