<template>
  <div class="componentHolder">+ 放这里</div>
</template>

<script>
  const COMPONENT_NAMER = 'componentHolder'

  export default {
    name: COMPONENT_NAMER
  }
</script>

<style lang="less" scoped>
.componentHolder {
  width: 750px;
  height: 80px;
  font-size: 30px;
  border: 1px dashed #000;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

