/**
 * Created by lsq on 2021/5/23.
 */

'use strict';

let target;

function updateDomListeners(oldValue, vnode) {//处理事件绑定相关
    if (isUndef(oldValue.data.on) && isUndef(vnode.data.on)) {
        return;
    }
    const on = vnode.data.on || {};//新虚拟节点上的事件对象
    const oldOn = oldValue.data.on || {};//旧虚拟节点上的事件对象
    target = vnode.elm;
    normalizeEvents(on);
    updateListeners(on, oldOn, add, remove, vnode.context);//更新事件监听器
    target = undefined;
}

function add(event, handler, once, capture, passive) {
    handler = withMacroTask(handler);
    if (once) {
        handler = createOnceHandler(handler, event, capture);
    }
    target.addEventListener(event, handler, supportsPassive ? {capture, passive} : capture)
}

function createOnceHandler(handler, event, capture) {//高阶函数，实现once功能，使事件只能被执行一次
    const _target = target;//闭包中保存当前目标元素
    return function onceHandler() {
        const res = handler.apply(null, arguments);
        if (res !== null) {
            remove(event, onceHandler, capture, _target);
        }
    }
}

function remove(event, handler, capture, _target) {
    (_target || target).removeEventListener(event, handler._withTask || handler, capture);
}
