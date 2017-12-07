<template>
  <div class="tool-wrap">
    <span @click.stop="moveUp">上移</span>
    <span @click.stop="moveDown">下移</span>
    <span @click.stop="deleteComponent">删除</span>
    <span >编辑</span>
    <span @click.stop="copy">复制</span>
  </div>
</template>

<script>
  import { mapGetters ,mapActions } from "vuex"

  import { guid } from '@utils'

  const COMPONENT_NAMER = "toolBar"
  const UP = "UP"
  const DOWN = "DOWN"

  export default {
    name: COMPONENT_NAMER,
    data () {
      return {
      }
    },
    methods: {
      ...mapActions([
        "moveComponent",
        "delComponent",
        "copyComponent"
      ]),
      // 获取组件属性
      getComponentAttr (el, attr) {
        let result = el.dataset[attr]
        if(result === undefined) {
          return this.getComponentAttr(el.parentElement, attr)
        } else {
          return result
        }
      },
      // 上移
      moveUp (e) {
        // 解决dataset报错问题
        let el = e.target.parentElement.parentElement
        // 移动方向
        let direct = UP
        // 获取当前组件id
        let currentId = this.getComponentAttr(el, "id")
        // 移动组件
        this.moveComponent({
          currentId: currentId,
          direct: direct
        })
      },
      // 下移
      moveDown (e) {
        let el = e.target.parentElement.parentElement
        let direct = DOWN
        let currentId = this.getComponentAttr(el, "id")
        this.moveComponent({
          currentId: currentId,
          direct: direct
        })
      },
      // 删除组件
      deleteComponent (e) {
        let el = e.target.parentElement.parentElement
        // 获取当前组件id
        let currentId = this.getComponentAttr(el, "id")
        this.delComponent(currentId)
      },
      // 复制组件
      copy (e) {
        let componentList = this.pageData.preComponentList
        let el = e.target.parentElement.parentElement
        // 获取当前组件id
        let currentId = this.getComponentAttr(el, "id")
        // 获取当前组件
        let item = componentList.filter(item => {
          return item.id === currentId
        })
        // 更新组件属性
        let componentName = item[0].name
        let compData = Object.assign({},item[0].data)
        let info = {
          name: componentName,
          data: compData,
          id: guid(),
          showToolBar: false
        }
        this.copyComponent({ currentId, info })
      }
    },
    computed: {
      ...mapGetters([
        "pageData"
      ])
    }
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
  background: #dfdfdf;
  align-items: center;
  justify-content: space-between;
  opacity: .8;
  span {
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 70px;
    padding: 0 20px;
    &:hover {
      background: #c0abe4;
    }
  }
}
</style>
