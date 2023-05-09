/**
 * Created by lsq on 2020/8/23.
 */

'use strict';

/***
 * 参考https://juejin.im/post/6844903586103558158#heading-8
 * MVVM
 * 1、数据劫持 Object.defineProperty
 * 2、数据代理 Object.defineProperty
 * 3、编译 createDocumentFragment的特性 正则表达式：test、分组
 * 4、发布订阅 原型
 * 5、数据更新视图
 * 6、实现双向数据绑定
 * @param options
 * @returns {*}
 * @constructor
 */
function Mvvm(options = {}) {
  this.$options = options;
  let data = this._data = this.$options.data;

  //数据劫持
  observe(data);

  //数据代理：把this._data代理到this
  for (let key in data) {
    Object.defineProperty(this, key, {//要么定义为数值描述符，要么存取描述符，二选一
      configurable: true,
      get() {
        return this._data[key];//取值时不需要mvvm.options.a，可以用mvvm.a
      },
      set(newVal) {
        this._data[key] = newVal;
      }
    })
  }

  //初始化computed，计算属性，this指向实例
  initComputed.call(this);

  //编译
  new Compile(options.el, this);

  options.mounted.call(this);//钩子函数
}

function initComputed() {
  let mvvm = this;
  let computed = this.$options.computed;
  Object.keys(computed).map(_key => {
    Object.defineProperty(mvvm, _key, {
      get: typeof computed[_key] === "function" ? computed[_key] : computed[_key].get,
      set() {
      }
    })
  });
}

/***
 * 数据劫持
 * 给data添加Object.defineProperty，方便后续做发布订阅、数据更新视图、双向绑定，利用set get当数据发生变化时执行某些操作
 * @param data
 * @returns {*}
 */
function observe(data) {
  if (!data || typeof data !== 'object') {
    return;
  } else {
    let dep = new Dep();
    for (let key in data) {
      let value = data[key];
      observe(value);
      Object.defineProperty(data, key, {
        enumerable: true,
        get() {
          Dep.target && dep.addSub(Dep.target);//把watcher添加到订阅事件中
          return value;
        },
        set(newVal) {
          if (value === newVal) {
            return;
          } else {
            value = newVal;
            observe(value);//todo value? newVal?
            dep.notify();//值发生变化时，调用notify(),notify里有所有watcher的update方法
          }
        }
      })
    }
  }
}

/***
 * 编译：把指定元素先放到documentFragment，根据mvvm的内容把{{}}里的内容替换完再加回到页面
 * @param el：元素
 * @param mvvm
 * @constructor
 */
function Compile(el, mvvm) {
  mvvm.$el = document.querySelector(el);
  let frag = document.createDocumentFragment();

  let child;
  while (child = mvvm.$el.firstChild) {//每次到firstChild都不是同一个
    frag.appendChild(child);//每次往frag里加元素，该元素就从页面删除，mvvm.$el就少一个元素，到最后mvvm.$el会为空
  }

  function replace(frag) {//把fragment里用{{}}包起来的内容替换掉
    Array.from(frag.childNodes).forEach(_node => {
      let text = _node.textContent;
      let reg = /\{\{(.*?)\}\}/g;

      if (_node.nodeType === 3 && reg.test(text)) {//是文本节点，有{{}}   eg:<p>{{album.name}}</p>
        let arr = RegExp.$1.split(".");//a.b
        let value = mvvm;
        arr.forEach(key => {
          value = value[key]
        });
        _node.textContent = text.replace(reg, value).trim();

        //监听数据变化
        new Watcher(mvvm, RegExp.$1, newVal => {
          _node.textContent = text.replace(reg, newVal).trim();
        });
      } else if (_node.nodeType === 1) {//是元素节点   eg:<input v-model='c' type='text'>
        let att_list = _node.attributes;
        Array.from(att_list).map((_att) => {
          let _name = _att.name,
            _value = _att.value;
          if (_name.includes("v-")) {
            _node.value = mvvm[_value];
          }

          new Watcher(mvvm, _value, _newVal => {
            _node.value = _newVal;
          });

          node.addEventListener("input", e => {
            mvvm[_value] = e.target.value;
          })
        });
      }

      if (_node.childNodes && _node.childNodes.length) {
        replace(_node);
      }
    });
  }

  replace(frag);
  mvvm.$el.appendChild(frag);
}

function Dep() {
  this.subs = [];
}

Dep.prototype = {
  addSub(sub) {
    this.subs.push(sub);
  },
  notify() {
    this.subs.map(sub => sub.update());
  }
};

/***
 * 监听函数
 * @param mvvm
 * @param exp:标识，eg this.a.b
 * @param fn:值发生变化后做的处理
 * @constructor
 */
function Watcher(mvvm, exp, fn) {
  this.fn = fn;
  this.mvvm = mvvm;
  Dep.target = this;
  this.arr = exp.split(".");//a.b
  let val = mvvm;
  this.arr.map(key => {
    val = val[key];//获取this.a.b，调用get，则用到了Dep.target
  });
  Dep.target = null;//用完后清空
}

//值发生变化，调用observe中的set，调用notify,调用update
Watcher.prototype.update = function () {
  let val = this.mvvm;
  this.arr.map(key => {
    val = val[key];//通过get取到新的值
  });
  this.fn(val);//???
};

// let watcher1 = new Watcher(() => console.log("watcher1"));
// let watcher2 = new Watcher(() => console.log("watcher2"));
// let dep = new Dep();
// dep.addSub(watcher1);
// dep.addSub(watcher2);
// dep.notify();
