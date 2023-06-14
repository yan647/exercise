/**
 * Created by lsq on 2021/5/25.
 */

'use strict';
export default {
    create:updateDirectives,
    update:updateDirectives,
    destroy:function unbindDirectives(vnode){
        updateDirectives(vnode,emptyNode)
    }
}

function updateDirectives(oldVnode,vnode){
    if(oldVnode.data.directives || vnode.data.directives){
        _update(oldVnode,vnode);
    }
}

function _update(oldVnode,vnode){

}
