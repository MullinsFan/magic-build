<template>
  <div class="wrap">设置
    <input v-model="title" placeholder="edit me">
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentComponent: this.$store.state.currentComponent
    };
  },
  computed: {
    title: {
      get() {
        let { index } = this.currentComponent;
        if (index === undefined) return "";
        return this.$store.state.pageData.components[index].data.title;
      },
      set(val) {
        let { index } = this.currentComponent;
        this.$store.state.pageData.components[index].data.title = val;
      }
    }
  }
};
</script>


<style lang="less" scoped>
.wrap {
  position: relative;
  width: 380px;
  background-color: #ede7f6;
}
</style>
