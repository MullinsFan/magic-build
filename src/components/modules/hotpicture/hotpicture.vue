<template>
  <div class="hotpicture">
    <img usemap="#planetmap" v-if="data.hotimg" :style="{width: data.width + 'px',height: data.height + 'px'}" :src="data.hotimg" alt="需要的图片">
    <img usemap="#planetmap" v-else :style="{width: data.width + 'px',height: data.height + 'px'}" :src="data.url" alt="需要的图片">
    <map v-if="data.area" name="planetmap" id="planetmap">
    </map>
    <p v-if="data.title">{{data.title}}</p>
  </div>
</template>

<script>
import deData from './hotpicture.json'
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
.hotpicture {
  color: #7e57c2;
  margin-top: 4px;
  font-size: 52px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    text-align: center;
  }
  p {
    margin: 6%;
  }
}
</style>