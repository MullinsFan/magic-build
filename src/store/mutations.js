/**
 * @describe  存放根mutation
 *
 * @example
 */
import * as types from './mutationTypes'

const mutations = {
  [types.SET_CURRENT_COMPONENT](state, payload) {
    Object.assign(state.currentComponent, payload)
  },

  [types.ADD_COMPONENTS](state, payload) {
    let componentList = state.pageData.preComponentList
    let { info, holderName } = payload
    if (componentList.length === 0) {
      componentList.push(info)
    } else {
      componentList.forEach((item, index, array) => {
        if (item.name === holderName) {
          array.splice(index, 1, info)
        }
      })
    }
  },

  [types.SET_COMPONENTS_DATA](state, payload) {
    let {
      index,
      data
    } = payload
    state.pageData.preComponentList[index].data = data
  },

  [types.SORT_COMPONENTS_GLOBEL](state, holderIndex) {
    // 获取暂存数组中的组件,同时清空暂存数组
    let temp = state.pageData.tempList.shift()

    // 移动组件
    state.pageData.preComponentList.splice(holderIndex, 1, temp)
  },

  [types.ADD_COMPONNET_HOLDER_GLOBEL] (state, payload) {
    let { info, currentIndex} = payload
    // 添加holder组件
    state.pageData.preComponentList.splice(currentIndex, 0, info)
  },
  
  [types.DEL_COMPONNET_HOLDER_GLOBEL] (state, name) {
    let holderName = name
    let newArr = state.pageData.preComponentList.filter(function (item) {
      if (item.name !== holderName) return item
    })
    state.pageData.preComponentList = newArr
  },

  [types.DEL_AND_ADD_COMPONNET_TO_TEMPLIST_GLOBEL] (state, dragIndex) {
    state.pageData.tempList = state.pageData.preComponentList.splice(dragIndex, 1)
  },

  [types.SHOW_TOOL_BAR_GLOBEL](state, componentIndex) {
    state.pageData.preComponentList[componentIndex].showToolBar = true
  },

  [types.HIDE_TOOL_BAR_GLOBEL](state, componentIndex) {
    state.pageData.preComponentList[componentIndex].showToolBar = false
  },
  
  [types.MOVE_COMPONNET_GLOBEL](state, payload) {
    let { currentId, direct } = payload
    let componentList = state.pageData.preComponentList
    let totalComponent = componentList.length
    let temp = []

    // 获取当前组件index
    let currentIndex = componentList.findIndex(item => {
      return item.id === currentId
    })
    // 判断是否可以上下移动
    if (direct === "UP" && currentIndex > 0) {
      temp = componentList.splice(currentIndex, 1)
      currentIndex--
      componentList.splice(currentIndex, 0, temp[0])
    } else if (direct === "DOWN" && currentIndex < totalComponent) {
      temp = componentList.splice(currentIndex, 1)
      currentIndex++
      componentList.splice(currentIndex, 0, temp[0])
    } else {
      return false
    }
  },

  [types.DEL_COMPONNET_GLOBEL](state, componentId) {
    let componentList = state.pageData.preComponentList
    // 找到并删除组件
    componentList.forEach((item, index, array) => {
      if (item.id === componentId) {
        array.splice(index, 1)
      }
    })
  },

  [types.COPY_COMPONNET_GLOBEL] (state, payload) {
    let componentList = state.pageData.preComponentList
    let { currentId, info } = payload
    // 添加复制的组件
    componentList.forEach((item, index, array) => {
      if (item.id === currentId) {
        index++
        array.splice(index, 0, info)
      }
    })
  }

}

export default mutations
