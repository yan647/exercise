/**
 * Created by lsq on 2020/11/18.
 */

'use strict';

var CQueue = function() {
  this.stack1=[];
  this.stack2=[];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function(value) {
  this.stack1.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function() {
  let del;
  while(this.stack1.length){
    this.stack2.push(this.stack1.pop());
  }
  del=this.stack2.pop();
  while(this.stack2.length){
    this.stack1.push(this.stack2.pop());
  }
  return del || -1;
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */

let obj=new CQueue();
console.log(obj.deleteHead());
console.log(obj.appendTail(5));
console.log(obj.appendTail(2));
console.log(obj.deleteHead());
console.log(obj.deleteHead());
