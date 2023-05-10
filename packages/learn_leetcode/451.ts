/**
 * Created by lsq on 2021/7/3.
 */

'use strict';


function frequencySort(s: string): string {
  const strList = s.split('');
  let obj = {};
  strList.map((_str) => {
    if (obj[_str]) {
      obj[_str]++;
    } else obj[_str] = 1;
  });
  let list = Object.entries(obj);
  list = list.sort((a, b) => {
    return Number(b[1]) - Number(a[1]);
  });
  let resultStr = '';
  for (let a = 0; a < list.length; a++) {
    for (let b = 0; b < Number(list[a][1]); b++) {
      resultStr = resultStr + list[a][0];
    }
  }

  return resultStr;
}

console.log(frequencySort('tree'));
console.log(frequencySort('cccaaa'));
console.log(frequencySort("Aabb"));


//桶排序
function frequencySort1(s: string): string {
  let map = new Map();
  let strList = s.split('');
  let maxFreq = 0;
  for (let a = 0; a < strList.length; a++) {
    let freq = (map.get(strList[a]) || 0) + 1;
    map.set(strList[a], freq);
    maxFreq = Math.max(maxFreq, freq);
  }
  let bucket = new Array(maxFreq + 1).fill(0).map((_item) => []);
  for (const [key, num] of map.entries()) {
    bucket[num].push(key);
  }
  let result = '';
  for (let a = maxFreq; a > 0; a--) {
    for (let ch of bucket[a]) {
      for (let b = 0; b < a; b++) {
        result += ch;
      }
    }
  }
  return result;
}

console.log(frequencySort1('tree'));
console.log(frequencySort1('cccaaa'));
console.log(frequencySort1("Aabb"));
