/**
 * Created by lsq on 2020/11/22.
 */

'use strict';
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  let map = new Map();
  for (let a = 0; a < s.length; a++) {
    let item = s[a];
    if (map.has(item)) {
      let time = map.get(item);
      map.set(item, ++time);
    } else map.set(item, 1);
  }
  for (let a = 0; a < t.length; a++) {
    let item = t[a];
    if (map.has(item) && map.get(item) > 0) {
      let time = map.get(item);
      map.set(item, --time);
    } else return false;
  }
  return true;
};

console.log(isAnagram("anagram", "nagaram"));
console.log(isAnagram("rat", "car"));
