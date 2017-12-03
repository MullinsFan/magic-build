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
    console.log('holderName', holderName)
    if (state.pageData.preComponentList.length === 0) {
      state.pageData.preComponentList.push(info)
    } else {
      console.log('state.pageData.preComponentList', state.pageData.preComponentList)
      state.pageData.preComponentList.forEach((item, index, array) => {
        if (item.name === holderName) {
          console.log('add success')
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

  [types.SORT_COMPONENTS_GLOBEL](state, payload) {
    let { currentIndex, dragIndex } = payload
    // 使用一个新数组重新排序后赋给原变量
    // debugger
    let newArr = state.pageData.preComponentList.concat([])
    // console.log('newArr', newArr)
    // 从原数组删除当前拖动模块，保存在temp内
    let temp = newArr.splice(dragIndex, 1)
    // console.log('temp', temp)
    // 将取出的模块，插入到当前模块后面
    // console.log('after splite', newArr)
    newArr.splice(currentIndex, 0, temp[0])
    state.pageData.preComponentList = newArr
  },

  [types.ADD_COMPONNET_HOLDER_GLOBEL] (state, payload) {
    // console.log('payload', payload)
    let { info, currentIndex} = payload
    // console.log('info', info)
    // console.log('currentindex', currentIndex)
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
  }
}

export default mutations
