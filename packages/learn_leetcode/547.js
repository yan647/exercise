/**
 * Created by lsq on 2021/1/7.
 */

'use strict';

/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function(M) {
  let candidate=[],individual=[];
  for(let a=0;a<M.length;a++){
    for(let b=a+1;b<M[0].length;b++){
      if(a!==b){
        if(M[a][b]===1){//连接
          candidate.push([a,b]);
        }
      } else individual.push(a);
    }
  }
  let result=individual.length;
  while(candidate.length>1){

  }
  return result;
};
