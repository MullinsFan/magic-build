/**
 * @describe  存放根action
 */
import * as types from './mutationTypes'

const actions = {
  setComponents: ({commit}, payload) => {
    commit(types.SET_COMPONENTS, payload)
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
  }
}

export default actions
