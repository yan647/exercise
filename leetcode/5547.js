/**
 * Created by lsq on 2020/10/25.
 */

'use strict';

/**
 * @param {number[]} nums
 * @param {number[]} l
 * @param {number[]} r
 * @return {boolean[]}
 */
var checkArithmeticSubarrays = function(nums, l, r) {
  let seach_len=l.length,result=[];
  function ifRight(arr){
    if(arr.length>2){
      arr=arr.sort((a,b)=>a-b);
      let temp=arr[1]-arr[0];
      for(let a=2;a<arr.length;a++){
        if(arr[a]-arr[a-1]!==temp){
          return false;
        }
      }
      return true;
    } return true;
  }
  for(let a=0;a<seach_len;a++){
    result.push(ifRight(nums.slice(l[a],r[a]+1)));
  }
  return result;
};

//console.log(checkArithmeticSubarrays([4,6,5,9,3,7],  [0,0,2],  [2,3,5]));
console.log(checkArithmeticSubarrays([-12,-9,-3,-12,-6,15,20,-25,-20,-15,-10],  [0,1,6,4,8,7],  [4,4,9,7,9,10]));
