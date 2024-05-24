// 超时了
function longestEqualSubarray1(nums: number[], k: number): number {
    const len = nums.length
    let maxLen = 0
    let obj: Record<number, number> = {}
    for (let i = 0; i < len; i++) {
        const value = nums[i]
        // console.log(`第${i}轮，目标数字：${value}`)
        for (let j = i + 1; j < len + 1; j++) {
            const newNums = nums.slice(i, j)
            const gap = newNums.length - newNums.filter((item) => item === nums[i]).length
            // console.log(`子数组长度${newNums.length}，需要删的数字个数：${gap}`)
            if (gap <= k) {
                maxLen = Math.max(newNums.length - gap, maxLen)
            }
        }
        if (maxLen === nums.length) {
            break
        }
    }

    return maxLen
};


function longestEqualSubarray(nums: number[], k: number): number {
    const len = nums.length
    const map = new Map<number, number[]>()
    for (let a = 0; a < len; a++) {
        if (!map.get(nums[a])) {
            map.set(nums[a], [])
        }
        map.get(nums[a]).push(a)
    }

    let result = 0
    for (let list of map.values()) {
        for (let i = 0, j = 0; i < list.length; i++) {
            while (list[i] - list[j] - (i - j) > k) {
                j++
            }
            result = Math.max(result, i - j + 1)
        }
    }
    return result
}

console.log(longestEqualSubarray([1, 1], 0))// 2
console.log(longestEqualSubarray([1, 3, 2, 3, 1, 3], 0))//1
console.log(longestEqualSubarray([1, 3, 2, 3, 1, 3], 3)) // 3
console.log(longestEqualSubarray([4, 4, 2, 2, 4], 1))// 2