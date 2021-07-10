<template>

  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import {onMounted, ref, watch} from "vue";

export default {
  components:{HelloWorld},
  setup(props){
    let a  = ref(0);
    const getValue =async ()=>{
      a.value = await setValue(7);
      console.log(a.value)
    }
    const setValue = (value)=>{
      return new Promise((resolve, reject) => {
        resolve(value + 8)
      })
    }
    onMounted(getValue)
  }
}
</script>

<style>

</style>
