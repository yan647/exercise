/**
 * Created by lsq on 2020/8/21.
 */

'use strict';

/***
 * 这种写法我不会
 * @param arr
 * @param copyOperate
 * @returns {*}
 */
function forEach(arr, copyOperate) {
  let index = -1;
  const length = arr.length;
  while (++index < length) {
    copyOperate(arr[index], index);
  }
  return arr;
}

function isObject(obj) {
  let type = typeof obj;
  return obj !== null && (type === "object" || type === "function");
}

function getType(obj) {
  return Object.prototype.toString.call(obj);
}

const objectTag = "[object Object]",
  arrayTag = "[object Array]",
  mapTag = "[object Map]",
  setTag = "[object Set]",

  boolTag = "[object Boolean]",
  dateTag = "[object Date]",
  regexpTag = "[object RegExp]",
  errorTag = "[object Error]",
  numberTag = "[object Number]",
  stringTag = "[object String]",
  symbolTag = "[object Symbol]";

const tags = [objectTag, arrayTag, mapTag, setTag, boolTag, dateTag, regexpTag, errorTag, numberTag, stringTag, symbolTag];

/***
 * 获取初始化数据
 * @param obj
 * @returns {*}
 */
function getInt(obj) {
  let c = obj.constructor;
  return new c();
}


/***
 * 深拷贝
 * 1、注意数组
 * 2、注意循环引用
 * 3、使用WeakMap：
 *    WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。
 *    弱引用：在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
 *    const obj = {}，就默认创建了一个强引用的对象，我们只有手动将obj = null，它才会被垃圾回收机制进行回收，如果是弱引用对象，垃圾回收机制会自动帮我们回收
 * 4、性能优化
 *    使用while优化
 * 5、其他数据类型
 *
 * @param obj 待拷贝待对象
 * @param map 防止循环引用
 * @returns {V|*} 返回对象或简单类型
 */
function clone2(obj, map = new WeakMap()) {
  let temp;
  if (!isObject(obj)) {
    return obj;
  } else {

    //初始化
    let type = getType(obj);
    if (tags.includes(type)) {
      temp = getInt(obj);
    }

    //防止循环引用
    if (map.get(obj)) {
      return map.get(obj);
    } else {
      map.set(target, temp);
    }

    const keys = isArray ? undefined : Object.keys(obj);
    forEach(keys || obj, (value, key) => {
      if (keys) {//如果是对象
        key = value;
      }
      temp[key] = clone2(obj[key], map);
    });
    return temp;
  }
}

let target = {
  "a": 1,
  "aaa": [1, 2]
};
target.target = target;
console.log(clone2(target));


//简单版
function copyFun(obj) {
  if (Array.isArray(obj)) {
    for (let a = 0; a < obj.length; a++) {
      obj[a] = copyFun(obj[a]);
    }
  } else if (typeof obj !== "object") {
    return obj;
  } else {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        obj[key] = copyFun(obj[key]);
      }
    }
  }
  return obj;
}
