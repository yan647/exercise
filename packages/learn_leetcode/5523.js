/**
 * Created by lsq on 2020/9/27.
 */

'use strict';

/**
 * @param {string[]} logs
 * @return {number}
 */
var minOperations = function (logs) {
  let list = [];
  logs.map((data) => {
    switch (data) {
      case "./":
        break;
      case "../":
        if (list.length) {
          list.pop();
        }
        break;
      default:
        let index=list.indexOf(data);
        list.push(data);
        break;
    }
  });
  return list.length;

};

console.log(minOperations(["d1/", "d2/", "../", "d21/", "./"]));//2
console.log(minOperations(["d1/","d2/","./","d3/","../","d31/"]));//3
console.log(minOperations(["d1/","../","../","../"]));//0
console.log(minOperations(["./","c1/","pj5/","e5/","y6/","../","u4/","a5/","../","nq5/","../","m2/","w0/","./","./",
  "uf5/","z8/","../","z8/","r7/","ez6/","u4/","it2/","./","../","./","tb9/","o4/"]));//13

