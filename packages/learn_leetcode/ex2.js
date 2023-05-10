/**
 * Created by lsq on 2020/9/12.
 */

'use strict';

/**
 * @param {number[]} staple
 * @param {number[]} drinks
 * @param {number} x
 * @return {number}
 */
var breakfastNumber = function (staple, drinks, x) {
  let result = 0;
  staple = sortFun(staple);
  drinks = sortFun(drinks);
  for (let a = 0; a < staple.length; a++) {
    for (let b = 0; b < drinks.length; b++) {
      if (staple[a] + drinks[b] <= x) {
        result++;
      } else break;
    }
  }
  return result % (10 ** 9 + 7);
};

function sortFun(arr) {
  return arr.sort((a, b) => (a - b));
}

console.log(breakfastNumber([10, 20, 5], [5, 5, 2], 15));
console.log(breakfastNumber([2, 1, 1], [8, 9, 5, 1], 9));
