<template>
  <div class="wrap">
      <div class="mobile">
        <div class="container" ref="preview" @drop="drop" @dragover="dragOver" @dragenter="dragEnter" @click="handleClick">
          <div 
          v-for="(item,index) in components"
          :data-index=index
          :key="index"
          :is="item.name"
          :data="item.data"
          ></div>
        </div>
      </div>
  </div>
</template>

<script>
import modules from "./modules";
export default {
  data() {
    return {
      components: this.$store.state.pageData.components
    };
  },
  methods: {
    drop(e) {
      // 放下拖拽元素操作
      let { name, data } = JSON.parse(e.dataTransfer.getData("info"));
      console.log("name:",name)
      console.log("data:",data)
      this.$store.commit("SET_COMPONENTS", {
        // 模块名称
        name,
        // 模块数据
        data: data
      });
      console.log(this.$store.state.pageData.components[0].name)
    },

    dragOver(e) {
      /*拖拽元素在目标元素头上移动的时候*/
      e.preventDefault();
      return true;
    },

    dragEnter(e) {
      /*拖拽元素进入目标元素头上的时候*/
      return true;
    },

    handleClick(e) {
      let index = findIndex(e.target);
      console.log(index)
      let name = this.components[index].name;
      this.$store.commit("SET_CURRENT_COMPONENT", { index, name });
      function findIndex(element) {
        let index = element.dataset.index
        if(index === undefined) {
          return findIndex(element.parentElement)
        } else {
          return index
        }
      }
    }
  },
  components: {
    ...modules
  }
};
</script>


<style lang="less" scoped>
.wrap {
  flex: 1;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.117647);
}
.mobile {
  margin: 25px auto 0;
  height: 540px;
  padding: 102px 25px 159px 23px;
  width: 337px;
  background: url("~@/assets/image/bgiphone.png") no-repeat;
  .container {
    border: 1px #ccc solid;
    width: 750px;
    height: 1255px;
    transform: scale(0.448, 0.448) translate(-463px, -774px);
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      box-sizing: border-box;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #e7e7e7;
      border: 1px solid rgba(0, 0, 0, 0.1);
      -webkit-border-radius: 5px;
    }
    /*
    悬浮时
    */
    &::-webkit-scrollbar-thumb:hover {
      background-color: #f6f6f6;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    /*
    滚动条空白处的样式
    */
    &::-webkit-scrollbar-track-piece {
      background-color: rgba(0, 0, 0, 0.05);
      -webkit-border-radius: 5px;
    }
  }
}
</style>

