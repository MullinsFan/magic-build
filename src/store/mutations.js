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
    let { info, holderName } = payload
    if (state.pageData.preComponentList.length === 0) {
      state.pageData.preComponentList.push(info)
    } else {
      state.pageData.preComponentList.forEach((item, index, array) => {
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
    // console.log('in mutations dragIndex', dragIndex)
    let temp = state.pageData.preComponentList.splice(dragIndex, 1)
    state.pageData.tempList = temp
    // console.log('state.pageData.tempList', state.pageData.tempList)
  },

  [types.SHOW_TOOL_BAR_GLOBEL](state, componentIndex) {
    state.pageData.preComponentList[componentIndex].showToolBar = true
  },

  [types.HIDE_TOOL_BAR_GLOBEL](state, componentIndex) {
    state.pageData.preComponentList[componentIndex].showToolBar = false
  },
  
  [types.MOVE_COMPONNET_GLOBEL](state, payload) {
    let { currentId, direct } = payload
    // console.log('currentId', currentId)
    // console.log('direct', direct)
    let componentList = state.pageData.preComponentList
    let totalComponent = componentList.length
    let currentIndex = null
    let temp = []
    
    // 获取当前组件index
    componentList.forEach((item, index) => {
      if (item.id === currentId) currentIndex = index
    })
    // console.log('current index', currentIndex)
    // console.log('totalComponent', totalComponent)
    if (direct === "UP" && currentIndex > 0) {
      temp = componentList.splice(currentIndex, 1)
      currentIndex--
      // console.log('refIndex', currentIndex)
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
    state.pageData.preComponentList
  },

}

export default mutations
