/**
 * Created by lsq on 2021/1/9.
 */

'use strict';

/**
 * @param {number} n
 * @return {number}
 */
var totalMoney = function (n) {
  let a = parseInt(n / 7), b = n % 7;
  let temp1 = a === 0 ? 0 : 28 * a + 7 * a * (a - 1) / 2, temp2 = 0;
  for (let c = a + 1; c <= b + a; c++) {
    temp2 += c;
  }
  return temp1 + temp2;
};

// console.log(totalMoney(2));
// console.log(totalMoney(10));
console.log(totalMoney(21));//105
console.log(totalMoney(26));//135
