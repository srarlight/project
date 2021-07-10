<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
<!--    {{$store.state.age}}-->
    {{$store.getters.myAge}}
    <button @click="changeAge(8)">按钮</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
function mapMutations (mutationsList){
  let obj = {}
  for (let i = 0; i <mutationsList.length ; i++) {
    const mutationsName = mutationsList[i];
    obj[mutationsName] = function (payload){
      this.$store.commit(mutationsName,payload)
    }
    /*
    * changeAge(state,payload){

    * }
    * */
  }
  return obj;
}
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  methods:{
    ...mapMutations(['changeAge'])
  }
}
</script>

<style>

</style>
