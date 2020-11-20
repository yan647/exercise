/**
 * Created by lsq on 2020/11/19.
 */

'use strict';

/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
  let map=new Map();
  for(let a=0;a<nums.length;a++){
    if(map.has(nums[a])){
      return nums[a];
    } else map.set(nums[a],1);
  }
};

var findRepeatNumber2 = function(nums) {
  nums=nums.sort((a,b)=>a-b);
  for(let a=0;a<nums.length-1;a++){
    if(nums[a]===nums[a+1]){
      return nums[a];
    }
  }
};

var findRepeatNumber3 = function(nums) {
  let obj=[];
  for(let a=0;a<nums.length;a++){
    if(!obj[nums[a]]){
      obj[nums[a]]=1;
    } else return nums[a];
  }
};

console.log(findRepeatNumber3([3,1,2,3]));
