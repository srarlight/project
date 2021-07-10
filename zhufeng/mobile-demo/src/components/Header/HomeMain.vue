<template>
  <div>
    <div v-if="activeIndex===0">1</div>
    <div v-if="activeIndex===1">2 </div>
    <div v-if="activeIndex===2">3</div>
  </div>
</template>

<script>
export default {
  name: "HomeMain",
  props:{
    activeIndex:{
      type:Number
    }
  },
  render(createElement, context) {
    return <h1>3333</h1>
  }
}
</script>

<style scoped>

</style>