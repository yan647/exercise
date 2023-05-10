/**
 * Created by lsq on 2022/8/21.
 */

'use strict';

function merge(intervals: number[][]): number[][] {
    const result = [];
    intervals = intervals.sort((a, b) => a[0] - b[0]);
    for (let a = 0; a < intervals.length; a++) {
        if(a===0){
            result.push(intervals[a]);
        }
        // if (intervals[a][1] >= intervals[a + 1][0]) {
        //     result.push([Math.min(intervals[a][0], intervals[a + 1][0]), Math.max(intervals[a][1], intervals[a + 1][1])]);
        //     a++;
        // } else {
        //     result.push(intervals[a]);
        // }
        const resultLen=result.length;
        if(result[resultLen-1][1]>=intervals[a][0]){
            result[resultLen-1][0]=Math.min(result[resultLen-1][0],intervals[a][0]);
            result[resultLen-1][1]=Math.max(result[resultLen-1][1],intervals[a][1]);
        } else{
            result.push(intervals[a]);
        }
    }
    return result;
};

console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));
console.log(merge([[1, 4], [4, 5]]));
console.log(merge([[1, 4], [0, 4]]));
console.log(merge([[1, 4], [0, 1]]));
console.log(merge([[1, 4], [0, 0]]));
console.log(merge([[1, 3], [2, 6], [8, 10], [15, 18]]));
console.log(merge([[1, 4], [0, 2], [3, 5]]));//[[0,5]]
