import {initState} from "./state";
import {compileToFunction} from "./compile/index";
import {mountComponent} from "./lifecycle";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        /**
         * options =》new Vue({
         * el:'#app'
         * data(){
         *
         * },
         *
         * )
         *
         * */
        let vm = this;
        vm.$options = options;
        //初始化状态
        initState(vm)
        //挂载dom
        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el) {
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);
        vm.$el = el;
        if (!options.render) {
            let template = options.template; //如果没有render函数 template
            if(!template && el){ //template 就用el
                //编译模版
                template = el.outerHTML;
                options.render = compileToFunction(template);
            }
        }
        // options.render 就是渲染函数
        // 调用render方法 渲染成真实dom 替换掉页面的内容
        mountComponent(vm,el); // 组件的挂载流程

    }
}



