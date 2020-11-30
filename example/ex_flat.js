/**
 * Created by lsq on 2020/11/5.
 * 模拟flat
 * 数组拍平
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 */

'use strict';

function flat1(arr, num = 1) {
  return num > 0 ? arr.reduce(function (prev, curr) {
    return prev.concat(Array.isArray(curr) ? flat1(curr, --num) : curr);
  }, []) : arr;
}

console.log(flat1([1, 2, 3, [4, 5, [6, 7]]]));

function flat2(arr, num = 1) {
  let result = [];
  if (num > 0) {
    arr.forEach((item) => {
      result = result.concat(Array.isArray(item) ? flat2(item, --num) : item);
    });
    return result;
  } else return arr;
}

console.log(flat2([1, 2, 3, [4, 5, [6, 7]]], 2));

function flat3(arr, num = 1) {//todo
  let result = [], stack = arr;
  if (num > 0) {
    while (stack.length) {
      let item = stack.pop();
      if (Array.isArray(item)) {
        stack.push(...item);
      } else result.push(item);
    }

    return result.reverse();
  } else return arr;
}

// [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]
function flat4(arr){
  let result=[];
  for(let a=0;a<arr.length;a++){
    if(Array.isArray(arr[a])){
      arr[a]=flat4(arr[a]);
    }
    result=result.concat(arr[a]);
  }
  return [...new Set(result.sort((a,b)=>a-b))];
}
console.log(flat4([ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10]));
