<template>
  <div class="wrap">
      <div class="mobile">
        <div class="container" ref="preview"
            @dragstart="moveItem"
            @drop="drop"
            @dragover="dragOver"
            @dragenter="dragEnter"
            @dragleave="dragLeave"
            @click="handleClick">
          <transition-group name="drag" tag="div">
            <div class="component-wrap"
              @mouseover="showTool"
              @mouseout="hideTool"
              draggable="true"
              @dragend="dragEnd"
              v-for="(item,index) in pageData.preComponentList"
              :key="item.id"
              :data-index="index"
              :data-id="item.id">
              <div :is="item.name"
                  :data="item.data"
                  ></div>
              <div v-show="item.showToolBar" is="toolBar"></div>
            </div>
          </transition-group>
        </div>
      </div>
  </div>
</template>

<script>
import modules from "./modules"
import { mapGetters, mapActions } from 'vuex'

const $window = window
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
      "sortComponents",
      "addComponents",
      "setCurrentComponent",
      "addComponentHolder",
      "delComponentHolder",
      "delAndAddComponentToTempList",
      "showToolBar",
      "hideToolBar"
    ]),
    moveItem (e) {
      this.dragOver.oldY = ""
      // console.log('drag start ___________')
      const el = e.target

      // 设置拖拽效果
      e.dataTransfer.effectAllowed = "move"
      // 获取拖拽模块ID
      let componentEl = this.getComponentByAttr(el, "id")
      let dragId = componentEl.dataset.id

      // 设置拖拽过程中元素样式
      let target = this.scaleEle(componentEl);
      e.dataTransfer.setDragImage(target, -30, -30);

      // 删除并暂存当前拖拽组件
      this.delAndAddComponentToTempList({ dragId })
    },
    drop(e) {
      // console.log('drop-------------')
      const el = e.target
      this.hasUp = false
      this.hasDown = false
      this.dragOver.oldY = ""
      // 放下拖拽元素操作
      let addFlag = e.dataTransfer.getData("addFlag")
      // 判断是添加模块还是拖动模块
      if (addFlag) {
        let { name, data, id, showToolBar } = JSON.parse(e.dataTransfer.getData("info"));
        let componentInfo = {
          name: name,
          data: data,
          id: id,
          showToolBar: showToolBar
        }
        let payload = {
          info: componentInfo,
          holderName: this.componentHolderName
        }
        this.addComponents(payload)
      } else {

        // 解决拖到空白地方报错
        if (el === e.currentTarget) return

        // 重新排序
        this.sortComponents({ holderName: this.componentHolderName })
      }
    },
    dragOver(e) {
      /*拖拽元素在目标元素头上移动的时候*/
      // console.log('drag over ----------')
      const el = e.target
      e.preventDefault();

      // 处理 dataset of null 报错
      if (el === e.currentTarget.children[0] || el.className === "componentHolder") return

      // 拖拽到空白处取消提示
      if (el === e.currentTarget) {
        this.delComponentHolder(this.componentHolderName)
        return false
      }

      // 设置holder组件信息
      let info = {
        name: this.componentHolderName,
        id: this.guid()
      }

      // 获取当前组件id
      let currentId = this.getComponentAttr(el, "id")
      // console.log('currentId', currentId)

      // 判断是否初始化
      if (!this.dragOver.oldY) this.dragOver.oldY = e.screenY
      if (!this.dragOver.oldId) this.dragOver.oldId = currentId
      // 当前y值与oldY作差
      let direct = e.screenY - this.dragOver.oldY
      // 判断是否还在当前组件
      if (this.dragOver.oldId !== currentId) {
        // console.log('oldel el', el, this.dragOver.oldEl)
        // console.log('组件切换')
        this.hasUp = false
        this.hasDown = false
      }
      // 保存现在的y
      this.dragOver.oldY = e.screenY

      // 保存现在的Id
      this.dragOver.oldId = currentId

      if (direct > 0) {
        // console.log('down---------------')
        // this.hasDown = false
        this.hasUp = false
        if (!this.hasDown) {
          // console.log('开始删除组件')
          // 删除页面中的holder组件
          this.delComponentHolder(this.componentHolderName)

          // 获取当前组件id
          let currentId = this.getComponentAttr(el, "id")
          // console.log('添加组件')
          // 添加hloder组件
          this.addComponentHolder({info, currentId, direct})
          this.hasDown = true
        }
      } else if (direct < 0) {
        // console.log('up---------------')
        // this.hasUp = false
        this.hasDown = false
        // console.log('!this.hasUp', !this.hasUp)
        if (!this.hasUp) {
          // console.log('开始删除组件')
          // 删除页面中的holder组件
          this.delComponentHolder(this.componentHolderName)

          // 获取当前组件id
          let currentId = this.getComponentAttr(el, "id")
          // console.log('添加组件')
          // 添加hloder组件
          this.addComponentHolder({info, currentId, direct})
          this.hasUp = true
        }
      } else {
        return true
      }
    },
    dragEnter(e) {
      /*拖拽元素进入目标元素头上的时候*/
      // console.log('drag enter ------')
      return true
    },
    dragLeave(e) {
      // console.log('drag leave ------')
      this.dragOver.oldY = ""
    },
    dragEnd(e) {
      // 清除flag, 避免影响移动组件
      // console.log('end2------------')
      e.dataTransfer.clearData("addFlag")
      this.dragOver.oldY = ""
      this.delComponentHolder(this.componentHolderName)
      document.querySelector('#app').removeChild(document.querySelector('#_temp'))
      return false;
    },
    handleClick(e) {
      const el = e.target
      if (el === e.currentTarget) return
      let index = this.getComponentAttr(el, "index")
      let name = this.pageData.preComponentList[index].name
      let id = this.pageData.preComponentList[index].id
      this.setCurrentComponent({ index, name, id })
      
      //引入组件相应的schema文件,存入本地
      this.schemaData = require('./modules/' + name + '/' + name + 'schema.json')
      
      let schema = JSON.parse(localStorage.getItem(`'${name}'` + id))
      if(!schema) localStorage.setItem(`'${name}'` + id , JSON.stringify(this.schemaData))
      //触发show
    },
    scaleEle(target) {
      // 缩放拖拽过程元素
      let width = parseInt(getComputedStyle(target).getPropertyValue("width"));
      let height = parseInt(
        $window.getComputedStyle(target).getPropertyValue("height")
      );
      let $app = document.querySelector("#app");
      let node = target.cloneNode(true);
      let wrapDiv = document.createElement("div")
      wrapDiv.id = '_temp'
      wrapDiv.appendChild(node)
      Object.assign(wrapDiv.style,{
        listStyle: "none",
        opacity: "1",
        position: "fixed",
        width: width * 0.448 + "px",
        height: height * 0.448 + "px",
        top: "-200000px",
        paddingLeft: "120px",
      })
      $app.appendChild(wrapDiv);
      return wrapDiv
    },
    // 通过特殊属性找到组件
    getComponentByAttr (el, attr) {
      let result = el.dataset[attr]
      if(result === undefined) {
        return this.getComponentByAttr(el.parentElement, attr)
      } else {
        return el
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
    },
    // 显示工具栏
    showTool (e) {
      
      let el = e.target

      let componentList = this.pageData.preComponentList
      // 获取当前组件id
      let currentId = this.getComponentAttr(el, "id")
      // 是否显示
      componentList.forEach((item, index) => {
        if (item.id === currentId) {
          if (!item.showToolBar) {
            this.showToolBar(index)
          }
        }
      })
    },
    // 隐藏工具栏
    hideTool (e) {
      let el = e.target

      let componentList = this.pageData.preComponentList
      // 获取当前组件id
      let currentId = this.getComponentAttr(el, "id")
      // 检查是否隐藏
      componentList.forEach((item, index) => {
        if (item.id === currentId) {
          if (item.showToolBar) {
            this.hideToolBar(index)
          }
        }
      })
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
  transition: transform .07s;
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
    .component-wrap {
      position: relative;
    }
  }
}
</style>
