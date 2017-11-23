<template>
  <div class="single-img">
    <img v-if="data.src" :src="data.src">
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default () {
        return {
          title: 'single Image component',
          // src: 'http://ol5i1a679.bkt.clouddn.com/%E7%99%BE%E5%BA%A6logo.png'
          src: ''
        };
      }
    }
  }
};
</script>


<style lang="less" scoped>
.single-img {
  width: 750px;
  height: 50px;
  background: blue;
  border-radius: 50%;
}
</style>

