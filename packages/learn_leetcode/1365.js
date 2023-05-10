/**
 * Created by lsq on 2020/10/26.
 */

'use strict';

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
  let result=Array(nums.length).fill(0);
  nums=nums.map((data,index)=>{
    return {
      data:data,
      index:index
    }
  }).sort((a,b)=>{
    return a.data-b.data;
  });
  for(let a=0;a<nums.length;a++){
    let data=nums[a];
    if(a===0){
      result[data.index]=0;
    } else {
      if(data.data>nums[a-1].data){
        result[data.index]=result[nums[a-1].index]+1;
      }
    }
  }
  return result;
};

console.log(smallerNumbersThanCurrent([8,1,2,2,3]));
