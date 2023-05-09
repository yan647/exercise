/**
 * Created by lsq on 2020/12/16.
 */

'use strict';

const vm=new Vue({
  el:"#app",
  data:{
    isActive:true,
    hasError:false,
    classObject:{
      active:true,
      'text-danger':false
    },
    activeClass:"active",
    errorClass:"text-danger"
  },
  computed:{
    computedClassObject:function(){
      return {
        active:this.isActive && !this.hasError,
        'text-danger':this.hasError
      }
    }
  }
});
