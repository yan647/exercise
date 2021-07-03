/**
 * Created by lsq on 2020/10/7.
 */

'use strict';

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let result1 = [], result2 = [], result0 = [];
  for (let a = 0; a < nums.length; a++) {
    if (nums[a] === 0) {
      result0.push(0);
    } else if (nums[a] === 1) {
      result1.push(1);
    } else result2.push(2);
  }
  return result0.concat(result1, result2);
};

console.log(sortColors([2, 0, 2, 1, 1, 0]));

var sortColors2 = function (nums) {//todo
  for (let a = 0; a < nums.length; a++) {
    if (nums[a] === 0) {
      nums.unshift(0);
      nums.splice(a + 1, 1);
    } else if (nums[a] === 2 && a !== nums.length - 1) {
      nums.push(2);
      nums.splice(a, 1);
      if(nums[a]!==2) {
        a--;
      }
    }
  }
};

// console.log(sortColors2([1, 2, 0]));
// console.log(sortColors2([2,0,2,1,1,0]));
console.log(sortColors2([2,2,1]));
