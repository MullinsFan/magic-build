<template>
  <div class="tool-wrap">
    <span>上移</span>
    <span>下移</span>
    <span>删除</span>
    <span>编辑</span>
    <span>复制</span>
  </div>
</template>

<script>
  const COMPONENT_NAMER = 'toolBar'

  export default {
    name: COMPONENT_NAMER
  }
</script>

<style lang="less" scoped>
.tool-wrap {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: 750px;
  height: 64px;
  background: #ddd;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%;
    width: 60px;
    margin: 0 10px;
  }
}
</style>
