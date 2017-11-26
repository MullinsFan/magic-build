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
          <transition-group name="drag" tag="div">
            <div draggable="true"
            v-for="(item,index) in pageData.preComponentList"
            :data-index="index"
            :key="item.name"
            :is="item.name"
            :data="item.data"
            ></div>
          </transition-group>
        </div>
      </div>
  </div>
</template>

<script>
import modules from "./modules"
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      components: this.$store.state.pageData.components,
      schemaData: null,
    };
  },
  methods: {
    ...mapActions([
      'sortComponents',
      'setComponents',
      'setCurrentComponent'
    ]),
    moveItem (e) {
      const el = e.target
      // 获取拖拽模块index并存储
      let elIndex = el.dataset.index
      e.dataTransfer.setData('itemIndex', elIndex)
    },
    drop(e) {
      // 放下拖拽元素操作
      let addFlag = e.dataTransfer.getData('addFlag')
      // 判断是添加模块还是拖动模块
      if (addFlag) {
        let { name, data } = JSON.parse(e.dataTransfer.getData("info"));
        console.log("name:",name)
        console.table("data:",data)
        this.setComponents({
          // 模块名称
          name,
          // 模块数据
          data: data
        })
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
        this.sortComponents({ currentIndex: currentIndex, dragIndex: dragIndex })
        console.log('data', this.pageData)
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
      let name = this.pageData.preComponentList[index].name;
      this.setCurrentComponent({ index, name })
      //引入组件相应的schema文件,存入本地
      this.schemaData = require('./modules/' + name + '/' + name + 'schema.json')
      localStorage.setItem(`'${name}'`, JSON.stringify(this.schemaData))
    },
    //递归查找index
    findIndex(element) {
      let index = element.dataset.index
      if(index === undefined) {
        return this.findIndex(element.parentElement)
      } else {
        return index
      }
    }
  },
  computed: {
    ...mapGetters([
      'pageData'
    ])
  },
  components: {
    ...modules
  }
};
</script>


<style lang="less" scoped>
/* 动画 */
.drag-move {
  transition: transform .6s;
}
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
