<template>
  <div class="banner">
    <h1>{{ data.name }}</h1>
    <div>{{ data.speed }}</div>
  </div>
</template>

<script>
import deData from "./banner.json";
export default {
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
  height: 200px;
  color: #7e57c2;
  background-color: #acf;
  margin: 4px 0;
}
</style>