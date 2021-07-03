/**
 * Created by lsq on 2020/12/14.
 */

'use strict';

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  for (let a = 0; a < nums.length; a++) {
    let data = nums[a];
    if (data === target) {
      return a;
    } else if (data > target) {
      if (a === 0) {
        return 0;
      }
      if (nums[a - 1] < target) {
        return a;
      }
    }
  }
  return nums.length;
};


var searchInsert1 = function (nums, target) {
  if (nums.length === 0) {
    return 0;
  }
  let len = nums.length, min = 0, max = len - 1, mid = parseInt(len / 2);
  while (min < len && max >= 0) {
    if (nums[mid] > target) {
      max = mid;
      mid=parseInt((min+max)/2);
      // result = (mid > 0) ? (mid - 1) : 0;
    } else if (nums[mid] < target) {
      min = mid;
      mid=parseInt((min+max)/2);
      // result = mid + 1;
    } else return mid;
    if (min === max) {
      return min;
    }
  }
  return len;
};
// console.log(searchInsert1([1], 0));//0
// console.log(searchInsert1([1], 2));//1
console.log(searchInsert1([1,3], 2));//1

