/**
 * Created by lsq on 2021/5/15.
 */

'use strict';

Vue.options['filters'] = Object.create(null);

Vue.filter = function (id, definition) {
    if (!definition) {
        //读取过滤器并返回
        return this.options['filters'][id];
    } else {
        //注册操作
        this.options['filters'][id] = definition;
        return definition;
    }
};
