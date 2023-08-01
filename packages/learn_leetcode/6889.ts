function sumOfSquares(nums: number[]): number {
  const len = nums.length;
  return nums.filter((item, index) => !(len % (index + 1))).reduce((prev, cur) => prev + cur * cur, 0);
}

console.log(sumOfSquares([1, 2, 3, 4])); // 21
console.log(sumOfSquares([2, 7, 1, 19, 18, 3]));// 63
