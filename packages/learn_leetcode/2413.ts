function smallestEvenMultiple(n: number): number {
    if (n % 2 === 0) {
        return n;
    }
    return 2 * n;
};

// 这道题的关键是数学知识，代码很简单

console.log(smallestEvenMultiple(10))
