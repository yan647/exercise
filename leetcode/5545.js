/**
 * Created by lsq on 2020/10/18.
 */

'use strict';

/**
 * @param {number[]} scores
 * @param {number[]} ages
 * @return {number}
 */
var bestTeamScore = function(scores, ages) {
  let arr=[];
  for(let a=0;a<scores.length;a++){
    arr.push({
      score:scores[a],
      age:ages[a]
    });
  }
  arr.sort((a,b)=>a.age-b.age);
  for(let a=0;a<scores.length;a++){
    for(let b=a+1;b<scores.length;b++){
      if(arr[a].score>arr[b].score && arr[a].age<arr[b].age){
        arr.splice(b,1);
      } else if(arr[a].score<arr[b].score && arr[a].age>arr[b].age){
        arr.splice(a,1);
      }

    }
  }
  return scores.reduce((a,b)=>a+b);
};
console.log(bestTeamScore([1,2,3,5],[8,9,10,1]));
