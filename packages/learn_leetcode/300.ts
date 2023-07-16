/**
 * 子串一定是连续的，而子序列不一定是连续的
 * */
function lengthOfLIS(nums: number[]): number {
  const len = nums.length;
  if (!len) {
    return 0;
  }
  const dp = Array(len).fill(1);// 这里默认填充1，是因为最长递增子序列，最少也包括自己，长度最少也有1
  let result = 1;
  for (let i = 1; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) { // dp数组里存的是最长递增子序列的长度，没有存子序列具体内容，怎么知道新加的元素跟之前的元素是否能组成最长递增子序列？因为是递增，而i>j，所以只要判断nums[i] nums[j]的大小就可以
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    result = Math.max(dp[i], result);// 最终结果跟某个子范围比较，找到最长
  }
  return result;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));// 4，最长递增子序列：[2,3,7,101]
