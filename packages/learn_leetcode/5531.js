/**
 * Created by lsq on 2020/10/4.
 */

'use strict';

/**
 * @param {number[]} nums
 * @return {number}
 */
var specialArray = function(nums) {
  nums=nums.sort((a,b)=>a-b);
  let last=nums[nums.length-1],time=0;
  for(let x=1;x<=last;x++){
      for(let a=0;a<nums.length;a++){
        if(x<=nums[a]){
          time++;
        }

      }
      if(x===time){
        return x;
      } else time=0;
  }
  return -1;
};

console.log(specialArray([3,5]));
console.log(specialArray([5,5,5,5,5]));
