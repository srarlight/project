<template>
  <div>
    <van-sticky>
      <HeaderTabs v-model="activeValue" />
      <HomeMain :activeIndex="activeValue" />
    </van-sticky>

     </div>
</template>

<script>
import HeaderTabs from "@/components/Header/Header-Tabs";
import HomeMain from "@/components/Header/HomeMain";
import {createNamespacedHelpers,mapState} from "vuex";
console.log(mapState)
export default {
  name: "index",
  components: {HeaderTabs,HomeMain},
  computed: {
    ...mapState("home", {
      activeIndex: "activeIndex",
    }),
    activeValue:{
      get(){
        return this.activeIndex
      },
    }
  },

  data(){
    return{

    }
  },
  mounted() {
    console.log(this.activeValue)
  }
}
</script>

<style scoped lang="scss">

</style>