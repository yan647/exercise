//来源：https://juejin.im/post/5b6e5cbf51882519ad61b67e#heading-0
/***
 * 标准的promise
 */
let promise = new Promise(function (resolve, reject) {
  console.log("我是会被立即执行的");
  resolve();
  reject();//不会被执行
});
promise.then(() => {
  console.log("success");
}, () => {
  console.log("fail");
});
console.log("other");

/***
 * 自己实现一个Promise
 *
 */
function MyPromise(executor) {
  this.state = "pending";
  this.value = undefined;
  this.error = undefined;
  let that = this;
  this.onResolvedCallbacks = [];
  this.onRejectedCallbacks = [];

  function resolve(value) {
    if (that.state === "pending") {
      that.state = "resolve";
      that.value = value;
      that.onResolvedCallbacks.forEach(fn => fn());
    }
  }

  function rejected(error) {
    if (that.state === "pending") {
      that.state = "rejected";
      that.error = error;
      that.onRejectedCallbacks.forEach(fn => fn());
    }
  }

  try {
    executor(resolve, rejected);
  } catch (error) {
    rejected(error);
  }
}

MyPromise.prototype.then = function (resolve, rejected) {
  if (this.state === "resolve") {
    resolve(this.value);
  } else if (this.state === "rejected") {
    rejected(this.error);
  }

  if (this.state === "pending") {
    this.onResolvedCallbacks.push(() => {
      resolve(this.value);
    });
    this.onRejectedCallbacks.push(() => {
      resolve(this.error);
    });
  }

  return this.value !== undefined ? resolve : this;
};

promise = new MyPromise((resolve, rejected) => {
  resolve("111");
  rejected("222");
});
promise.then((data) => {
  console.log(data)
}, (err) => {
  console.log(err)
});

//generator执行一个异步任务
let fetchs = require("node-fetch");

function* gen() {
  let url = "https://api.github.com/users/github";
  let result = yield fetchs(url);
  console.log(result.bio);

}

let g = gen();
let result = g.next();
result.value.then(function (data) {
  return data;
}).then((item) => {
  g.next(item);
});


/***
 * 自己实现Promise.all
 * 按顺序返回执行结果
 * 若干个异步同时执行
 * 只有所有异步都执行完了才返回结果
 * 只要报错就直接返回第一个失败异步的信息
 * @param list
 */
Promise.all2 = function (list) {
  let result = [], len = 0, hasErr = false;
  return new Promise((resolve, reject) => {
    for (let a = 0; a < list.length; a++) {
      list[a].then((data) => {
        result[a] = data;
        len++;
        if (len === list.length) {
          resolve(result);
        }
      }, (err) => {
        !hasErr && reject(err);
        hasErr = true;
      });
    }
  });
};

/***
 * 手写Promise.race
 * 只要有一个异步执行完，立马返回该结果
 * 如果失败，则立马返回失败的结果
 * @param list
 */
Promise.race2 = function (list) {
  let hasValue = false, hasErr = false;
  return new Promise((resolve, reject) => {
    for (let a = 0; a < list.length; a++) {
      list[a].then((data) => {
        !hasValue && !hasErr && resolve(data);
        hasValue = true;
      }, (error) => {
        !hasErr && !hasValue && reject(error);
        hasErr = true;
      });
    }
  });
};
