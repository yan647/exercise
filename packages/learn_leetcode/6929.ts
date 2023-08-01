function maximumBeauty(nums: number[], k: number): number {
  const len = nums.length;
  let result = 1;
  for (let i = 0; i < len; i++) {
    for (let j = nums[i] - k; j <= nums[i] + k; j++) {
      const temp = nums.filter((item) => item === j).length;
      if (temp) {
        nums[i] = j;
        result = Math.max(temp + 1, result);
      }
    }
  }
  return result;
}

console.log(maximumBeauty([4, 6, 1, 2], 2));// 3
