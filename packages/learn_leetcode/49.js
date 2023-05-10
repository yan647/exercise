/**
 * Created by lsq on 2020/12/14.
 */

'use strict';

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let sort_strs = strs.map((data) => {
    let arr = data.split('');
    return arr.sort();
  });
  let result = {};
  for (let a = 0; a < strs.length; a++) {
    if (!result[sort_strs[a]]) {
      result[sort_strs[a]] = [strs[a]];
    } else result[sort_strs[a]].push(strs[a]);
  }
  return Object.values(result);
};
