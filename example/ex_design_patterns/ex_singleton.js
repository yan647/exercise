/**
 * Created by lsq on 2020/11/12.
 */

'use strict';
let request=require("request");
let jsdom=require("jsdom");
let JSDOM=jsdom.JSDOM;
let document=new JSDOM(body).window.document;

let CreateDiv = function (html) {//单一职责原则
  this.html = html;
  this.init();
};

CreateDiv.prototype.init = function () {
  let div = document.createElement("div");
  div.innerHTML = this.html;
  document.body.appendChild(div);
};

//引入代理（缓存代理）
//管理单例
let ProxySingletonCreateDiv=(function(){
  let instance;
  return function(html){//使用闭包把instance保留在内存中
    if(!instance){
      instance=new CreateDiv(html);
    }
    return instance;
  }
})();

let a=new ProxySingletonCreateDiv("aaa");
let b=new ProxySingletonCreateDiv("bbb");

console.log(a===b);
