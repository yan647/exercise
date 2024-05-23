function longestEqualSubarray(nums: number[], k: number): number {
    const len = nums.length
    if (k === 0) {
        let result = [nums[0]]
        let maxLen = 1
        for (let i = 1; i < len; i++) {
            if (nums[i] === nums[i - 1]) {
                result.push(nums[i])
            } else {
                maxLen = Math.max(result.length, maxLen)
                result = [nums[i]]
            }
        }
        return maxLen
    } else if (len === 1) {
        return 1
    } else {
        // nums[i]作为等值数组的值
        let maxLen=0
        for (let i = 0; i < len; i++) {
            const value = nums[i]
            let result = 0
            let deleteCount = 0
            for (let i = 0; i < len; i++) {
                if (nums[i] === value) {
                    result++
                } else if (deleteCount <= k) {
                    deleteCount++
                } else {
                    break
                }
            }
            maxLen=Math.max(result,maxLen)
        }

        return maxLen
    }
};

console.log(longestEqualSubarray([1,1],0))
// console.log(longestEqualSubarray([1,3,2,3,1,3],0))
// console.log(longestEqualSubarray([1, 3, 2, 3, 1, 3], 3)) // 3