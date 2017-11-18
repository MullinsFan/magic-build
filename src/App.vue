<template>
  <div id="app">
    <el-header/>
    <router-view/>
  </div>
</template>

<script>
import elHeader from "@/components/Header";
export default {
  name: "app",
  components: {
    elHeader
  }
};
</script>

<style>

</style>
