/**
 * Created by lsq on 2021/5/19.
 */

'use strict';
let target;

function add(event, fn, once) {
    if (once) {
        target.$once(event, fn);
    } else {
        target.$on(event, fn);
    }
}

function remove(event, fn) {
    target.$off(event, fn);
}

export function updateComponentListeners(vm, listeners, oldListeners) {
    target = vm;
    updateListeners(listeners, oldListeners || {}, add, remove, vm);//对比listeners和oldListeners的不同
}

export function updateListeners(on, oldOn, add, remove, vm) {
    //todo
}

export function initEvents(vm) {
    vm._events = Object.create(null);//所有使用vm.$on注册的事件监听器都会保存到vm._events属性中

    //初始化父组件附加的事件
    const listeners = vm.$options._parentListeners;
    if (listeners) {
        //将父组件向子组件注册的事件注册到子组件实例中
        updateComponentListeners(vm, listeners);
    }
}
