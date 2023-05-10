/**
 * Created by lsq on 2020/10/18.
 */

'use strict';

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if(!s.length){
    return true;
  }
  let arr=[],map=new Map();
  map.set("(",")").set("[","]").set("{","}");
  for(let a=0;a<s.length;a++){
    if(a===0){
      if([")","]","}"].includes(s[a])){
        return false;
      }
      arr.push(s[a]);
    } else {
      if(arr.length){
        if(map.get(arr[arr.length-1])===s[a]){
          arr.pop();
        } else arr.push(s[a]);
      } else arr.push(s[a]);
    }
  }
  return arr.length===0;
};

console.log(isValid("{[]}"));
