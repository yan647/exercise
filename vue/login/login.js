/**
 * Created by lsq on 2020/11/10.
 */

'use strict';
Vue.component("todo-item",{
  props:["todo"],
  template:"<li>{{todo.label}}</li>"
});

let vm=new Vue({
  data:{
    todoList:[{
      key:1,
      label:"111"
    },{
      key:2,
      label:"222"
    }]
  },
  methods:{
    login:function(){
      console.log('login');

    }
  }
}).$mount("#vm");
