/**
 * Created by lsq on 2021/5/22.
 */

'use strict';

//规格化props
function normalizeProps(options, vm) {
    const props = options.props;
    if (!props) {
        return;
    }
    const res = {};
    let i, val, name;
    if (Array.isArray(props)) {
        //将Array类型的props规格化为Object类型
        i = props.length;
        while (i--) {
            val = props[i];
            if (typeof val === 'string') {
                name = camelize(val);//将props名称驼峰化
                res[name] = {
                    type: null
                };
            } else if (process.env.NODE_ENV !== 'production') {
                warn('');
            }
        }
    } else if (isPlainObject(props)) {
        for (const key in props) {
            val = props[key];
            name = camelize(val);
            res[name] = isPlainObject(val) ? val : {type: val};
        }
    } else if (process.env.NODE_ENV !== 'production') {
        warn('');
    }
    options.props = res;
}

/***
 *
 * @param vm
 * @param propsOptions:规格化后的props选项
 */
function initProps(vm, propsOptions) {
    const propsData = vm.$options.propsData || {};//通过父组件传入或用户通过propsData传入的真实props数据
    const props = vm._props = {};
    //缓存props的key
    const keys = vm.$options._propKeys = [];
    const isRoot = !vm.$parent;
    //root实例的props属性应该被转换成响应式数据？？？
    if (!isRoot) {
        toggleObserving(false);//确定并控制defineReactive函数调用时传入的value是否需要转换成响应式的，是个闭包函数
    }
    for (const key in propsOptions) {
        keys.push(key);
        const value = validateProp(key, propsOptions, propsData, vm);//将获取的props数据通过defineReactive设置到vm._props中
        defineReactive(props, key, value);
        if (!(key in vm)) {
            proxy(vm, '_props', key);//在vm上设置一个以key为属性的代理
        }
    }
    toggleObserving(true);
}

/**
 *
 * @param key propOptions中的属性名
 * @param propOptions 子组件用户设置的props选项
 * @param propsData 父组件或用户提供的props选项
 * @param vm vue实例
 * @returns {*}
 */
export function validateProp(key, propOptions, propsData, vm) {
    const prop = propOptions[key];
    const absent = !hasOwn(propsData, key);//当前的key在用户提供的props选项中是否存在
    let value = propsData[key];
    //处理布尔类型的props
    if (isType(Boolean, prop.type)) {
        if (absent && !hasOwn(prop, 'default')) {
            value = false;
        } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {//hyphenate函数会将key进行驼峰转换
            value = true;
        }
    }
    //检查默认值
    if (value === undefined) {
        value = getPropDefaultValue(vm, prop, key);
        //因为默认值是新的数据，所以需要将它转换成响应式的
        const prevShouldConvert = observerState.shouldConvert;
        observerState.shouldConvert = true;
        observe(value);//转换成响应式的
        observerState.shouldConvert = prevShouldConvert;
    }
    if (process.env.NODE_ENV !== 'production') {
        assertProp(prop, key, value, vm, absent);//断言prop是否有效
    }
    return value;
}

function assertProp(prop, name, value, vm, absent) {
    if (prop.required && absent) {
        warn('');
        return;
    }
    if (value == null && !prop.required) {
        return;
    }
    let type = prop.type;
    let valid = !type || type === true;
    const expectedTypes=[];
    if(type){
        //todo p223
    }
}
