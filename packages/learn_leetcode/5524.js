/**
 * Created by lsq on 2020/9/27.
 */

'use strict';

/**
 * @param {number[]} customers
 * @param {number} boardingCost
 * @param {number} runningCost
 * @return {number}
 */
var minOperationsMaxProfit = function (customers, boardingCost, runningCost) {
  let current_time = 0, p_num=0, profit = 0, time = -1;
  for (let a = 0; a < customers.length; a++) {
    let data = customers[a], gap = data - 4;
    if (gap >= 0) {
      current_time++;
      p_num += 4;
      if (customers[a + 1]) {
        customers[a + 1] = customers[a + 1] + gap;
      } else customers[a + 1] = gap;
    } else if (gap < 0) {
      p_num += data;
      current_time++;
    }
    let temp_profit = p_num * boardingCost - runningCost * current_time;
    if (temp_profit > profit) {
      profit = temp_profit;
      time = current_time;
    }
  }
  return time;
};

console.log(minOperationsMaxProfit([8, 3], 5, 6));

console.log(minOperationsMaxProfit([10,9,6], 6, 4));
console.log(minOperationsMaxProfit([3,4,0,5,1], 1, 92));
