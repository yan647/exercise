/**
 * Created by lsq on 2020/11/30.
 * http://www.cnblogs.com/qinche/archive/2013/03/28/2987191.html
 * https://juejin.cn/post/6844904133204377608
 */

'use strict';

//二叉树的某个节点
function BinaryTreeNode() {
  this.value = null;
  this.left = null;
  this.right = null;
}

let str = '';
let charecters = ['a', 'b', 'c', 'd', 'e', 'f'];
let len = charecters.length;
let nodes = [];//存放节点的数组

for (let i = 0; i < len; i++) {
  let node = new BinaryTreeNode();//节点
  node.value = charecters[i];
  nodes.push(node);
}

let root = nodes[0];//根节点

//栈
function Stack() {
  let stack = [];

  //Stack是个函数，是没有push和pop的，只有数组才有的，所以必须自定义
  this.push = function (e) {
    stack.push(e);
  };
  this.pop = function () {
    let e = stack[stack.length - 1];
    stack.splice(stack.length - 1, 1);
    return e;
  };
  this.isEmpty = function () {
    return stack.length <= 0;
  }
}

let stack = new Stack();
stack.push(1);
stack.isEmpty();
console.log(stack.pop());
console.log(stack.isEmpty());

//递归实现
//非递归效率高，递归代码写出来思路清晰，可读性强
//索引从最大的开始
function buildBt1(node, i) {
  let leftIndex = 2 * i + 1, rightIndex = 2 * i + 2;//左右孩子节点的索引,即左右孩子节点在节点数组中的位置
  if (leftIndex < charecters.length) {
    let childNode = new BinaryTreeNode();
    childNode.value = charecters[leftIndex];
    node.left = childNode;
    buildBt1(childNode, leftIndex);//递归创建左孩子，把全部左孩子建完后，再建右孩子
  }
  if (rightIndex < charecters.length) {
    let childNode = new BinaryTreeNode();
    childNode.value = charecters[rightIndex];
    node.right = childNode;
    buildBt1(childNode, rightIndex);
  }
}

//非递归实现
function buildBt2() {
  let index = 0;

  while (index < len) {
    let leftIndex = 2 * index + 1;
    let rightIndex = 2 * index + 2;
    nodes[index].left = nodes[leftIndex];
    nodes[index].right = nodes[rightIndex];
    index++;
  }
}

//遍历
//先序递归遍历
function firstIteration(node) {
  if (node.left) {
    firstIteration(node.left);
  }
  if (node.right) {
    firstIteration(node.right);
  }
}

firstIteration(root);

//先序普通遍历
function notFirstIteration(node) {
  let stack = new Stack();
  let resultText = '';
  stack.push(root);

  node = root;
  resultText += node.value;
}

//测试
let node = new BinaryTreeNode();
node.value = charecters[0];
buildBt1(node, 0);


//树的某个节点
function TreeNode(value) {
  this.value = value;
  this.children = [];
}

/***
 * 广度优先搜索
 * @param root:TreeNode
 * @param target
 * @constructor
 * @return number
 */
function BFS(root, target) {
  let queue = [], level = 0;
  let node = root;
  queue.push(node);
  while (queue.length) {
    level++;
    let len = queue.length;
    for (let a = 0; a < len; a++) {
      let firstNode = queue.shift();
      if (firstNode.value === target) {
        return level;
      } else if (firstNode.children && firstNode.children.length) {
        queue.concat(firstNode.children);
      }
    }
  }
  return -1;
}

/***
 * 深度优先搜索
 * @param root
 * @param target
 * @returns {number}
 * @constructor
 */
function DFS(root, target) {
  let stack = [root];
  while (stack) {
    let lastNode = stack.pop();
    if (lastNode.value === target) {
      return lastNode;
    } else if (lastNode.children && lastNode.children.length) {
      stack.concat(lastNode.children.reverse());
    }
  }
  return -1;
}

//深拷贝
//工具函数
let _toString = Object.prototype.toString;
let map = {
  array: 'Array',
  object: 'Object',
  function: 'Function',
  string: 'String',
  null: 'Null',
  undefined: 'Undefined',
  boolean: 'Boolean',
  number: 'Number'
};
let getType = (item) => {
  return _toString.call(item).slice(8, -1)
};
let isTypeOf = (item, type) => {
  return map[type] && map[type] === getType(item)
};

//深度优先遍历
let DFSDeepClone = (obj, visitedArr = []) => {
  let _obj = {};
  if (isTypeOf(obj, 'array') || isTypeOf(obj, 'object')) {
    let index = visitedArr.indexOf(obj);
    _obj = isTypeOf(obj, 'array') ? [] : {};
    if (~index) { // 判断环状数据
      _obj = visitedArr[index]
    } else {
      visitedArr.push(obj);
      for (let item in obj) {
        if (obj.hasOwnProperty(item)) {
          _obj[item] = DFSDeepClone(obj[item], visitedArr);
        }
      }
    }
  } else if (isTypeOf(obj, 'function')) {
    _obj = eval('(' + obj.toString() + ')');
  } else {
    _obj = obj
  }
  return _obj
};


//广度优先遍历
let BFSDeepClone = (obj) => {
  let origin = [obj],
    copyObj = {},
    copy = [copyObj];
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
