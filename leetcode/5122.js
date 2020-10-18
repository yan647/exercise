/**
 * Created by lsq on 2020/10/17.
 */

'use strict';

/**
 * @param {number[]} arr
 * @return {number}
 */
var trimMean = function(arr) {
  arr=arr.sort((a,b)=> a-b);
  let len=arr.length;
  let num=Math.ceil(len*0.05);
  arr.splice(0,num);
  arr.splice(arr.length-num,num);
  return arr.reduce((a,b)=> a+b)/arr.length;
};

console.log(trimMean([1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3]));
