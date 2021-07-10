import {mergeOptions} from "./utils";

export function initGlobalApi(Vue){
    Vue.options = {};
    Vue.mixin = function (options){
        console.log(options);
        this.options = mergeOptions(this.options,options);
        console.log(this.options)
        return this;//链式调用
    }
}