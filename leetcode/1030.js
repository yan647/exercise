/**
 * Created by lsq on 2020/11/17.
 */

'use strict';

/**
 * @param {number} R
 * @param {number} C
 * @param {number} r0
 * @param {number} c0
 * @return {number[][]}
 */
var allCellsDistOrder = function(R, C, r0, c0) {
  let result=[];
  for(let a=0;a<R;a++){
    for(let b=0;b<C;b++){
      let dis=Math.abs(a-r0)+Math.abs(b-c0);
      result.push({
        dis:dis,
        rc:[a,b]
      })
    }
  }
  return result.sort((a,b)=>{
    return a.dis-b.dis;
  }).map((data)=>{
    return data.rc;
  });
};
console.log(allCellsDistOrder(1,2,0,0));
console.log(allCellsDistOrder(2,2,0,1));
console.log(allCellsDistOrder(2,3,1,2));
