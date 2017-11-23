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

  [types.SET_COMPONENTS](state, payload) {
    state.pageData.preComponentList.push(payload)
  },

  [types.SET_COMPONENTS_DATA](state, payload) {
    let {
      index,
      data
    } = payload
    state.pageData.preComponentList[index].data = data
  },

  [types.SORT_COMPONENTS_GLOBEL](state, payload) {
    let { currentIndex, dragIndex } = payload
    // 使用一个新数组重新排序后赋给原变量
    // debugger
    let newArr = state.pageData.preComponentList.concat([])
    console.log('newArr', newArr)
    // 从原数组删除当前拖动模块，保存在temp内
    let temp = newArr.splice(dragIndex, 1)
    console.log('temp', temp)
    // 将取出的模块，插入到当前模块后面
    console.log('after splite', newArr)
    newArr.splice(currentIndex, 0, temp[0])
    state.pageData.preComponentList = newArr
    console.log('state.pageData.preComponentList', state.pageData.preComponentList)
  }
}

export default mutations
