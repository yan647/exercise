/**
 * Created by lsq on 2021/5/27.
 */

'use strict';

//将模版过滤器解析成过滤器函数调用表达式
export function parseFilters(exp) {
    let filters = exp.split('|');
    let expression = filters.shift().trim();
    let i;
    if (filters) {
        for (i = 0; i < filters.length; i++) {
            expression = wrapFilter(expression, filters[i].trim());
        }
    }
    return expression;
}

/***
 * 拼接字符串
 * @param exp 表达式
 * @param filter 过滤器
 */
function wrapFilter(exp,filter) {
    const i=filter.indexOf('(');
    if(i<0){
        //是否携带其他参数
        //_f:resolveFilter
        return `_f("${filter}")(${exp})`;
    } else {
        const name=filter.slice(0,i);
        const args=filter.slice(i+1);
        return `_f("${name}")(${exp},${args})`
    }
}
