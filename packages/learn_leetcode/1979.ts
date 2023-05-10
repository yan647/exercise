function findGCD(nums: number[]): number {
    const list = nums.sort((a, b) => a - b)
    const min= list[0]
    let max = list[list.length-1]

    function getGCD(num1: number, num2: number): number {
        let remainder = num1 % num2
        if (remainder === 0) {
            return num2
        } else {
            return getGCD(num2, remainder)
        }
    }

    return getGCD(max, min);
};

// 这道题的关键也是数学知识

console.log(findGCD([2, 5, 6, 9, 10]))
