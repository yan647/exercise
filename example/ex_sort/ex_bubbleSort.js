/**
 * Created by lsq on 2020/12/6.
 * 冒泡排序
 */

'use strict';


//方法一
function bubble1(arr) {
  let len = arr.length;
  for (let a = 0; a < len - 1; a++) {
    for (let b = 0; b < len - 1 - a; b++) {
      if (arr[b] > arr[b + 1]) {
        let temp = arr[b];
        arr[b] = arr[b + 1];
        arr[b + 1] = temp;
      }
    }
  }
  return arr;
}

var arr = [1, 3, 2, 9, 4, 5, 8, 7, 6];
bubble1(arr);

//方法二 如果数组已经排好序了，就直接跳出循环
function bubble2(arr) {
  let len = arr.length, ifSort = true;
  for (let a = 0; a < len - 1; a++) {
    for (let b = 0; b < len - 1 - a; b++) {
      if (arr[b] > arr[b + 1]) {
        let temp = arr[b];
        arr[b] = arr[b + 1];
        arr[b + 1] = temp;
        ifSort = false;
      }
    }
    if (ifSort) {
      break;
    }
  }
  return arr;
}

//方法三
function bubble3(arr) {
  let len = arr.length, ifSort = true, maxLen = len - 1;
  for (let a = 0; a < len - 1; a++) {
    let pos = 0;
    for (let b = 0; b < maxLen; b++) {
      if (arr[b] > arr[b + 1]) {
        let temp = arr[b];
        arr[b] = arr[b + 1];
        arr[b + 1] = temp;
        ifSort = false;
        pos = b;
      }
    }
    if (ifSort) {
      break;
    }
    maxLen = pos;
  }
  return arr;
}

//鸡尾酒排序
function bubble4(arr) {
  let len = arr.length;
  let ifSort = true;
  let maxLen = len-1;
  let n = 0;
  for (let a = 0; a < len - 1; a++) {
    ifSort = true;
    let k=0;
    for (let b = n; b < maxLen; b++) {
      if (arr[b] > arr[b + 1]) {
        let temp = arr[b + 1];
        arr[b + 1] = arr[b];
        arr[b] = temp;
        ifSort = false;
        k=b;
      }
    }
    if (ifSort === true) {
      return arr;
    }
    maxLen=k;
    for (let b = maxLen; b > n; b--) {
      if (arr[b] < arr[b - 1]) {
        let temp = arr[b - 1];
        arr[b - 1] = arr[b];
        arr[b] = temp;
        ifSort = false;
      }
    }
    if (ifSort === true) {
      return arr;
    }
    n++;
  }
}

console.log(bubble1([1, 3, 2, 9, 4, 5, 8, 7, 6]));
console.log(bubble2([1, 3, 2, 9, 4, 5, 8, 7, 6]));
console.log(bubble3([1, 3, 2, 9, 4, 5, 8, 7, 6]));
console.log(bubble4([1, 3, 2, 9, 4, 5, 8, 7, 6]));
