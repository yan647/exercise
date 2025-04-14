// 暴力解法| 官方解法一枚举
function countGoodTriplets(arr: number[], a: number, b: number, c: number): number {
    const len = arr.length;
    let result = 0
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            for (let k = j + 1; k < len; k++) {
                // console.log(`i=${i}, j=${j}, k=${k},
                // arr[i]=${arr[i]},arr[j]=${arr[j]},arr[i]=${arr[k]},
                // arr[i] - arr[j]=${arr[i] - arr[j]},a=${a}
                // arr[j] - arr[k]=${arr[j] - arr[k]},b=${b}
                // arr[i] - arr[k]=${arr[i] - arr[k]},c=${c}
                // `);
                if (Math.abs(arr[i] - arr[j]) <= a
                    && Math.abs(arr[j] - arr[k]) <= b
                    && Math.abs(arr[i] - arr[k]) <= c) {
                    result += 1;
                    console.log('success!!!')
                }
            }
        }
    }
    return result
};

console.log(countGoodTriplets([3, 0, 1, 1, 9, 7], 7, 2, 3))
console.log(countGoodTriplets([1, 1, 2, 2, 3], 0, 0, 1))
console.log(countGoodTriplets([7, 3, 7, 3, 12, 1, 12, 2, 3], 5, 8, 1))

