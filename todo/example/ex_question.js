/**
 * Created by lsq on 2020/10/29.
 */

'use strict';

function SuperObj(a){
  this.a=a;
}

function SubObj(b){
  this.b=b;
  this.fun=function(){};
}

SubObj.prototype=new SuperObj();

let ex=new SubObj();



function SuperObj(a){
  this.a=a;
}

function SubObj(b){
  SuperObj.call(this);
}

let ex=new SubObj();


SubObj=Object.create(SubObj,{});


