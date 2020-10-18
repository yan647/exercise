/**
 * Created by lsq on 2020/10/17.
 */

'use strict';

/**
 * @param {number[][]} towers
 * @param {number} radius
 * @return {number[]}
 */
var bestCoordinate = function (towers, radius) {
  let len = towers.length;
  if (len === 1) {
    return [towers[0][0], towers[0][1]];
  }
  let r_Max = 0, r_index = 0, result = [];
  for (let a = 0; a < len; a++) {
    let max = 0, index = 0;
    for (let b = 0; b < len; b++) {
      let dis=Math.sqrt((towers[a][0] - towers[b][0]) ** 2+ (towers[a][1] - towers[b][1]) ** 2);
      if (dis <= radius) {
        max += Math.floor(towers[b][2] / (1 + dis));
        index = a;
      }
    }
    if (r_Max < max) {
      r_Max = max;
      r_index = index;
      result = [[towers[a][0], towers[a][1]]];
    } else if (r_Max === max) {
      result.push([towers[a][0], towers[a][1]]);
    }
  }
  if (result.length > 1) {
    result.sort((a, b) => {
      if (a[0] < b[0]) {
        return -1;
      } else if (a[0] > b[0]) {
        return 1;
      } else if (a[1] < b[1]) {
        return -1;
      } else return 1;
    });
  }
  return result[0];
};

// console.log(bestCoordinate([[1, 2, 5], [2, 1, 7], [3, 1, 9]], 2));
// console.log(bestCoordinate( [[2,1,9],[0,1,9]], 2));
console.log(bestCoordinate( [[18,12,31],[45,39,36],[14,26,25]],34));//[45,39]
// console.log(bestCoordinate([[1, 2, 5], [2, 1, 7], [3, 1, 9]], 2));
// console.log(bestCoordinate([[1,2,13],[2,1,7],[0,1,9]],2));
