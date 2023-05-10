function maxSumTwoNoOverlap(nums: number[], firstLen: number, secondLen: number): number {
    let result = -Infinity
    let len = nums.length
    for (let i = 0; i < len - firstLen+1; i++) {
        for (let j = 0; j < len - secondLen+1; j++) {
            if ((firstLen + i <= j) || (i >= j + secondLen)) {
                let x = nums.slice(i, firstLen + i).concat(nums.slice(j, secondLen + j)).reduce((prev, curr) => prev + curr, 0)
                result = Math.max(result, x)
            }
        }
    }
    return result
};
// console.log(maxSumTwoNoOverlap([0,6,5,2,2,5,1,9,4],1,2)) // 20
// console.log(maxSumTwoNoOverlap([3,8,1,3,2,1,8,9,0],3,2))// 29
console.log(maxSumTwoNoOverlap([2, 1, 5, 6, 0, 9, 5, 0, 3, 8], 4, 3))// 31

function maxSumTwoNoOverlap2(nums: number[], firstLen: number, secondLen: number): number {
    // todo
}
