<template>
  <div class="wrap">设置
    <h1>{{data.title}}</h1>
    <input v-model="data.title" placeholder="edit me">
    <button @click="handleSubmit">保存</button>
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
    data() {
      let { index } = this.currentComponent;
      if (index === undefined) return "";
      return this.$store.state.pageData.components[index].data;
    }
  },
  methods: {
    handleSubmit() {
      this.$store.commit("SET_COMPONENTS_DATA", {
        index: this.currentComponent.index,
        data: this.data
      });
      // 存localstorage
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
