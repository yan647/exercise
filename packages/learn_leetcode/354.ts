// 动态规划的方法可以实现，但超出时间限制了
function maxEnvelopes1(envelopes: number[][]): number {
  const len = envelopes.length;
  const dp = Array(len).fill(1);// 每个元素表示这个位置套娃了几个小信封
  envelopes.sort((a, b) => a[0] - b[0]);
  let result = 1;
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (envelopes[i][0] > envelopes[j][0] && envelopes[i][1] > envelopes[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);// 这里为什么要跟自己比大小？dp[j]+1可能小于当前值，我们要的是最大
        result = Math.max(dp[i], result);
      }
    }
  }

  return result;
}

// TODO
function maxEnvelopes(envelopes: number[][]): number {

}

// console.log(maxEnvelopes([[5, 4], [6, 4], [6, 7], [2, 3]]));// 3
// console.log(maxEnvelopes([[5, 4], [6, 4], [6, 7], [2, 3], [1, 1]]));
// console.log(maxEnvelopes([[2, 2], [5, 4], [6, 4], [6, 7], [2, 3], [1, 1]]));
// console.log(maxEnvelopes([[1, 1], [1, 1], [1, 1]]));// 1
console.log(maxEnvelopes([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [5, 5], [6, 7], [7, 8]]));// 7
