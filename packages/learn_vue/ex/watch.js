/**
 * Created by lsq on 2020/12/16.
 * https://cn.vuejs.org/v2/guide/computed.html
 * watch
 */

'use strict';
const watchExampleVM=new Vue({
  el:'#watch-example',
  data:{
    question:"",
    answer:"i cannot give you an answer until you ask a question"
  },
  watch:{
    question:function(newVal,oldVal){
      this.answer="waiting for you to stop typing";
      this.debouncedGetAnswer()
    }
  },
  created:function(){
    this.debouncedGetAnswer=_.debounce(this.getAnswer,500)
  },
  methods:{
    getAnswer:function(){
      if(this.question.indexOf('?')===-1){
        this.answer="questions usually contain a question";
        return;
      }
      this.answer="thinking...";
      const vm=this;
      axios.get("https://yesno.wtf/api").then((response)=>{
        vm.answer=_.capitalize(response.data.answer);
      }).catch((error)=>{
        vm.answer=`error! could not reach the api. ${error}`;
      });
    }
  }
});
