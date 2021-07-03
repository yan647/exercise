/**
 * Created by lsq on 2020/10/2.
 */

'use strict';

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {//todo
  if (x <2) {
    return x;
  }
  let small = 1, large = x>>1;
  while (small < large) {
    // let middle = parseInt((small+1)/2);
    let middle=(small+1)>>1;
    if (middle*middle > x) {
      large = large - 1;
    } else if(middle*middle<x){
      small = small + 1;
    } else return middle;
  }
  return large;
};

// console.log(mySqrt(16));
console.log(mySqrt(8));

let mySqrt2 = function (x) {
  let result = 0;
  if (x === 0) {
    return 0;
  } else {
    result = Math.pow(Math.E, Math.log(x) * (1 / 2))
  }
  return (result + 1) * (result + 1) <= x ? (result + 1) : result
};
// console.log(mySqrt2(9));
