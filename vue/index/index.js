/**
 * Created by lsq on 2020/11/11.
 */

'use strict';
import TodoList from "../todo_list/todo_list";
import Finished from "../finished/finished";

const routes=[
  {
    path:"/todo_list",
    component:TodoList
  },
  {
    path:"/finished",
    component:Finished
  }
];
const router=new VueRouter({
  routes
});

let vm=new Vue({
  el:'#vm',
  data:{
    userName:"liu",
    type:["待办事项","已完成事项"],
    currentType:0
  },
  router
});
