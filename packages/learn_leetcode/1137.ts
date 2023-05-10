//方法一，会超时
function tribonacci1(n: number): number {
  if (n === 0) {
    return 0;
  } else if (n < 3) {
    return 1;
  } else {
    return tribonacci1(n - 1) + tribonacci1(n - 2) + tribonacci1(n - 3);
  }
}


function tribonacci(n: number): number {
  if (n === 0) {
    return 0;
  } else if (n < 3) {
    return 1;
  } else {
    let result = [0, 1, 1];
    for (let a = 3; a <= n; a++) {
      result[a] = result[a - 1] + result[a - 2] + result[a - 3];
    }
    return result[n];
  }
}
