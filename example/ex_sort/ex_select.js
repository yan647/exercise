/**
 * Created by lsq on 2020/10/3.
 */

'use strict';

function select(arr) {
  let result = [], max = -Infinity, max_index = 0;
  while (arr.length) {
    for (let a = 0; a < arr.length; a++) {
      if (arr[a] > max) {
        max = arr[a];
        max_index = a;
      }
    }
    result.push(max);
    arr.splice(max_index, 1);
    max = -Infinity;
  }
  return result;
}

console.log(select([1, 7, 2, 9, 6, 3, 5, 8, 4, 0]));
