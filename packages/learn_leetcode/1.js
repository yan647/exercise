/**
 * Created by lsq on 2020/9/12.
 */

'use strict';

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
let twoSum = function (nums, target) {
  for (let a = 0; a < nums.length - 1; a++) {
    for (let b = a + 1; b < nums.length; b++) {
      if (nums[a] + nums[b] === target) {
        return [a, b];
      }
    }
  }
};
console.log(twoSum([2, 7, 11, 15], 9));

let twoSum2 = function (nums, target) {
  let map = new Map();
  for (let a = 0; a < nums.length; a++) {
    map.set(nums[a], a);
  }
  for (let a = 0; a < nums.length; a++) {
    let temp = target - nums[a];
    if (map.has(temp)) {
      return [a, map.get(temp)];
    }
  }
};
console.log(twoSum2([2, 7, 11, 15], 9));

let twoSum3=function(nums,target){
  let map=new Map();
  for(let a=0;a<nums.length;a++){
    let temp=target-nums[a];
    if(map.has(temp)){
      return [a,map.get(temp)];
    }
    map.set(nums[a],a);
  }
};
console.log(twoSum3([2, 7, 11, 15], 9));



