import Vue from 'vue';
import Vuex from './vuex';

Vue.use(Vuex);

const store =  new Vuex.Store({
    state:{
        age:18
    },
    getters:{
        myAge(state){
            return state.age
        }

    },
    mutations:{
        changeAge(state,payload){
            state.age += payload
        }
    },
    actions:{

    }
})
export default store