/**
 * Created by lsq on 2020/12/3.
 * 路由
 */

'use strict';

class MyRouter{
  constructor(options){
    this.init();
    this.router_list=[];
    options.map((item)=>{
      this.router(item.path,()=>{
        document.getElementById('content').innerHTML=item.component;
      });

    });
  }

  init(){
    window.addEventListener('load',this.uploadView.bind(this));
    window.addEventListener('hashChange',this.uploadView.bind(this))
  }

  uploadView(){
    const currentUrl=window.lacation.hash.slice(1) || '/';
    this.router_list[currentUrl] && this.router_list[currentUrl]();
  }

  router(item,callback){
    this.router_list[item]=callback;
  }
}
