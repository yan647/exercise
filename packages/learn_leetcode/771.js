/**
 * Created by lsq on 2020/10/2.
 */

'use strict';

/**
 * @param {string} J
 * @param {string} S
 * @return {number}
 */
var numJewelsInStones = function(J, S) {
  let sum=0,sList=S.split("");
  for(let a=0;a<J.length;a++){
    for(let b=0;b<sList.length;b++){
      if(J[a]===sList[b]){
        sum++;
        sList.splice(b,1);
        b--;
      }
    }
  }
  return sum;
};

console.log(numJewelsInStones("aA", "aAAbbbb"));
