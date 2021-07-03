/**
 * Created by lsq on 2020/10/17.
 */

'use strict';

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  let arr = Array(n).fill(Array(n));
  let column = [], flag = true;
  for (let a = 0; a < n - 1; a++) {
    for (let b = a + 1; b <= n; b++) {
      if (a === 0 && b === 0) {
        column.push(b);
        break;
      }
      let minus = b - a, add = a + b;
      for (let i = 0; i < n; i++) {
        if (column[i] === i + minus || column[i] === i + add) {
          break;
        }
      }
      if (b === n) {
        flag = false;
        break;
      }
      column.push(n);
    }
    if (flag === false) {//不满足条件回溯
      flag = true;
      a--;

    }
  }
};

console.log(solveNQueens(4));
