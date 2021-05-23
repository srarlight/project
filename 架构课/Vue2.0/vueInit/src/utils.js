export function isFunction(val) {
    return typeof val === 'function';
}

export function isObject(val) {
    return typeof val == 'object' && val !== null

}

const callbacks = [];

function flushCallbacks() {
    callbacks.forEach(cb => cb());
    waiting = false
}

let waiting = false;

function timer(flushCallbacks) {
    let timerFn = () => {
    }
    if (Promise) {
        timerFn = () => {
            Promise.resolve().then(flushCallbacks)
        }
    } else if (MutationObserver) {
        let textNode = document.createTextNode(1);
        let observe = new MutationObserver(flushCallbacks);
        observe.observe(textNode, {
            characterData: true
        })
        timerFn = () => {
            textNode.textContent = 3;
        }
        // 微任务
    } else if (setImmediate) {
        timerFn = () => {
            setImmediate(flushCallbacks)
        }
    } else {
        timerFn = () => {
            setTimeout(flushCallbacks)
        }
    }
    timerFn();
}

// 微任务是在页面渲染前执行 我取的是内存中的dom，不关心你渲染完毕没有

export function nextTick(cb) {
    callbacks.push(cb); // flushSchedulerQueue / userCallback
    if (!waiting) {
        Promise.resolve().then(flushCallbacks) // vue2 中考虑了兼容性问题 vue3 里面不在考虑兼容性问题
        waiting = true;
    }
}

//{},{data:{a:1},beforeCreate}

let lifeCycleHooks = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
]
let strategy = {};// 存放策略
lifeCycleHooks.forEach(hook => strategy[hook] = mergeHook)

function mergeHook(parentVal, childVal) {
    if (childVal) {
        if (parentVal) {
            return parentVal.concat(childVal) //
        } else {
            return [childVal] //第一次执行
        }
    } else {
        return parentVal;
    }
}

export function mergeOptions(parent, child) {
    const options = {};

    for (const key in parent) {
        mergeField(key)
    }
    for (const key in child) {
        if (parent.hasOwnProperty(key)) {
            continue;
        }
        mergeField(key)
    }

    function mergeField(key) {
        let parentVal = parent[key];
        let childVal = child[key];
        if (strategy[key]) {
            options[key] = strategy[key](parentVal, childVal)
        } else {
            if (isObject(parentVal) && isObject(childVal)) {
                options[key] = {...parentVal, ...childVal}
            } else {
                options[key] = childVal || parentVal
            }
        }
    }

    return options;
}

export function callHook(vm, hook) {
    let handles = vm.$options[hook];
    for (let i = 0; i < handles.length; i++) {
        if (handles) {
            handles[i].call(vm)
        }
    }
}