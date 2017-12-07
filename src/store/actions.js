/**
 * @describe  存放根action
 */
import * as types from './mutationTypes'

const actions = {
  addComponents: ({commit}, payload) => {
    commit(types.ADD_COMPONENTS, payload)
  },
  setComponentsData: ({commit}, payload) => {
    commit(types.SET_COMPONENTS_DATA, payload)
  },
  setComponentsItem: ({commit}, payload) => {
    commit(types.SET_COMPONENTS_ITEM, payload)
  },
  setCurrentComponent: ({commit}, payload) => {
    commit(types.SET_CURRENT_COMPONENT, payload)
  },
  sortComponents: ({commit, state}, payload) => {
    let { holderName } = payload
    let componentList = state.pageData.preComponentList

    // 获取holder组件index
    let holderIndex = componentList.findIndex(item => {
      return item.name === holderName
    })
    // console.log('holderIndex', holderIndex)
    if (holderIndex === null) return
    commit(types.SORT_COMPONENTS_GLOBEL, holderIndex)
  },
  
  addComponentHolder: ({commit, state}, payload) => {
    let { info, currentId, direct } = payload
    let componentList = state.pageData.preComponentList
    const temp = state.pageData.tempList[0]

    // 判断此id是不是拖拽的id
    if (temp && currentId === temp.id) return

    // 获取当前组件index
    let currentIndex = componentList.findIndex(item => {
      return item.id === currentId
    })

    // 判断需要添加holder组件的位置,如果向下currentIndex++
    if (direct > 0) currentIndex++
    commit(types.ADD_COMPONNET_HOLDER_GLOBEL, { info, currentIndex })
  },
  
  delComponentHolder: ({commit}, payload) => {
    commit(types.DEL_COMPONNET_HOLDER_GLOBEL, payload)
  },

  delAndAddComponentToTempList: ({commit, state}, payload) => {
    let { dragId } = payload
    let componentList = state.pageData.preComponentList

    // 获取拖拽组件index
    let dragIndex = componentList.findIndex(item => {
      return item.id === dragId
    })

    // console.log('dragIndex', dragIndex)
    commit(types.DEL_AND_ADD_COMPONNET_TO_TEMPLIST_GLOBEL, dragIndex)
  },

  showToolBar: ({commit}, componentIndex) => {
    commit(types.SHOW_TOOL_BAR_GLOBEL, componentIndex)
  },

  hideToolBar: ({commit}, componentIndex) => {
    commit(types.HIDE_TOOL_BAR_GLOBEL, componentIndex)
  },
  
  moveComponent: ({commit, state}, payload) => {
    commit(types.MOVE_COMPONNET_GLOBEL, payload)
  },
  
  delComponent: ({commit}, componentId) => {
    commit(types.DEL_COMPONNET_GLOBEL, componentId)
  },
  
  copyComponent: ({commit}, payload) => {
    commit(types.COPY_COMPONNET_GLOBEL, payload)
  },
  
}

export default actions
