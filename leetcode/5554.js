/**
 * Created by lsq on 2020/11/1.
 */

'use strict';

/**
 * @param {number[]} arr
 * @param {number[][]} pieces
 * @return {boolean}
 */
var canFormArray = function (arr, pieces) {
  for (let a = 0; a < arr.length; a++) {
    for (let b = 0; b < pieces.length; b++) {
      let pieces_b = pieces[b];
      if (pieces_b.includes(arr[a])) {
        if (pieces_b.length === 1) {
          pieces.splice(b, 1);
          break;
        } else {
          let c = 1;
          a++;
          for (c; c < pieces_b.length; c++) {
            if (arr[a] === pieces_b[c]) {
              a++;
            } else break;
          }
          if (pieces_b.length !== c) {
            return false;
          } else {
            pieces.splice(b, 1);
            b=-1;
          }
        }
      } else if (b === pieces.length - 1) {
        return false;
      }
    }
  }
  return true;
};

console.log(canFormArray([85], [[85]]));//true
console.log(canFormArray([15,88],  [[88],[15]]));//true
console.log(canFormArray([49,18,16], [[16,18,49]]));//false
console.log(canFormArray([1,3,5,7], [[2,4,6,8]]));//false
console.log(canFormArray([91, 4, 64, 78], [[78], [4, 64], [91]]));//true
console.log(canFormArray([32,66,73,15,3,70,53],[[66,73],[15],[3],[32],[70],[53]]));//true




