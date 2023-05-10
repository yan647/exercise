/**
 * Created by lsq on 2020/10/5.
 */

'use strict';

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
  nums = nums.sort((a, b) => a - b);
  let result = [];
  for (let a = 0; a < nums.length; a++) {
    for (let b = a + 1; b < nums.length && a !== b; b++) {
      for (let c = b + 1; c < nums.length && c !== b; c++) {
        for (let d = c + 1; d < nums.length && c !== d; d++) {
          if (nums[a] + nums[b] + nums[c] + nums[d] === target) {
            result.push([nums[a], nums[b], nums[c], nums[d]]);
          }
        }
      }
    }
  }
  return result;
};

var fourSum2 = function (nums, target) {
  let result = [], len = nums.length;
  if (nums.length < 4) {
    return [];
  }
  nums = nums.sort((a, b) => a - b);
  for (let a = 0; a < len - 3; a++) {
    if (nums[a] + nums[a + 1] + nums[a + 2] + nums[a + 3] > target) {
      break;
    }
    if ((a > 0 && nums[a] === nums[a - 1]) || (nums[a] + nums[len - 3] + nums[len - 2] + nums[len - 1] < target)) {
      continue;
    }
    for (let b = a + 1; b < len - 2; b++) {
      if (nums[a] + nums[b] + nums[b + 1] + nums[b + 2] > target) {
        break;
      }
      if ((b > a + 1 && nums[b] === nums[b - 1]) || (nums[a] + nums[b] + nums[len - 2] + nums[len - 1] < target)) {
        continue;
      }
      let left = b + 1, right = len - 1;
      while (left < right) {
        let sum = nums[a] + nums[b] + nums[left] + nums[right];
        if (sum === target) {
          result.push([nums[a], nums[b], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) {
            left++;
          }
          left++;
          while (left < right && nums[right] === nums[right - 1]) {
            right--;
          }
          right--;
        } else if (sum > target) {
          right--;
        } else if (sum < target) {
          left++;
        }
      }
    }
  }
  return result;
};

// console.log(fourSum2([1, 0, -1, 0, -2, 2], 0));
// console.log(fourSum2([-2,-1,-1,1,1,2,2],0));
// console.log(fourSum2([0,0,0,0],0));
// console.log(fourSum2([-1, 0, 1, 2, -1, -4], -1));
console.log(fourSum2([-3, -2, -1, 0, 0, 1, 2, 3], 0));

