<template>
    <div class="content">
        <components></components>
        <preview/>
        <setting></setting>
    </div>
</template>

<script>
import preview from "../components/preview";
import setting from "../components/setting";
import components from "../components/components";

export default {
  data() {
    return {
      currentComponent: {
        name: undefined,
        index: undefined
      }
    };
  },
  methods: {},
  components: {
    preview,
    setting,
    components
  }
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  flex-wrap: wrap;
}
</style>


