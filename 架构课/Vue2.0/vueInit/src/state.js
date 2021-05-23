import {observe} from "./observer/index"; // node_resolve_plugin
import {isFunction} from "./utils";
import Watcher from "./observer/watcher";
import Dep from "./observer/dep";

export function stateMixin(Vue) {
    Vue.prototype.$watch = function (vm, key, handler, options = {}) {
        options.user = true;
        new Watcher(vm, key, handler, options)

    }
}

function createWatch(vm, key, handler, options) {
    return vm.$watch(vm, key, handler)
}

function initWatch(vm, watch) {
    for (const watchKey in watch) {
        let handler = watch[watchKey];
        if (Array.isArray(handler)) {
            for (let i = 0; i < handler.length; i++) {
                createWatch(vm, watchKey, handler[i])
            }
        } else {
            createWatch(vm, watchKey, handler)
        }
    }
}

function createComputed(computedKey) {
    return function computedGetter() {
        let watcher = this._computedWatchers[computedKey];
        if (watcher.dirty) {
            watcher.evaluate()
        }
        if (Dep.target) {
            watcher.addDep();
        }
        return watcher.value;


    };
}

function defineComputed(vm, computedKey, userDef) {
    const obj = {};
    if (typeof userDef === 'function') {
        obj.get = userDef
    } else {
        obj.get = createComputed(computedKey);
        obj.set = userDef.set;
    }
    console.log(obj)
    Object.defineProperty(vm, computedKey, obj)
}

function initComputed(vm, computed) {
    const watcher = vm._computedWatchers = {};
    for (const computedKey in computed) {
        const userDef = computed[computedKey];
        //获取get
        const getter = typeof userDef === 'function' ? userDef : userDef.get;
        // 创建watcher 每个属性都是一个watcher
        watcher[computedKey] = new Watcher(vm, userDef, () => {
        }, {lazy: true});
        //将computer 挂载到vm
        defineComputed(vm, computedKey, userDef)
    }
}

export function initState(vm) { // 状态的初始化
    const opts = vm.$options;
    if (opts.data) {
        initData(vm);
    }
    if (opts.computed) {
        initComputed(vm, opts.computed);
    }
    if (opts.watch) {
        initWatch(vm, opts.watch);
    }
}

function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key];
        },
        set(newValue) {
            vm[source][key] = newValue
        }
    })
}

function initData(vm) { //
    let data = vm.$options.data; // vm.$el  vue 内部会对属性检测如果是以$开头 不会进行代理
    // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty

    // 这个时候 vm 和 data没有任何关系, 通过_data 进行关联


    data = vm._data = isFunction(data) ? data.call(vm) : data;

    // 用户去vm.xxx => vm._data.xxx
    for (let key in data) { // vm.name = 'xxx'  vm._data.name = 'xxx'
        proxy(vm, '_data', key);
    }

    observe(data);
}