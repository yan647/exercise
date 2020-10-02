/**
 * Created by lsq on 2020/9/12.
 */

'use strict';

/**
 * @param {string} leaves
 * @return {number}
 */
var minimumOperations = function (leaves) {
  let len = leaves.length,
    f = Array(len);
  f[0] = [leaves[0] === 'r' ? 0 : 1, +Infinity, +Infinity];
  for (let a = 1; a < len; a++) {
    if (a === 1) {
      f[a] = [0, 0, +Infinity];
    } else f[a] = [0, 0, 0];
    f[a][0] = f[a - 1][0] + (leaves[a] === 'y' ? 1 : 0);
    f[a][1] = Math.min(f[a - 1][1], f[a - 1][0]) + (leaves[a] === 'r' ? 1 : 0);
    a >= 2 && (f[a][2] = Math.min(f[a - 1][1], f[a - 1][2]) + (leaves[a] === "y" ? 1 : 0));
  }
  return f[len - 1][2];
};

console.log(minimumOperations("rrryyyrryyyrr"));
console.log(minimumOperations("yry"));
