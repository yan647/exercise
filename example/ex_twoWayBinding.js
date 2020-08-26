/**
 * Created by lsq on 2020/8/23.
 */

'use strict';

/***
 * MVVM
 * 1、数据劫持
 * 2、数据代理
 * 3、编译
 * 4、发布订阅
 * 5、数据更新视图
 * 6、实现双向数据绑定
 * @param options
 * @returns {*}
 * @constructor
 */
function Mvvm(options={}){
  this.$options=options;
  let data=this._data=this.$options.data;

  //数据劫持
  observe(data);

  //数据代理
  for(let key in data){
    Object.defineProperty(this,key,{//要么定义为数值描述符，要么存取描述符，二选一
      configurable:true,
      get(){
        return this._data[key];//取值时不需要mvvm.options.a，可以用mvvm.a
      },
      set(newVal){
        this._data[key]=newVal;
      }
    })
  }

  //编译
  new Compile(options.el,this);
}

/***
 * 数据劫持
 * 给data添加Object.defineProperty，方便后续做发布订阅、数据更新视图、双向绑定，利用set get当数据发生变化时执行某些操作
 * @param data
 * @returns {*}
 */
function observe(data){
  if(!data || typeof data!=='object'){
    return ;
  } else {
    for(let key in data){
      let value=data[key];
      observe(value);
      Object.defineProperty(data,key,{
        enumerable:true,
        get(){
          return value;
        },
        set(newVal){
          if(value===newVal){
            return;
          } else {
            value=newVal;
            observe(value);//todo value? newVal?
          }
        }
      })
    }
  }
}

/***
 * 编译：把指定元素先放到documentFragment，根据mvvm的内容替换完再加回到页面
 * @param el：元素
 * @param mvvm
 * @constructor
 */
function Compile(el,mvvm){
  mvvm.$el=document.querySelector(el);
  let frag=document.createDocumentFragment();

  let child;
  while(child=mvvm.$el.firstChild){//每次到firstChild都不是同一个
    frag.appendChild(child);//每次往frag里加元素，该元素就从页面删除，mvvm.$el就少一个元素，到最后mvvm.$el会为空
  }

  function replace(frag){
    Array.from(frag.childNodes).forEach(_node=>{
      let text=_node.textContent;
      let reg=/\{\{(.*?)\}\}/g;

      if(_node.nodeType===3 && reg.test(text)){//是文本节点，有{{}}
        let arr=RegExp.$1.split(".");//a.b
        let value=mvvm;
        arr.forEach(key=>{
          value=value[key]
        });
        _node.textContent=text.replace(reg,value).trim();
      }

      if(_node.childNodes && _node.childNodes.length){
        replace(_node);
      }
    });
  }

  replace(frag);
  mvvm.$el.appendChild(frag);
}
