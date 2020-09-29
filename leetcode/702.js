/**
 * Created by lsq on 2020/9/29.
 */

'use strict';

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let left=0,right=nums.length-1;
  while(left<=right){
    let mid=parseInt((left+right)/2);
    if(nums[mid]<target){
      left=mid+1;
    } else if(nums[mid]===target){
      return mid;
    } else right=mid-1;
  }
  return -1;
};

console.log(search([-1,0,3,5,9,12],9));
