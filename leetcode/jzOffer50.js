/**
 * Created by lsq on 2020/11/13.
 */

'use strict';

let firstUniqChar = function (s) {
  let arr = new Array(200).fill(0);
  for (let a = 0; a < s.length; a++) {
    arr[s[a].charCodeAt()]++;
  }
  for (let a = 0; a < s.length; a++) {
    if (arr[s[a].charCodeAt()] === 1) {
      return s[a];
    }
  }
  return " ";
};

console.log(firstUniqChar("abaccdeff"));


let firstUniqChar1 = function (s) {
  let map = new Map();
  for (let a = 0; a < s.length; a++) {
    let item = s[a];
    if (map.has(item)) {
      let count=map.get(item);
      map.set(item, ++count);
    } else map.set(item, 1);
  }
  for(let a=0;a<s.length;a++){
    if(map.get(s[a])===1){
      return s[a];
    }
  }
  return " ";
};

console.log(firstUniqChar1("中国是中国人的"));
