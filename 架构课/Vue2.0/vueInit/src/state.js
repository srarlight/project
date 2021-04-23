import {observe} from "./observer/index";
function proxy(vm,key,source) {
    Object.defineProperty(vm,key, {
        get(){
            return vm[source][key]
        },
        set(newVal){
            vm[source][key] = newVal;
        }
    })
}
function initData(vm) {
    let data = vm.$options.data;
    vm._data = data  = typeof data === 'function'?data.call(vm):data;
    //数据代理
    //vm._data.xxx =>vm.xxx
    for (const key in data) {
        proxy(vm,key,'_data')
    }
    observe(data)
}

function initProps(vm) {

}

function initMethods(vm) {

}

function initComputed(vm) {

}

function initWatch(vm) {

}

export function initState(vm){
    console.log(vm)
    const options = vm.$options;
    // if(options.props){
    //     initProps(vm)
    // }
    //
    // if(options.methods){
    //     initMethods(vm)
    // }
    if(options.data){
        initData(vm)
    }
    // if(options.computed){
    //     initComputed(vm)
    //
    // }
    // if(options.watch){
    //     initWatch(vm)
    // }
}