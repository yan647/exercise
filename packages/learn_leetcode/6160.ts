function answerQueries(nums: number[], queries: number[]): number[] {
  const result = [];
  for (let a = 0; a < queries.length; a++) {
    let subArr: number[] = [];
    const sumArr: number[] = [];
    for (let b = 0; b < nums.length; b++) {
      let sumArrLen = sumArr.length;
      let sumArrIndex = sumArrLen === 0 ? 0 : (sumArrLen - 1);
      if ((sumArr[sumArrIndex] || 0) + nums[b] <= queries[a]) {
        subArr.push(nums[b]);
        sumArr[sumArrIndex] = (sumArr[sumArrIndex] || 0) + nums[b];
      } else {
        subArr.push(nums[b]);
        subArr = delMax(subArr);
        if (subArr.length) {
          sumArr[sumArrIndex] = subArr.reduce((a, b) => a + b);
        } else sumArr[sumArrIndex] = 0;
      }
    }
    result.push(subArr.length);
  }
  return result;
}

function delMax(arr: number[]): number[] {
  let max = 0;
  let maxIndex = 0;
  for (let a = 0; a < arr.length; a++) {
    if (arr[a] > max) {
      max = arr[a];
      maxIndex = a;
    }
  }
  arr.splice(maxIndex, 1);
  return arr;
}

console.log(answerQueries([4, 5, 2, 1], [3, 10, 21]));
console.log(answerQueries([2, 3, 4, 5], [1]));
// console.log(answerQueries([1, 6, 5, 1, 2, 3, 9], [6]));
console.log(answerQueries([469781, 45635, 628818, 324948, 343772, 713803, 452081], [816646, 929491]));//[3,3]

