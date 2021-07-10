export let Vue;
export default function install(_vue) {
    Vue = _vue;
    Vue.mixin({
            beforeCreate() {
                if (this.$options.router) {
                    this._router = this.$options.router;
                    this._routerRoot = this; //根组件
                    /**
                     * 初始化路由
                     * */
                    this._router.init(this);//Vue实例
                } else {
                    this._routerRoot = this.$parent && this.$parent._routerRoot || this;
                }
            }
        }
    )
}