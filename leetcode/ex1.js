/**
 * Created by lsq on 2020/9/12.
 */

'use strict';


/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  let arr = s.split(""), x = 1, y = 0;
  for (let a = 0; a < arr.length; a++) {
    [x, y] = arr[a] === "A" ? aFun(x, y) : bFun(x, y);
  }
  return x+y;
};

function aFun(x, y) {
  return [2 * x + y, y];
}

function bFun(x, y) {
  return [x, 2 * y + x];
}

console.log(calculate("AB"));//4
console.log(calculate("AABBA"));
