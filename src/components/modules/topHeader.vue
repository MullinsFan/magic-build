<template>
  <div class="header">{{data.title}}</div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return { title: "hello" };
      }
    }
  }
};
</script>


<style lang="less" scoped>
.header {
  width: 750px;
  height: 64px;
  color: #7e57c2;
  background-color: #acf;
}
</style>

