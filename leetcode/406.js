/**
 * Created by lsq on 2020/11/16.
 */

'use strict';

/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  let result = new Array(people.length);
  people = people.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    } else return b[1] - a[1];
  });
  people.map((item, index) => {
    let space = item[1] + 1;
    for (let a = 0; a < people.length; a++) {
      if (!result[a]) {
        space--;
        if (space === 0) {
          result[a] = item;
          break;
        }
      }
    }
  });
  return result;
};

console.log(reconstructQueue([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]));
