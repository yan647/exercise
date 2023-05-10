/**
 * Created by lsq on 2020/12/27.
 */

'use strict';

/**
 * @param {number[]} apples
 * @param {number[]} days
 * @return {number}
 */
var eatenApples = function (apples, days) {
  let beforeEat = [], len = apples.length, result = 0, zero_index = -1, day = 0;

  function appleCount(appleList) {
    return appleList.reduce((prev, curr) => prev + curr, 0);
  }

  while (day < len || appleCount(beforeEat)>0) {
    apples[day]!==undefined && beforeEat.push(apples[day]);
    let eatApple = false;
    for (let b = zero_index + 1; b < beforeEat.length; b++) {
      if (beforeEat[b] === 0) {
        if (b === zero_index + 1) {
          zero_index = b;
        }
      } else if (days[b]+b <= day) {//过期
        beforeEat[b] = 0;
      } else if (!eatApple) {
        beforeEat[b]--;//吃掉
        result++;
        eatApple = true;
      }
    }
    day++;
  }
  return result;
};

//console.log(eatenApples([1, 2, 3, 5, 2], [3, 2, 1, 4, 2]));
// console.log(eatenApples([3,0,0,0,0,2], [3,0,0,0,0,2]));
console.log(eatenApples([0], [5]));
