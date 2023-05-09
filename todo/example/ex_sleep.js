/**
 * Created by lsq on 2020/12/2.
 */

'use strict';

function mySleep(func, time) {
  new Promise((resolve, reject) => {
    setTimeout(() => {
        let data = func.call(arguments);
        resolve(data);
      }, time)
  });
}

//方法一
function sleep1(ms, callback) {
  setTimeout(callback, ms)
}
//sleep 1s
sleep1(1000, () => {
  console.log(1000)
})
//方法二
function sleep2(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms)
  })
}
sleep2(1000).then(() => {
  console.log(2000)
})
//方法三
function sleep3(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms)
  })
}
async function init() {
  await sleep3(1000);
}
init().then(() => {
  console.log(3000)
})
