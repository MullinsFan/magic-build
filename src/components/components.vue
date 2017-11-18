<template>
  <div class="wrap">
    <ul class="m-components-list">
      <li draggable="true" @dragstart="dragStart" @dragend="dragEnd" data-name="topHeader">
          <top-header />
      </li>
    </ul>
  </div>
</template>

<script>
import modules from "./modules";
export default {
  methods: {
    dragStart(e) {
      let componentName = e.target.getAttribute("data-name");
      let info = {
        name: componentName
      };
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.setData("info", JSON.stringify(info));
      // 设置拖拽过程中元素样式
      e.dataTransfer.setDragImage(e.target, 0, 0);
    },
    dragEnd(e) {
      /*拖拽结束*/
      e.dataTransfer.clearData("info");
      return false;
    }
  },
  components: {
    ...modules
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 380px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #ede7f6;
}
</style>

<style lang="less">
.m-components-list {
  list-style: none;
  margin: 0;
  padding: 0;
  > li {
    min-height: 36px;
    font-size: 18px;
    -webkit-user-select: none;
    transform: scale(0.8)translateX(-5%);
    margin-bottom: 10px;
    transition: transform 0.2s;
    cursor: move !important;
    &:hover {
      transform: scale(0.9)translateX(0);
    }
    i {
      vertical-align: middle;
    }
  }
}
</style>


