/**
 * Created by lsq on 2020/12/7.
 * 发布订阅模式
 */

'use strict';

class myObjClass {
  constructor() {
    this.topic_obj = {};//list:func list
  }

  subscribe(topic, callback) {
    if (this.topic_obj[topic] && this.topic_obj[topic].list) {
      this.topic_obj[topic].list.push(callback);
    } else {
      this.topic_obj[topic] = {list: [callback]};
    }
  }

  publish(topic, data) {
    if (this.topic_obj[topic] && this.topic_obj[topic].list) {
      this.topic_obj[topic].list.map((func) => {
        try {
          func && func(topic, data);
        } catch (err) {
          console.log(err);
        }
      })
    }
  }
}

var myobj = new myObjClass();

// 订阅一个事件，遇到 event1 触发
// topics 是订阅事件的名字
myobj.subscribe('event1', function (topics, data) {
  console.log(topics + ': ', data);
});

myobj.subscribe('event2', function () {
  console.log("do other things");
});

// 再订阅一个事件，还是由 event1 触发
myobj.subscribe('event1', function (topics, data) {
  console.log(topics + '******* ' + data);
});

// 触发
myobj.publish('event1', 'hello world!');
myobj.publish('event2', 'hello world!');
