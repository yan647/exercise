/**
 * Created by lsq on 2020/10/29.
 * todo 动态规划、精选的题解看不懂
 */

'use strict';

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  if (s === "" && t === "") {
    return true;
  }
  let t_len = t.length, s_len = s.length;
  let a = 0;
  for (let b = 0; b < t_len; b++) {
    if (a >= s_len) {
      return true;
    }
    if (a === 0) {
      if (s[a] === t[b]) {
        if (a === s_len - 1) {
          return true;
        } else a++;
      }
    } else if (s[a] === t[b]) {
      if (a === s_len - 1) {
        return true;
      } else a++;
    }
  }
  return false;
};

console.log(isSubsequence("abc", "ahbgdc"));//true
console.log(isSubsequence("acd", "ahbgdc"));//false
console.log(isSubsequence("axc", "ahbgdc"));//false
console.log(isSubsequence("twn", "xtxwxn"));//true
