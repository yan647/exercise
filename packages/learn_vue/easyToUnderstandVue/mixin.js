/**
 * Created by lsq on 2021/5/16.
 */

'use strict';
// import {mergeOptions} from '../util/index';

export function initMixin(Vue) {
    Vue.mixin=function(mixin){
        this.options=mergeOptions(this.options,mixin);
        return this;
    };
}
