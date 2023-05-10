/**
 * Created by lsq on 2021/2/28.
 */

'use strict';

/**
 * @param {string[][]} items
 * @param {string} ruleKey
 * @param {string} ruleValue
 * @return {number}
 */
var countMatches = function (items, ruleKey, ruleValue) {
  let map = {
    'type': 0,
    'color': 1,
    'name': 2
  };
  let result = [];
  for (let a = 0; a < items.length; a++) {
    let item = items[a];
    if (item[map[ruleKey]] === ruleValue) {
      result.push(item);
    }
  }
  return result.length;
};
//type color name
console.log(countMatches([
    ["phone", "blue", "pixel"],
    ["computer", "silver", "lenovo"],
    ["phone", "gold", "iphone"]],
  "color",
  "silver"));//["computer","silver","lenovo"]

console.log(countMatches([["phone", "blue", "pixel"], ["computer", "silver", "phone"], ["phone", "gold", "iphone"]], "type", "phone"));//["phone","blue","pixel"] 和 ["phone","gold","iphone"]
