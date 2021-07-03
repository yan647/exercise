/**
 * Created by lsq on 2020/10/18.
 */

'use strict';

/**
 * @param {string} s
 * @return {number}
 */
var maxLengthBetweenEqualCharacters = function(s) {
  let result=-1;
  for(let a=0;a<s.length;a++){
    for(let b=a+1;b<s.length;b++){
      if(s[a]===s[b]){
        result=Math.max(result,b-a);
      }
    }
  }
  return result;
};

console.log(max("aa"));
