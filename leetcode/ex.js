/**
 * Created by lsq on 2020/11/2.
 */

'use strict';

//递归方法
function getBeerCount(m, N) {
  function getExchangeCount(m, N) {
    let exchangeCount = 0;
    let temp = m / N;
    if (temp > 1) {
      exchangeCount += Math.floor(m / N);
      exchangeCount += getExchangeCount(exchangeCount, N);
    }
    return exchangeCount;
  }

  return getExchangeCount(m, N) + m;
}

console.log(getBeerCount(20, 3));
console.log(getBeerCount(2, 3));
console.log(getBeerCount(3, 3));
console.log(getBeerCount(5, 3));
console.log(getBeerCount(30, 3));


//循环方法
function getBeerCount2(m, N) {
  let exchangeCount = 0, original = m;
  while (m / N > 1) {
    let temp = parseInt(m / N);
    exchangeCount += temp;
    m = temp;
  }
  return exchangeCount + original;
}

console.log(getBeerCount2(20, 3));
console.log(getBeerCount2(2, 3));
console.log(getBeerCount2(3, 3));
console.log(getBeerCount2(5, 3));
console.log(getBeerCount2(30, 3));


function fun3(m, N) {

}
