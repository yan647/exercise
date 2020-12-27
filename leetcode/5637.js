/**
 * Created by lsq on 2020/12/27.
 */

'use strict';

/**
 * @param {string} s
 * @return {boolean}
 */
var halvesAreAlike = function(s) {
  let target=['a','e','i','o','u','A','E','I','O','U'],len=s.length,left_target_len=0,right_target_len=0;
  for(let a=0;a<len/2;a++){
    if(target.includes(s[a])){
      left_target_len++;
    }
    if(target.includes(s[len-a-1])){
      right_target_len++;
    }
  }
  return left_target_len===right_target_len;
};

console.log(halvesAreAlike('book'));
