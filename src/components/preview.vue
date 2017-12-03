<template>
  <div class="wrap">
      <div class="mobile">
        <div class="container" ref="preview"
            @dragstart="moveItem"
            @drop="drop"
            @dragover="dragOver"
            @dragenter="dragEnter"
            @dragleave="dragLeave"
            @dragend="dragEnd"
            @click="handleClick">
          <transition-group name="drag" tag="div">
            <div draggable="true"
            v-for="(item,index) in pageData.preComponentList"
            :data-index="index"
            :data-id="item.id"
            :key="item.id"
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

const componentHolderName = "componentHolder"

export default {
  data() {
    return {
      schemaData: null,
      componentHolderName: componentHolderName,
      hasUp: false,
      hasDown: false
    };
  },
  methods: {
    ...mapActions([
      'sortComponents',
      'addComponents',
      'setCurrentComponent',
      'addComponentHolder',
      'delComponentHolder'
    ]),
    moveItem (e) {
      const el = e.target
      // 获取拖拽模块index并存储
      let elIndex = el.dataset.index
      e.dataTransfer.setData('itemIndex', elIndex)
    },
    drop(e) {
      // console.log("drop -----------")
      this.delComponentHolder(this.componentHolderName)
      // 放下拖拽元素操作
      let addFlag = e.dataTransfer.getData('addFlag')
      // 判断是添加模块还是拖动模块
      if (addFlag) {
        let { name, data, id } = JSON.parse(e.dataTransfer.getData("info"));
        this.addComponents({
          // 模块名称
          name,
          // 模块数据
          data: data,
          // 模块id
          id: id,
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
        // 重新排序
        this.sortComponents({ currentIndex: currentIndex, dragIndex: dragIndex })
      }
    },
    dragOver(e) {
      /*拖拽元素在目标元素头上移动的时候*/
      e.preventDefault();
      // 处理 dataset of null 报错
      if (e.target === e.currentTarget.children[0] || e.target === e.currentTarget || e.target.className === "componentHolder") return
      // 设置holder组件信息
      let info = {
        name: this.componentHolderName,
        id: this.guid()
      }
      // 判断是否初始化
      if (!this.dragOver.oldY) this.dragOver.oldY = e.screenY
      // console.log('old, new:', this.dragOver.oldY, e.screenY)
      // 当前y值与oldY作差
      let d = e.screenY - this.dragOver.oldY
      let direct = ""
      // 判断鼠标移动方向
      if (d < 0) {
        direct = "up"
      } else if (d > 0) {
        direct = "down"
      } else {
        return false
      }
      console.log('direct', direct)
      this.dragOver.oldY = e.screenY

      // 获取当前组件index
      let currentIndex = this.findIndex(e.target)

      // 获取组件宽度
      // let elHeight = this.getComponentAttr(e.target, 'clientHeight')
      // let elOffsetY = e.offsetY
      // console.log('elHeight', elHeight)
      // console.log('elOffsetY', elOffsetY)
      // 判断鼠标移动方向
      if (direct === "down") {
        this.hasDown = false
        if (!this.hasUp) {
          this.delComponentHolder(this.componentHolderName)
          this.addComponentHolder({info, currentIndex})
          this.hasUp = true
        }
      } else if (direct === "up") {
        this.hasUp = false
        // currentIndex++
        if (!this.hasDown) {
          this.delComponentHolder(this.componentHolderName)
          this.addComponentHolder({info, currentIndex})
          this.hasDown = true
        }
      }
      return true;
    },
    dragEnter(e) {
      /*拖拽元素进入目标元素头上的时候*/
      // console.log('drag enter ------')
      return true;
    },
    dragLeave(e) {
      // console.log('drag leave ------')
    },
    dragEnd(e) {
      // 清除flag, 避免影响移动组件
      e.dataTransfer.clearData('addFlag')
      return false;
    },
    handleClick(e) {
      if (e.target === e.currentTarget) return
      let index = this.findIndex(e.target)
      let name = this.pageData.preComponentList[index].name
      let id = this.pageData.preComponentList[index].id
      this.setCurrentComponent({ index, name, id })
      //引入组件相应的schema文件,存入本地
      this.schemaData = require('./modules/' + name + '/' + name + 'schema.json')
      
      let schema = JSON.parse(localStorage.getItem(`'${name}'` + id))
      if(!schema) localStorage.setItem(`'${name}'` + id , JSON.stringify(this.schemaData))
      //触发show
    },
    //递归查找index
    findIndex(element) {
      let index = element.dataset.index
      if(index === undefined) {
        return this.findIndex(element.parentElement)
      } else {
        return index
      }
    },
    // 获取组件属性
    getComponentAttr (el, attr) {
      let index = el.dataset.index
      if(index === undefined) {
        return this.getComponentAttr(el.parentElement, attr)
      } else {
        return el[attr]
      }
    }
    ,
    // 随机生成组件 id
    guid () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      }
      return s4() + s4() + '-' + s4()
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
  transition: transform .0s;
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
