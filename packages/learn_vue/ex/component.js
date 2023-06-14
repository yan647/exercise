/**
 * Created by lsq on 2020/12/16.
 */

'use strict';

Vue.component('button-counter',{
  data:function(){
    return {
      count:0
    };
  },
  template:"<button v-on:click='count++'>you click me {{count}} times</button>"
});

const VM=new Vue({
  el:"#app"
});
