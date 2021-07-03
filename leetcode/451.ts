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
