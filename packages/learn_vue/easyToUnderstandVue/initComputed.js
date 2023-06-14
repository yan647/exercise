/**
 * Created by lsq on 2021/5/15.
 */

'use strict';

/***
 * 初始化computed:将computed对象遍历一遍，将里面的每一项都定义一遍
 * @param Comp
 */
function initComputed(Comp) {
    const computed = Comp.options.computed;
    for (const key in computed) {
        defineComputed(Comp.prototype, key, computed[key]);
    }
}

function defineComputed() {
//todo
}
