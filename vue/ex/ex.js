/**
 * Created by lsq on 2020/11/10.
 */

'use strict';

let app = new Vue({
  el: '#app',
  data: {
    message: 'hello vue!'
  }
});

let app2 = new Vue({
  el: "#app-2",
  data: {
    message: "页面加载于" + new Date().toLocaleString()
  }
});

let app3 = new Vue({
  el: '#app-3',
  data: {
    message: true
  }
});

let app4 = new Vue({
  el: '#app-4',
  data: {
    list: [
      {
        label: "111"
      },
      {
        label: "222"
      }
    ]
  }
});

let app5=new Vue({
  el:'#app-5',
  data:{
    message:"hello vue"
  },
  methods:{
    reverseMessage:function(){
      this.message=this.message.split(" ").reverse().join(" ")
    }
  }
});
Vue.component("todo-item",{
  template:"<li>{{todo.label}}</li>",
  props:['todo'],
});

let app6=new Vue({
  el:'#app-6',
  data:{
    message:'hello vue',
    groceryList:[{
      key:1,
      label:"这是个待办事项1"
    },{
      key:2,
      label:"这是个待办事项2"
    },{
      key:3,
      label:"这是个待办事项3"
    }]
  }
});
