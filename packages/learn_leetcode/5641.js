/**
 * Created by lsq on 2021/1/3.
 */

'use strict';

/**
 * @param {number[][]} boxTypes
 * @param {number} truckSize
 * @return {number}
 */
var maximumUnits = function (boxTypes, truckSize) {
  let maxTime = 0, maxNum = 0;
  for (let a = 0; a < boxTypes.length; a++) {
    let num = boxTypes[a][1], time = boxTypes[a][0];
    while (time) {
      if (num + maxNum < truckSize) {
        maxTime++;
        maxNum += num;
        time--;
      } else if (maxTime+1 === truckSize) {
        return num + maxNum;
      } else break;
    }
  }
  return maxNum;
};
console.log(maximumUnits([[1,3],[2,2],[3,1]], 4));
console.log(maximumUnits([[5,10],[2,5],[4,7],[3,9]], 10));

