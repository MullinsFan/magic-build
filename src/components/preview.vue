<template>
  <div class="wrap">
      <div class="mobile">
        <div class="container" ref="preview"
            @dragstart="moveItem"
            @drop="drop"
            @dragover="dragOver"
            @dragenter="dragEnter"
            @dragend="dragEnd"
            @click="handleClick">
          <div draggable="true"
          v-for="(item,index) in components"
          :data-index="index"
          :key="item.name"
          :is="item.name"
          :data="item.data"
          ></div>
        </div>
      </div>
  </div>
</template>

<script>
import modules from "./modules"
// import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      components: this.$store.state.pageData.components,
      dataAll: null,
    };
  },
  methods: {
    moveItem (e) {
      const el = e.target
      // 获取拖拽模块index并存储
      let elIndex = el.dataset.index
      e.dataTransfer.setData('itemIndex', elIndex)
    },
    drop(e) {
      // 放下拖拽元素操作
      let addFlag = e.dataTransfer.getData('addFlag')
      if (addFlag) {
        let { name, data } = JSON.parse(e.dataTransfer.getData("info"));
        console.log("name:",name)
        console.table("data:",data)
        this.$store.commit("SET_COMPONENTS", {
          // 模块名称
          name,
          // 模块数据
          data: data
        });
        //schema数据存入本地
      } else {
        // 解决拖到空白地方报错
        if (e.target === e.currentTarget) return
        // 获取当前组件index
        let currentIndex = this.findIndex(e.target)
        // 获取拖拽组件index
        let dragIndex = e.dataTransfer.getData('itemIndex')
        // 若拖到相同组件则不改变组件顺序
        if (!currentIndex || currentIndex === dragIndex) return
        console.log('currentIndex', currentIndex)
        console.log('drag Item', dragIndex)
        // 重新排序
        this.$store.commit("SORT_COMPONENTS_GLOBEL", { currentIndex, dragIndex })
        console.log('data', this.components)
      }
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

    dragEnd(e) {
      // 清除flag, 避免影响移动组件
      e.dataTransfer.clearData('addFlag')
      return false;
    },

    handleClick(e) {
      if (e.target === e.currentTarget) return
      let index = this.findIndex(e.target);
      let name = this.components[index].name;
      this.$store.commit("SET_CURRENT_COMPONENT", { index, name });
      //引入组件相应的schema文件
      this.dataAll = require('./modules/' + name + '/' + name + 'schema.json')
      let res = JSON.parse(localStorage.getItem('\''+name+'\''))
    },
    //递归查找index
    findIndex(el) {
      let index = el.dataset.index
      if(typeof index === 'undefined') {
        return this.findIndex(el.parentElement)
      } else {
        return index
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
    width: 335px;
    height: 100%;
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

