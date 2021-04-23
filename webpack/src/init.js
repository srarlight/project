export function initMixin(Vue){
    Vue.prototype._init = function (options){
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
        //挂载dom
        if(vm.$options.el){
            vm.$mount(vm.$options.el)
        }
    }
    Vue.prototype.$mount = function (el){
        console.log(el)
        const vm = this;
        const options = vm.$options;
        el = document.querySelector(el);
        vm.$el = el;
        if(!options.render){
            let templete = options.template;
            
        }
    }
    }

