/**
 * Created by lsq on 2020/9/12.
 * 斐波那契数列
 * https://leetcode-cn.com/problems/fei-bo-na-qi-shu-lie-lcof/
 */

'use strict';

/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  if (n === 0) {
    return 0;
  } else if (n === 1) {
    return 1;
  } else return fib(n - 1) + fib(n - 2);
};
//console.log(fib(100));

//加缓存
let fib2 = function (n) {
  let result = 0;
  if (n === 0) {
    fib2.result = [0];
    return 0;
  } else if (n === 1) {
    fib2.result = [0, 1];
    return 1;
  } else {
    result = fib2(n - 1) + fib2.result[n - 2];
    fib2.result.push(result);
    return result % (10 ** 9 + 7);
  }
};
console.log(fib2(100));

//动态规划
let fib3 = function (n) {
  let i = 0, j = 1, sum = 0;
  for (let a = 0; a < n; a++) {
    sum = (i + j) % (10 ** 9 + 7);
    i = j;
    j = sum;
  }
  return i;
};
console.log(fib3(100));

//JavaScript高级程序设计（第4版） P309 尾调用优化
let fib4=function(n){
  return fibImp1(0,1,n);
};
function fibImp1(a,b,n){
  if(n===0){
    return a;
  }
  return fibImp1(b,a+b,n-1);
}

console.log(fib4(100));


//JavaScript高级程序设计（第4版） P799 web worker
function fib5(n) {
  return n < 1 ? 0 : (n <= 2 ? 1 : (fib5(n - 1) + fib5(n - 2)));
}

const workerScript = `
    self.postMessage(
      (${fib5.toString()})(9)
    );
`;

const worker=new Worker(URL.createObjectURL(new Blob([workerScript])));
worker.onmessage=({data})=>console.log(data);
