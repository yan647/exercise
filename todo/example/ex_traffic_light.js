/**
 * Created by lsq on 2020/11/17.
 * 如何实现一个红绿灯？初始为绿灯，间隔3S后变为黄灯，间隔1S后变为红灯，间隔2S后变为绿灯。两种方式代码实现一下
 */

'use strict';

function green(){
  console.log("green");
}

function red(){
  console.log("red");
}

function yellow(){
  console.log("yellow");
}

function promiseFun(func,time){
  new Promise(function(resolve,reject){
    setTimeout(function(){
      func();
    },time);
  });
}

function traffic_light(){
  green();
  promiseFun(yellow,3000).then(promiseFun(red,1000)).then(promiseFun(green,2000));
}


function* traffic_light2(){
  green();
  yield promiseFun(yellow,3000);
  yield promiseFun(red,1000);
  yield promiseFun(green,2000);
}

async function traffic_light3(){
  green();
  await promiseFun(yellow,3000);
  await promiseFun(red,1000);
  await promiseFun(green,2000);
}
