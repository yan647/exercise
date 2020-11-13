/**
 * Created by lsq on 2020/11/13.
 */

'use strict';

let firstUniqChar = function (s) {
  let arr = new Array(200).fill(0);
  for (let a = 0; a < s.length; a++) {
    arr[s[a].charCodeAt()]++;
  }
  for (let a = 0; a < s.length; a++) {
    if (arr[s[a].charCodeAt()] === 1) {
      return s[a];
    }
  }
  return " ";
};

console.log(firstUniqChar("abaccdeff"));
