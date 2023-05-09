/**
 * Created by lsq on 2020/11/12.
 * 闭包
 */

'use strict';
//访问私有变量和方法
let counter = (function () {
  let privateCounter = 0;//私有属性
  function change(val) {//私有方法
    privateCounter += val;
  }

  return {
    value: function () {
      return privateCounter;
    },
    increment: function () {
      change(1);
    },
    decrement: function () {
      change(-1);
    }
  }
})();
console.log(counter.value());
counter.increment();
console.log(counter.value());
counter.decrement();
console.log(counter.value());


//模拟公有、静态变量、方法
function Sub(a) {
  this.a = a;
  let b = 1;//私有静态属性
  let privateStaticMethod = function () {
  };//私有静态方法
  return function (props) {
    let title;//私有属性
    this.getTitle = function () {//私有方法
      return title;
    };
    this.setTitle = (title) => {
      this.title = title;
    };
  }
}

Sub.staticMethod = function () {
};//公有静态方法
Sub.prototype.publicSharedMethod = function () {
};//公有方法


//把普通函数转化为偏函数
function partialApply(fun, ...remainParams) {
  return function (...lastParams) {
    return fun.apply(this, remainParams.concat(lastParams));
  }
}

const add = (a, b) => a + b;
const add10 = partialApply(add, 10);
console.log(add10(5));


//循环中创建闭包
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  });
}

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  });
}

function foo(){
  for (var i = 0; i < 5; i++) {
    (function(j){
      setTimeout(function(){
        console.log(j);
      });
    })(i)
  }
}
foo();





