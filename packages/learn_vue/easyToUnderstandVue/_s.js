/**
 * Created by lsq on 2021/5/26.
 */

'use strict';

function toString(val){
    return val==null ? '' : typeof val==='object' ? JSON.stringify(val,null,2) : String(val)
}
