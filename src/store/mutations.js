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
    let newArr = state.pageData.components.concat([])
    console.log('arr', newArr)
    let temp = newArr.splice(dragIndex, 1)
    console.log('temp', temp)
    newArr.splice(currentIndex, 0, temp[0])
    // console.log('-------------------------------')
    state.pageData.components = newArr
  }
}
