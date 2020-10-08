/**
 * Created by lsq on 2020/10/8.
 */

'use strict';

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  for (let a = 0; a < s.length; a++) {
    s.splice(s.length - a, 0, s[0]);
    s.shift();
  }
};

reverseString(["h", "e", "l", "l", "o"]);

var reverseString2 = function (s) {
  for (let left = 0, right = s.length - 1; left < right; left++, right--) {
    [s[left], s[right]] = [s[right], s[left]];
  }
};
reverseString2(["h", "e", "l", "l", "o"]);
