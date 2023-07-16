/**
 * 动态规划
 * TODO：还需要后续复习
 * */
function maximumJumps(nums: number[], target: number): number {
  const len = nums.length;
  const def = Array(len).fill(-1);
  def[0] = 0;// 为什么把初始值置为0？当满足条件时，计算结果应该是0+1，而不是-1+1
  for (let i = 1; i < len; i++) { // 为什么i从1开始，j从0到i？i相当于是问题的范围，先把小范围也就是只有一个元素的数组对应的结果算出来，再计算2个元素的数组对应的结果。。。
    for (let j = 0; j < i; j++) {
      /**
       * 为什么这里要加限制def[j]!==-1？ 如果def[j]是-1，说明没法经过这个节点，所以也没必要继续跳下去。
       * 为什么这里不判断def[i]!==-1? 因为这里def[i]相当于某个小范围数组的终点，说明还没有跳到终点的路径，如果有符合条件的，就应该跳到终点，这里就没必要限制了
       * */
      if (Math.abs(nums[i] - nums[j]) <= target && def[j] !== -1) {
        def[i] = Math.max(def[i], def[j] + 1);
      }
    }
  }
  return def[len - 1];
}

// console.log(maximumJumps([1, 3, 6, 4, 1, 2], 2));// 3
// console.log(maximumJumps([1, 3, 6, 4, 1, 2], 3));// 5
// console.log(maximumJumps([1, 3, 6, 4, 1, 2], 0));// -1
// console.log(maximumJumps([1, 0, 2], 1));// 1
console.log(maximumJumps([0, 2, 1, 3], 1));// -1
