/**
 * Created by lsq on 2021/5/26.
 */

'use strict';

import {identity,resolveAsset} from 'core/util/index';
export function resolveFilter(id) {
    return resolveAsset(this.$options,'filters',id,true) || identity;
}
