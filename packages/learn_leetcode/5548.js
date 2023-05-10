/**
 * Created by lsq on 2020/10/25.
 */

'use strict';

/**
 * @param {number[][]} heights
 * @return {number}
 */
var minimumEffortPath = function (heights) {
  let row = heights.length, col = heights[0].length;
  let dp = Array(col);

  function dis(a, b) {
    let target = heights[a][b];
    let temp = [];
    if (a + 1 < heights.length) {
      temp.push(dp[a][b] + Math.abs(heights[a + 1][b] - target));
    }
    if (b + 1 < heights[0].length) {
      temp.push(dp[a][b] + Math.abs(heights[a][b + 1] - target));
    }
    if (a > 0) {
      temp.push(dp[a][b] + Math.abs(heights[a - 1][b] - target));
    }
    if (b > 0) {
      temp.push(dp[a][b] + Math.abs(heights[a][b - 1] - target));
    }
    return Math.min.call(temp);
  }

  for (let a = 0; a < row; a++) {
    for (let b = 0; b < col; b++) {
      if (b === 0) {
        if (a === 0) {
          dp[a] = [0]
        } else dp[a] = [];
      }
      dp[a][b] = dis(a, b);
    }
  }

  return dp[col - 1][row - 1];

};

console.log(minimumEffortPath([[1, 2, 2], [3, 8, 2], [5, 3, 5]]));
