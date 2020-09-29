/**
 * Created by lsq on 2020/9/29.
 */

'use strict';

/**
 * 插入排序
 * @param arr
 * @returns {[]|*[]}从小到大排序
 */
function insert(arr) {
  let result = [];
  if (!arr.length) {
    return [];
  } else {
    arr.map((data) => {
      let len = result.length;
      if (!len) {
        result.push(data);
      } else for (let a = len - 1; a >= 0; a--) {
        if (result[a] <= data) {
          result.splice(a + 1, 0, data);
          break;
        } else if (a === 0 && result[a] > data) {
          result.unshift(data);
        }
      }
    });
    return result;
  }
}

console.log(insert([3, 2, 4, 1, 6, 9, 8, 5, 7, 0]));


function binaryInsert(arr) {
  let result = [];
  if (!arr.length) {
    return [];
  } else {
    arr.map((data, index) => {
      let len = result.length;
      if (!len) {
        result.push(data);
      } else {
        let left = 0, right = index;
        while (left <= right) {
          let mid = parseInt((left + right) / 2);
          if (result[mid] > data) {
            right = mid - 1;
          } else left = mid + 1;
        }
        result.splice(right + 1, 0, data);
      }
    });
    return result;
  }
}

console.log(binaryInsert([3, 2, 4, 1, 6, 9, 8, 5, 7, 0]));
