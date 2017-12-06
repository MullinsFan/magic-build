<template>
  <div class="tool-wrap">
    <span @click.stop="moveUp">上移</span>
    <span @click.stop="moveDown">下移</span>
    <span>删除</span>
    <span>编辑</span>
    <span>复制</span>
  </div>
</template>

<script>
  import { mapActions } from "vuex"

  const COMPONENT_NAMER = "toolBar"
  const UP = "UP"
  const DOWN = "DOWN"

  export default {
    name: COMPONENT_NAMER,
    data () {
      return {
        // ditectUp: UP,
      }
    },
    methods: {
      ...mapActions([
        "moveComponent"
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
        let el = e.target.parentElement.parentElement
        let direct = UP
        let currentId = this.getComponentAttr(el, "id")
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
