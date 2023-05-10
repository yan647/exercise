/**
 * Created by lsq on 2020/10/21.
 */

'use strict';

/**
 * @param {string} name
 * @param {string} typed
 * @return {boolean}
 */
//双指针
var isLongPressedName = function (name, typed) {
  let a = 0, b = 0, n = name.length;
  while (b < typed.length) {
    if (a < n && (name[a] === typed[b])) {
      b++;
      a++;
    } else if (b - 1 >= 0 && (typed[b] === typed[b - 1])) {
      b++;
    } else return false;
  }
  return a === n;
};

console.log(isLongPressedName("alex", "alexxr"));
