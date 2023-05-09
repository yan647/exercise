/**
 * Created by lsq on 2020/11/12.
 */

'use strict';

function Promise1(func) {
  this.state = "pending";
  this.data = null;
  this.err = null;
  let that = this;

  function resolve(data) {
    if (that.state === "pending") {
      that.state = "resolve";
      that.data = data;
    }
  }

  function reject(err) {
    if (that.state === "pending") {
      that.state = "reject";
      that.err = err;
    }
  }

  try {
    func(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise1.prototype.then = function (onResolve, onReject) {
  if (this.state === "resolve") {
    onResolve(this.data);
  }
  if (this.state === "reject") {
    onReject(this.err);
  }
};

Promise1.prototype.all = function (list) {
  let result = [], num = 0, hasErr = false;
  return new Promise((resolve, reject) => {
    for (let a = 0; a < list.length; a++) {
      list[a].then((data) => {
        result[a] = data;
        num++;
        if (num === list.length) {
          resolve(result);
        }
      }, (err) => {
        !hasErr && reject(err);
        hasErr = true;
      });
    }
  });
};

Promise1.prototype.race = function (list) {
  return new Promise((resolve, reject) => {
    for (let a = 0; a < list.length; a++) {
      list[a].then();
    }
  });
};

function BFS(root, target) {
  let list = [];
  let node = root;
  list.push(node);
  let level = 0;
  while (list.length) {
    level++;
    for (let a = 0; a < list.length; a++) {
      let currentNode = list.shift();
      if (currentNode.value === target) {
        return currentNode;
      } else list = list.concat(currentNode.children);
    }
  }
  return -1;
}

function DFS(root, target) {
  let stack = [];
  let node = root;
  stack.push(root);
  while (stack.length) {
    let currentNode = stack.pop();
    if (currentNode.value === target) {
      return currentNode;
    } else stack = stack.concat(currentNode.children.reverse());
  }
  return -1;
}

//工具函数
let _toString = Object.prototype.toString
let map = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'Number'
}
let getType = (item) => {
  return _toString.call(item).slice(8, -1)
}
let isTypeOf = (item, type) => {
  return map[type] && map[type] === getType(item)
}

function DFSDeepCopy(obj, map = new Map()) {
  let result;
  if (isTypeOf(obj, "array")) {
    result = [];
    for (let a = 0; a < obj.length; a++) {
      result[a] = DFSDeepCopy(obj[a]);
    }
  } else if (isTypeOf(obj, "object")) {
    result = {};
    for (let item in obj) {
      if (obj.hasOwnProperty(item)) {
        if (map.has(item)) {
          result[item] = obj[item];
        } else result[item] = DFSDeepCopy(obj[item]);
      }
    }
  } else if (isTypeOf(obj, "function")) {
    result = eval("(" + obj.toString() + ")");
  } else return obj;
  return result;
}

function BFSDeepCopy(obj) {
  let originQueue = [obj],
    result = {},
    copy = [result],
    visitedList = [];
  while (originQueue.length) {
    let currentNode = originQueue.shift(),
      _obj = copy.shift();
    visitedList.push(currentNode);
    if (isTypeOf(currentNode, "array") || isTypeOf(currentNode, 'object')) {
      for (let item in currentNode) {
        if (currentNode.hasOwnProperty(item)) {
          if (isTypeOf(item, "array")) {
            _obj[item] = [];
            originQueue.push(item);
            copy.push(_obj[item]);
          } else if (isTypeOf(item, 'object')) {
            let index = visitedList.indexOf(item);
            if (!~index) {
              _obj[item] = {};
              originQueue.push(item);
              copy.push(_obj[item]);
            } else {
              _obj[item] = visitedList[index];
            }
          } else if (isTypeOf(item, 'function')) {
            _obj[item] = "(" + item.toString() + ")";
          } else _obj[item] = item;
        }
      }
      visitedList.push(_obj);
    } else if (isTypeOf(currentNode, 'function')) {
      result = "(" + currentNode.toString() + ")";
    } else result = obj;
  }

  return result;
}


let BFSDeepClone = (obj) => {
  let origin = [obj],//原始对象、原始对象属性
    copyObj = {},//最终结果
    copy = [copyObj];//最终结果的属性
  // 去除环状数据
  let visitedQueue = [],
    visitedCopyQueue = [];
  while (origin.length > 0) {
    let items = origin.shift(),
      _obj = copy.shift();
    visitedQueue.push(items);
    if (isTypeOf(items, 'object') || isTypeOf(items, 'array')) {
      for (let item in items) {
        if (items.hasOwnProperty(item)) {
          let val = items[item];
          if (isTypeOf(val, 'object')) {
            let index = visitedQueue.indexOf(val);
            if (!~index) {
              _obj[item] = {};
              //下次while循环使用给空对象提供数据
              origin.push(val);
              // 推入引用对象
              copy.push(_obj[item])
            } else {
              _obj[item] = visitedCopyQueue[index];
              visitedQueue.push(_obj)
            }
          } else if (isTypeOf(val, 'array')) {
            // 数组类型在这里创建了一个空数组
            _obj[item] = [];
            origin.push(val);
            copy.push(_obj[item])
          } else if (isTypeOf(val, 'function')) {
            _obj[item] = eval('(' + val.toString() + ')');
          } else {
            _obj[item] = val;
          }
        }
      }
      // 将已经处理过的对象数据推入数组 给环状数据使用
      visitedCopyQueue.push(_obj);
    } else if (isTypeOf(items, 'function')) {
      copyObj = eval('(' + items.toString() + ')');
    } else {
      copyObj = obj;
    }
  }
  return copyObj;
};

BFSDeepClone({
  a: [1, 2, 3],
  b: {
    c: function () {
    },
    d: {
      a: [1, 2, 3]
    }
  }
});


function new1() {
  let result;
  let obj=new Object();
  obj.call(this,arguments);
  obj.__proto__=arguments;

  return typeof result === "object" ? result : obj;
}


let obj={1:222,2:123,5:888};
let arr=new Array(12);
arr=arr.map((data,index)=>{
  return obj[index+1] || null
});
console.log(arr );
let arr2=Array.from({length:12});


function extends2(subObj,superObj){
  subObj.prototype=Object.create(superObj && superObj.prototype,{
    constructor:{
      value:subObj,
      writable:true,
      enumerable:false,
      configurable:true
    }
  });
}
