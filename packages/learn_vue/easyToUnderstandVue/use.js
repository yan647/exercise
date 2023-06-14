/**
 * Created by lsq on 2021/5/15.
 */

'use strict';

Vue.use = function (plugin) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
        //插件已经被注册过
        return this;
    }

    const args = toArray(arguments, 1);//除第一个参数外其他参数都赋值给args
    args.unshift(this);
    if (typeof plugin.install === 'function') {
        plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
        plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
};
