// todo 这道题看了题解也没看明白
// todo 跟300有点类似
function longestArithSeqLength(nums: number[]): number {
    let result = 0;
    const len = nums.length
    const f: number[][] = Array.from({length: len}, () => new Array(1001).fill(0))
    for (let i = 1; i < len; i++) {
        for (let k = 0; k < i; k++) {
            const j = nums[i] - nums[k] + 500
            f[i][j] = Math.max(f[i][j], f[k][j] + 1)
            result = Math.max(f[i][j], result)
        }
    }

    return result+1;
};

console.log(longestArithSeqLength([3, 6, 9, 12]))// 4
