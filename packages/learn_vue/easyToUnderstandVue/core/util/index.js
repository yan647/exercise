/**
 * Created by lsq on 2021/5/26.
 */

'use strict';

//返回相同的值
export const identity = _ => _;

function hasOwn(obj,key){
    return obj.prototype.hasOwnProperty(key);
}

//可以查找过滤器、组件和指令
export function resolveAsset(options,type,id,warnMissing){
    if(typeof id!=='string'){
        return
    }
    const assets=options[type];

    if(hasOwn(assets,id)){
        return assets[id];
    }
    const camelizedId=camelize(id);
    if(hasOwn(assets,camelizedId)){
        return assets[camelizedId];
    }
    const PascalCaseId=capitalize(camelizedId);
    if(hasOwn(assets,PascalCaseId)){
        return assets[PascalCaseId];
    }

    //检查原型链
    const res=assets[id] || assets[camelizedId] || assets[PascalCaseId];
    if(process.env.NODE_ENV!=='production' && warnMissing && !res){
        warn();
    }
    return res;
}
