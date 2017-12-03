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
  sortComponents: ({commit}, payload) => {
    commit(types.SORT_COMPONENTS_GLOBEL, payload)
  },
  
  addComponentHolder: ({commit, state}, payload) => {
    let { info, currentId, direct } = payload
    let currentIndex = null

    // 获取当前组件index
    state.pageData.preComponentList.forEach((item, index) => {
      if (item.id === currentId) currentIndex = index
    })
    
    // 判断需要添加holder组件的位置,如果向下currentIndex++
    if (direct > 0) currentIndex++
    commit(types.ADD_COMPONNET_HOLDER_GLOBEL, { info, currentIndex })
  },
  
  delComponentHolder: ({commit}, payload) => {
    commit(types.DEL_COMPONNET_HOLDER_GLOBEL, payload)
  },
  
}

export default actions
