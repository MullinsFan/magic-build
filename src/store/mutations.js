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
  }
}
