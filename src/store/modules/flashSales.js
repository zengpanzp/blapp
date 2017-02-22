/* creat by chenpeng */

/**
 * flashSales 模块,
 * mutations 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
 * mutation 是更改状态的唯一方法，并且这个过程是同步的。
 */

import * as types from '../mutation-types'

// initial state
const state = {
  slide: []
}

// getters
const getters = {
  allSlides: state => state.slide
}

// actions
const actions = {
  getFlashSlides ({ commit }, params) {
    window.LoadAPI("BLAPPSiteQueryAdDeployAPIManager", params, {
      success: function(res) {
        let resData = window.JSON.parse(res)
        commit(types.GET_SLIDE, resData)
      },
      fail: function(err) {
        console.log(err)
      },
      progress: function(data) {
        // console.log(data);
      }
    })
  }
}

// mutations
const mutations = {
  [types.GET_SLIDE] (state, res) {
    state.slide = res.otherResource[0].advList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
