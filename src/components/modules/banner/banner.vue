<template>
  <div class="banner">
    <h1>{{ reData.name }}</h1>
    <div>{{ reData.speed }}</div>
  </div>
</template>

<script>
import deData from "./banner.json";
export default {
  data() {
    return {
      reData: deData
    };
  },
  props: {
    data: {
      type: Object,
      default() {
        return deData;
      }
    }
  }
};
</script>


<style lang="less" scoped>
.banner {
  width: 750px;
  height: 64px;
  color: #7e57c2;
  background-color: #acf;
  margin: 4px 0;
}
</style>