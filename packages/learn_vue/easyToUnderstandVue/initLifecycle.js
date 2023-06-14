/**
 * Created by lsq on 2021/5/19.
 */

'use strict';

export function initLifecycle(vm) {
    const options = vm.options;

    //找出第一个非抽象类
    let parent = options.parent;
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
            parent = parent.$parent;
        }
        parent.$children.push(vm);
    }

    vm.$parent = parent;
    vm.$root = parent ? parent.$root : vm;

    vm.$children = [];
    vm.$refs = {};

    vm._watcher = null;
    vm._isDestroyed = false;
    vm._isBeingDestroyed = false;
}
