/**
 * Created by lsq on 2021/1/3.
 */

'use strict';

/**
 * @param {number[]} deliciousness
 * @return {number}
 */
var countPairs = function (deliciousness) {
  let result = 0;
  for (let a = 0; a < deliciousness.length - 1; a++) {
    for (let b = a + 1; b < deliciousness.length; b++) {
      let temp = deliciousness[a] + deliciousness[b];
      if (!(temp & (temp - 1))) {
        result++;
      }
    }
  }
  return result%(10**9 + 7);
};

// console.log(countPairs([1, 3, 5, 7, 9]));
// console.log(countPairs([1,1,1,3,3,3,7]));
// console.log(countPairs([149,107,1,63,0,1,6867,1325,5611,2581,39,89,46,18,12,20,22,234]));//12
console.log(countPairs([2,14,11,5,1744,2352,0,1,1300,2796,0,4,376,1672,73,55,2006,42,10,6,0,2,2,0,0,1,0,1,0,2,271,241,1,63,1117,931,3,5,378,646,2,0,2,0,15,1]));//174
