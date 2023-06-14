/**
 * Created by lsq on 2021/5/15.
 */

'use strict';

Vue.options = Object.create(null);

const ASSET_TYPES = ['component', 'directive', 'filter'];

ASSET_TYPES.forEach((type) => {
    Vue.options[type + 's'] = Object.create(null);
});

ASSET_TYPES.forEach((type) => {
    Vue[type] = function (id, definition) {
        if (!definition) {
            return Vue.options[type + 's'][id];
        } else {
            if (type === 'component' && isPlainObject(definition)) {
                definition.name = definition.name || id;
                definition = Vue.extend(definition);
            } else if (type === 'directive' && typeof definition === 'function') {
                definition = {
                    bind: definition,
                    update: definition
                }
            }
            this.options[type + 's'][id] = definition;
            return definition;
        }
    }
});
