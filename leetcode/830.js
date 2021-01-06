/**
 * Created by lsq on 2021/1/5.
 */

'use strict';

/**
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function (s) {
  let result = [];
  for (let a = 0; a < s.length - 1; a++) {
    if (s[a] === s[a + 1] && ((s[a - 1] && s[a - 1] !== s[a]) || s[a - 1] === undefined)) {
      let b = a + 1;
      for (; b < s.length - 1; b++) {
        if (s[b] !== s[b + 1]) {
          break;
        }
      }
      if (b - a >= 2) {
        result.push([a, b]);
      }
    }
  }
  return result;
};

console.log(largeGroupPositions("abbxxxxzzy"));
console.log(largeGroupPositions("abc"));
console.log(largeGroupPositions("abcdddeeeeaabbbcd"));
console.log(largeGroupPositions("aba"));
