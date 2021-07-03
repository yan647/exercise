/**
 * Created by lsq on 2021/1/9.
 */

'use strict';

/**
 * @param {string} s
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
var maximumGain = function (s, x, y) {
  let total = 0;
  let len = s.length;
  let index = -1;
  let firstChar, firstStr, firstScore, secondChar, secondStr, secondScore;
  if (x > y) {
    firstChar = 'a';
    secondChar = 'b';
    firstStr = 'ab';
    secondStr = 'ba';
    firstScore = x;
    secondScore = y;
  } else {
    firstChar = 'b';
    secondChar = 'a';
    firstStr = 'ba';
    secondStr = 'ab';
    firstScore = y;
    secondScore = x;
  }
  for (let a = 0; a < len; a++) {
    if (s[a] === firstChar) {
      if (s[a + 1] && s[a + 1] === secondChar) {
        s = s.replace(firstStr, '');
        total += firstScore;
        len -= 2;
        a -= 2;
      }
    } else if (s[a] === secondChar && index === -1) {
      index = a;
    }
  }
  for (let a = index; a < len; a++) {
    if (s[a] === secondChar) {
      if (s[a + 1] && s[a + 1] === firstChar) {
        s = s.replace(secondStr, '');
        total += secondScore;
        len -= 2;
        a -= 2;
      }
    }
  }
  return total;
};
// console.log(maximumGain("cdbcbbaaabab", 4, 5));
// console.log(maximumGain("aabbaaxybbaabb", 5, 4));
console.log(maximumGain("bbbaaabab", 5, 5));

