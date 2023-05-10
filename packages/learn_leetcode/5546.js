/**
 * Created by lsq on 2020/10/25.
 */

'use strict';
/**
 * @param {number[]} releaseTimes
 * @param {string} keysPressed
 * @return {character}
 */
var slowestKey = function(releaseTimes, keysPressed) {
  let maxTime=0,key=null;
  for(let a=0;a<releaseTimes.length;a++){
    let temp=0;
    if(a===0){
      temp=releaseTimes[a];
    } else temp=releaseTimes[a]-releaseTimes[a-1];
    if(temp>maxTime){
      maxTime=temp;
      key=keysPressed[a];
    } else if(temp==maxTime){
      if(keysPressed[a]>key){
        key=keysPressed[a];
      }
    }
  }
  return key;
};

console.log(slowestKey([9,29,49,50], "cbcd"))
