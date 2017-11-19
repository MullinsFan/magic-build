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
const $window = window;
export default {
  data() {
    return {};
  },
  methods: {
    dragStart(e) {
      let componentName = e.target.getAttribute("data-name");
      let info = {
        name: componentName
      };
      e.dataTransfer.effectAllowed = "copy";
      e.dataTransfer.setData("info", JSON.stringify(info));
      // 设置拖拽过程中元素样式
      let target = this.scaleEle(e.target);
      e.dataTransfer.setDragImage(target, 0, 10);
    },
    scaleEle(target) {
      // 缩放拖拽过程元素
      let width = parseInt(getComputedStyle(target).getPropertyValue("width"));
      let height = parseInt(
        $window.getComputedStyle(target).getPropertyValue("height")
      );
      let $app = document.querySelector("#app");
      let node = target.cloneNode(true);
      node.id = '_temp'
      node.style.listStyle = "none";
      node.style.opacity = "1";
      node.style.position = "fixed";
      node.style.width = width * 0.448 + "px";
      node.style.height = height * 0.448 + "px";
      node.style.top = "-200000px";
      $app.appendChild(node);
      return node;
    },
    dragEnd(e) {
      /*拖拽结束*/
      document.querySelector('#app').removeChild(document.querySelector('#_temp'))
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
  margin: 0;
  padding: 0;
  width: 750px;
  list-style: none;
  transform: scale(0.43, 0.43) translate(-498px, -36px);
  > li {
    min-height: 36px;
    font-size: 18px;
    -webkit-user-select: none;
    margin-bottom: 10px;
    transition: transform 0.2s;
    cursor: move !important;
    &:hover {
      transform: scale(1.1) translate(0);
    }
    i {
      vertical-align: middle;
    }
  }
}
</style>


