/**
 * @describe  存放根mutation
 *
 * @example
 */
import * as types from './mutationTypes'

export default {
  [types.SET_CURRENT_COMPONENT](state, payload) {
    Object.assign(state.currentComponent, payload)
  },

  [types.SET_COMPONENTS](state, payload) {
    state.pageData.components.push(payload)
  },

  [types.SET_COMPONENTS_DATA](state, payload) {
    let {
      index,
      data
    } = payload
    state.pageData.components[index].data = data
  },

  [types.SORT_COMPONENTS](state, payload) {
    let { currentIndex, dragIndex } = payload
    // 使用一个新数组重新排序后赋给原变量
    // debugger
    let newArr = state.pageData.components.concat([])
    console.log('newArr', newArr)
    // 从原数组删除当前拖动模块，保存在temp内
    let temp = newArr.splice(dragIndex, 1)
    console.log('temp', temp)
    // 将取出的模块，插入到当前模块后面
    console.log('after splite', newArr)
    newArr.splice(currentIndex, 0, temp[0])
    state.pageData.components = newArr
    console.log('state.pageData.components', state.pageData.components)
  }
}
