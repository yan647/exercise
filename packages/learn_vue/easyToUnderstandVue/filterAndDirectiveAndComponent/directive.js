/**
 * Created by lsq on 2021/5/15.
 */

'use strict';

//用于保存指令的位置
Vue.options = Object.create(null);//存放选项
Vue.options['directives'] = Object.create(null);//存放指令

Vue.directive = function (id, definition) {
    if (!definition) {
        //读取指令并返回
        return this.options['directives'][id];
    } else {
        //注册操作
        if(typeof definition==='function'){
            definition={
                bind:definition,
                update:definition
            }
        }
        this.options['directives'][id]=definition;
        return definition;

    }
};
