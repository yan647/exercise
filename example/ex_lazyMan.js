/**
 * Created by lsq on 2020/12/7.
 */

'use strict';

class LazyManClass {
  constructor(name) {
    this.name = name;
    this.list = [];
    console.log(`Hi I am ${name}`);
    setTimeout(()=>{
      this.next();
    });
  }

  sleep(time) {
    const fn=()=> {
      setTimeout(() => {
        console.log(`等待了${time}秒`);
        this.next();
      }, time);
    };
    this.list.push(fn);
    return this;
  }

  sleepFirst(time) {
    const fn=()=> {
      setTimeout(() => {
        console.log(`等待了${time}秒`);
        this.next();
      }, time);
    };
    this.list.unshift(fn);
    return this;
  }

  eat(eatType) {
    const fn=()=>{
      console.log(`I am eating ${eatType}`);
      this.next();
    };
    this.list.push(fn);
    return this;

  }

  next() {
    const current = this.list.shift();
    current && current();
  }
}

function LazyMan(name){
  return new LazyManClass(name);
}


LazyMan('Tony');
// Hi I am Tony
LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了 10 秒...
// I am eating lunch
LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// // Hi I am Tony
// // I am eating lunch
// // 等待了 10 秒...
// // I am eating diner
LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// // Hi I am Tony
// // 等待了 5 秒...
// // I am eating lunch
// // I am eating dinner
// // 等待了 10 秒...
// // I am eating junk food
