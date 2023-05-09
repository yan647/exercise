/**
 * Created by lsq on 2020/11/12.
 * instanceof内部实现机制
 */

'use strict';
function Fun(name){
  this.name=name;
}

let fun=new Fun("aaa");
console.log(fun instanceof Fun);
console.log(Fun.prototype.isPrototypeOf(fun));


//内部实现机制
function instanceof2(left,right){
  let proto=right.prototype;
  left=Object.getPrototypeOf(left);// left.constructor.prototype
  while(true) {
    if(left===null){
      return false;
    }
    if(left === proto){
      return true;
    }
    left=Object.getPrototypeOf(left);
  }
}
console.log(instanceof2(fun,Object));
console.log(instanceof2(fun,fun));


