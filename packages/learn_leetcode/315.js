/**
 * Created by lsq on 2020/11/16.
 */

'use strict';

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var countSmaller = function(nums) {//暴力，超时
  let counts=new Array(nums.length).fill(0);
  for(let a=0;a<nums.length;a++){
    for(let b=a+1;b<nums.length;b++){
      if(nums[b]<nums[a]){
        counts[a]++;
      }　
    }
  }
  return counts;
};　

console.log(countSmaller([5,2,6,1]));
