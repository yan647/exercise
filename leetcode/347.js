/**
 * Created by lsq on 2020/10/29.
 */

'use strict';

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function (nums, k) {
  let obj = {};
  for (let a = 0; a < nums.length; a++) {
    if (obj[nums[a]]) {
      obj[nums[a]]++;
    } else obj[nums[a]] = 1;
  }
  let arr = Object.entries(obj).sort((a, b) => {
    return b[1]-a[1];
  });
  arr=arr.map(data=>{
    return data[0];
  });
  return arr.splice(0,k);
};
console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
