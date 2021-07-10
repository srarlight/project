import Vue from 'vue'
class Store {
    constructor(options) {
        console.log(options,'store');
        let {state,getters,mutations} =  options;
        const computed = {};
        this.getters = {};
        Object.keys(getters).forEach((key)=>{
            computed[key] = ()=>{
                return getters[key](this.state)
            }
            Object.defineProperty(this.getters,key,{
                get:()=>{
                    return this._vm[key]
                }
            })
        })
        /**
         * mutations
         * */
        this.mutations = {}
        Object.keys(mutations).forEach((key)=>{
            this.mutations[key] = (payload)=>{
                mutations[key].call(this,this.state,payload)
            }

        })
        this._vm = new Vue({
            data: {
                $$state: state
            },
            computed:computed
        })
    }

    get state(){
        return this._vm._data.$$state
    }
    commit(type,payload){
        console.log('commit');
        this.mutations[type](payload)
    }

}
export default Store