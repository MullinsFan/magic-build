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
    // 移动组件
    state.pageData.preComponentList.splice(holderIndex, 1, state.pageData.tempList[0])
  },

  [types.ADD_COMPONNET_HOLDER_GLOBEL] (state, payload) {
    let { info, currentIndex} = payload
    // 添加holder组件
    state.pageData.preComponentList.splice(currentIndex, 0, info)
  },
  
  [types.DEL_COMPONNET_HOLDER_GLOBEL] (state, name) {
    let holderName = name
    let newArr = state.pageData.preComponentList.filter(function (item) {
      if (item.name !== holderName) {
        return item
      }
    })
    state.pageData.preComponentList = newArr
  },

  [types.DEL_AND_ADD_COMPONNET_TO_TEMPLIST_GLOBEL] (state, dragIndex) {
    // console.log('in mutations dragIndex', dragIndex)
    let temp = state.pageData.preComponentList.splice(dragIndex, 1)
    state.pageData.tempList = temp
    // console.log('state.pageData.tempList', state.pageData.tempList)
  },
}

export default mutations
