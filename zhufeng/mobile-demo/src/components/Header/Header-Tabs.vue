<template>
  <div id="header">
    <div class="header_top">
      <van-icon name="sign" size="30" color="yellow" class="sign"/>
      <div class="tabs">
        <van-tabs v-model="activeIndex" animated @change="handleTabsChange"  v-bind="attrs" swipeable>
          <van-tab v-for="tab in tabs" :title="tab.text" :name="tab.value">
          </van-tab>
        </van-tabs>
      </div>
      <van-icon name="scan" size="30" color="white" class="scan"/>
    </div>
    <div class="header_down">
      <div class="search_box">
        <div class="search">搜索</div>
      </div>
      <van-icon class="iconfont" class-prefix="icon-leimupinleifenleileibie" name="icon-leimupinleifenleileibie" size="25" color="white"/>
    </div>
  </div>


</template>

<script>
import HomeMain from "@/components/Header/HomeMain";
export default {
  name: "Header-Tabs",
  components: {HomeMain},
  data(){
    return{
      tabs:[
          {text:'关注',value:0},
          {text:'推荐',value:1},
          {text:'city',value:2},
      ],
      activeIndex:1,
      attrs:{
        'background':"#ac0013",
        'title-active-color':'#fff',
        'title-inactive-color':'#fff',

      }
    }
  },

  methods:{
    handleTabsChange(value){
      console.log(value)
      this.$emit('input',value)
    }
  }
}
</script>

<style scoped lang="scss">
#header{
  background: #ac0013;

  padding:   10px 15px 10px 15px;
  height: 85px;
  .header_top{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    .sign{
      margin-right: 40px;
    }
    .scan{
      margin-left: 40px;
    }
  }
  .header_down{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
    .search_box{
      height: 30px;
      margin-right: 20px;
      width: 100%;
      border-radius: 15px;
      border: 1px yellow solid;
      background: white;
      border-right: none;
      position: relative;
      .search{
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        width: 60px;
        background: #ffd834;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #555a20;

      }
    }
  }
}
.tabs{
  width: 100%;
  background: #ac0013;

}
</style>