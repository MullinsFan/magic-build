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
      this.dragOver.oldY = ""
      console.log('drag start ___________')
      const el = e.target
      // 获取拖拽模块index并存储
      let elIndex = el.dataset.index
      e.dataTransfer.setData('itemIndex', elIndex)
    },
    drop(e) {
      // console.log("drop -----------")
      this.dragOver.oldY = ""
      // 放下拖拽元素操作
      let addFlag = e.dataTransfer.getData('addFlag')
      // 判断是添加模块还是拖动模块
      if (addFlag) {
        let { name, data, id } = JSON.parse(e.dataTransfer.getData("info"));
        let componentInfo = {
          name: name,
          data: data,
          id: id
        }
        let payload = {
          info: componentInfo,
          holderName: this.componentHolderName
        }
        this.addComponents(payload)
      } else {
        // 删除页面中的holder组件
        this.delComponentHolder(this.componentHolderName)

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
      const el = e.target
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
      
      // 当前y值与oldY作差
      let direct = e.screenY - this.dragOver.oldY
      this.dragOver.oldY = e.screenY
      
      // 判断鼠标移动方向
      // direct < 0 --> up
      // direct > 0 --> down
      if (direct > 0) {
        this.hasDown = false
        if (!this.hasUp) {

          // 删除页面中的holder组件
          this.delComponentHolder(this.componentHolderName)

          // 获取当前组件id
          let currentId = this.getComponentAttr(el, "id")

          // 添加hloder组件
          this.addComponentHolder({info, currentId, direct})
          this.hasUp = true
        }
      } else if (direct < 0) {
        this.hasUp = false
        if (!this.hasDown) {

          // 删除页面中的holder组件
          this.delComponentHolder(this.componentHolderName)

          // 获取当前组件id
          let currentId = this.getComponentAttr(el, "id")

          // 添加hloder组件
          this.addComponentHolder({info, currentId, direct})
          this.hasDown = true
        }
      } else {
        return false
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
      this.dragOver.oldY = ""
    },
    dragEnd(e) {
      // 清除flag, 避免影响移动组件
      e.dataTransfer.clearData('addFlag')
      this.dragOver.oldY = ""
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
      let result = el.dataset[attr]
      if(result === undefined) {
        return this.getComponentAttr(el.parentElement, attr)
      } else {
        return result
      }
    },
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
