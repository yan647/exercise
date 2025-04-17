function countPairs(nums: number[], k: number): number {
    const len = nums.length
    let result = 0
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            if (nums[i] === nums[j] && (i * j) % k === 0) {
                result++
            }
        }
    }
    return result
};

console.log(countPairs([3, 1, 2, 2, 2, 1, 3], 2))
console.log(countPairs([1, 2, 3, 4], 1))