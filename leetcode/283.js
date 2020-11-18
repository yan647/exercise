/**
 * Created by lsq on 2020/11/19.
 */

'use strict';
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let time=0,len=nums.length;
  for(let a=0;a<len;a++){
    if(time+a===len-1){
      return nums;
    }
    if(nums[a]===0){
      nums.push(nums.splice(a,1)[0]);
      a--;
      time++;
    }
  }
};

console.log(moveZeroes( [0,1,0,3,12]));
console.log(moveZeroes( [0,0,0,3,12,0,0,0]));
