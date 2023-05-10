/**
 * Created by lsq on 2020/11/18.
 * 注意：由于是个圆，得到下一个点的时候我们需要取余数。
 */

'use strict';

/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  let remain = 0, len = gas.length;
  for (let a = 0; a < len; a++) {
    remain = gas[a];
    let b = a;
    while (remain - cost[b] >= 0) {
      remain = remain - cost[b] + gas[(b + 1) % len];
      b = (b + 1) % len;
      if (a === b) {
        return a;
      }
    }
  }
  return -1;
};
console.log(canCompleteCircuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]));
console.log(canCompleteCircuit([3, 1, 1], [1, 2, 2]));


var canCompleteCircuit1 = function (gas, cost) {
  let remain = 0, min_val = +Infinity, min_index, len = gas.length;
  for (let a = 0; a < len; a++) {
    remain = remain + gas[a] - cost[a];
    if (min_val > remain) {
      min_val = remain;
      min_index = a;
    }
  }
  return remain < 0 ? -1 : (min_index + 1) % len;
};

// console.log(canCompleteCircuit1([1,2,3,4,5],[3,4,5,1,2]));
console.log(canCompleteCircuit1([3, 1, 1], [1, 2, 2]));
