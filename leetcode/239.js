/**
 * Created by lsq on 2021/1/2.
 */

'use strict';

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow1 = function (nums, k) {
  let max_arr = [];
  for (let a = 0; a <= nums.length - k; a++) {
    let _max = -Infinity;
    for (let b = a; b < a + k; b++) {
      _max = Math.max(_max, nums[b]);
    }
    max_arr.push(_max);
  }
  return max_arr;
};

var maxSlidingWindow = function (nums, k) {
  let max_arr = [];
  for (let a = 0; a <= nums.length - k; a++) {
    let _max = -Infinity;
    if (a === 0) {
      for (let b = 0; b < k; b++) {
        _max = Math.max(_max, nums[b]);
      }
    } else {
      let latest = max_arr[max_arr.length - 1];
      if (latest === nums[a - 1]) {
        for (let b = a; b < a + k; b++) {
          _max = Math.max(_max, nums[b]);
        }
      } else {
        _max = Math.max(latest, nums[a + k - 1]);
      }
    }
    max_arr.push(_max);
  }
  return max_arr;
};

console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
console.log(maxSlidingWindow([1], 1));
console.log(maxSlidingWindow([1, -1], 1));
console.log(maxSlidingWindow([9, 11], 2));
console.log(maxSlidingWindow([4, -2], 2));
