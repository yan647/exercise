function isHappy(n: number): boolean {
    const list = String(n).split('')
    const result = list.reduce((prev, curr) => {
        return Number(prev) + Math.pow(Number(curr), 2);
    }, 0)
    if (result === 1) {
        return true;
    } else if (result !== n) {
        // 如果没有环
        return isHappy(result);
    } else {
        return false;
    }
};

console.log(isHappy(2));
