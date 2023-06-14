/**
 * Created by lsq on 2021/5/22.
 */

'use strict';

export function initState(vm) {
    vm._watchers = [];//保存当前组件中所有的watcher实例
    const opts = vm.$options;

    if (opts.props) {
        initProps(vm, opts.props);
    }

    if (opts.methods) {
        initMethods(vm, opts.methods);
    }

    if (opts.data) {
        initData(vm);
    } else {
        observe(vm._data = {}, true/*asRootData*/);//将数据转换为响应式的
    }

    if (opts.computed) {
        initComputed(vm, opts.computed);
    }
    if (opts.watch && opts.watch !== nativeWatch) {
        initWatch(vm, opts.watch);
    }
}
