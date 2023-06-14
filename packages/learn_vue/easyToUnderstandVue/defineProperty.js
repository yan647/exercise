/**
 * Created by lsq on 2021/6/2.
 */

'use strict';
export default class Dep{
    constructor() {
        this.subs=[];
    }

    addSub(sub){
        this.subs.push(sub);
    }

    remove(sub){
        remove(this.subs,sub);
    }

    depend(){
        if(window.target){
            this.addSub(window.target);
        }
    }

    notify(){
        const subs=this.subs.slice();
        for(let i=0,l=subs.length;i<l;i++){
            subs[i].update();
        }
    }
}

function remove(arr,item){
    if(arr.length){
        const index=arr.indexOf(item);
        if(index>-1){
            return arr.splice(index,1);
        }
    }
}

//对Object.defineProperty进行封装
function defineProperty(data, key, val) {
    let dep=new Dep();//存储被收集的依赖
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            //收集依赖
            dep.depend();
            return val;
        },
        set: function (newVal) {
            if (val === newVal) {
                return;
            }
            val = newVal;
            //触发依赖
            dep.notify();
        }
    })
}
