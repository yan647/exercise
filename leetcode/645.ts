/**
 * Created by lsq on 2021/7/4.
 */

'use strict';

function findErrorNums(nums: number[]): number[] {
  const len = nums.length;
  nums = nums.sort((a,b)=>a-b);
  const errList = [];
  let prev = 0, cur = nums[0];
  for (let a = 0; a < len; a++) {
    cur = nums[a];
    if (prev === cur) {
      errList[0] = prev;
    } else if (cur - prev > 1) {
      errList[1] = prev + 1;
    }
    prev = cur;
  }
  if (nums[len - 1] !== len) {
    errList[1] = len;
  }
  return errList;
}

console.log(findErrorNums([2, 2]));//2,1
console.log(findErrorNums([1, 2, 3, 4, 4]));//4,5
console.log(findErrorNums([1, 3, 3]));//3,2
console.log(findErrorNums([3, 2, 3, 4, 6, 5]));//3,1
//2,3,3,4,5,6

