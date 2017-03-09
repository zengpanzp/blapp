/* creat by chenpeng */

/**
 * flashSales 模块,
 * mutations 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
 * mutation 是更改状态的唯一方法，并且这个过程是同步的。
 */

import * as types from '../mutation-types'
import { Promise } from 'es6-promise'
// import api from 'src/api'

function isStart(start) {
  let startTime = start.replace(/-/g, "/");
  let startDate = new Date(startTime);
  let now = new Date();
  if (now >= startDate) {
    return 1;
  }
  return 0;
}

// initial state
const state = {
  slide: [],
  queryCate: [],
  getFlashDetail: [],
  pages: 0
}

// getters
const getters = {
  allSlides: state => state.slide,
  queryCate: state => state.queryCate,
  getFlashDetail: state => {
    for (let i = 0; i < state.getFlashDetail.list.length; i++) {
      state.getFlashDetail.list[i].start = isStart(state.getFlashDetail.list[i].effectiveStart)
    }
    return state.getFlashDetail
  },
  pages: state => state.pages
}

// actions
const actions = {
  allSlides ({ commit }, params) {
    return new Promise((resolve, reject) => {
      window.LoadAPI("BLAPPSiteQueryAdDeployAPIManager", params, {
        success: function(res) {
          let resData = window.JSON.parse(res)
          commit(types.GET_SLIDE, resData)
          resolve()
        },
        fail: function(err) {
          console.log(err)
          reject()
        },
        progress: function(data) {}
      });
    })
  },
  queryCate ({ commit }, params) {
    return new Promise((resolve, reject) => {
      window.LoadAPI("BLPromotionQueryFlashCategoryAPIManager", params, {
        success: (res) => {
          let resData = window.JSON.parse(res)
          commit(types.QUERY_CATE, resData)
          resolve()
        },
        fail: (err) => {
          console.log(err)
          reject()
        },
        progress: (data) => {}
      })
    })
  },
  getFlashDetail ({ commit }, params) {
    return new Promise((resolve, reject) => {
      window.LoadAPI("BLPromotionQueryFlashListAPIManager", params, {
        success: (res) => {
          let resData = window.JSON.parse(res)
          commit(types.GET_FLASHDETAIL, resData)
          commit(types.GET_PAGES, resData.pages)
          resolve()
        },
        fail: (err) => {
          console.log(err)
          reject()
        },
        progress: (data) => {}
      })
    })
  }
}

// mutations
const mutations = {
  [types.GET_SLIDE] (state, res) {
    state.slide = res.otherResource[0].advList
  },
  [types.QUERY_CATE] (state, res) {
    state.queryCate = res.list
  },
  [types.GET_FLASHDETAIL] (state, res) {
    state.getFlashDetail = res
  },
  [types.GET_PAGES] (state, res) {
    state.pages = res
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
