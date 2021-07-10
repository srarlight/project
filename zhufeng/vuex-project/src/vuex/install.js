let Vue
function install (_vue){
    Vue = _vue;
    Vue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                this.$store = this.$options.store
            }else {
                this.$store = this.$parent && this.$parent.$store;
            }
        }
    })
}
export default install