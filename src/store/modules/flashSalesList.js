/* creat by chenpeng */

/**
 * flashSales 模块,
 * mutations 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
 * mutation 是更改状态的唯一方法，并且这个过程是同步的。
 */

import * as types from '../mutation-types'
import { Promise } from 'es6-promise'
// import api from 'src/api'

// initial state
const state = {
  flashSalesGoods: {},
  flashSalesListGoods: []
}

// getters
const getters = {
  flashSalesGoods: state => state.flashSalesGoods,
  flashSalesListGoods: state => state.flashSalesListGoods
}

// actions
const actions = {
  /* 获取闪购活动列表商品 */
  flashSalesGoods ({ commit }, params) {
    return new Promise((resolve, reject) => {
      window.LoadAPI("BLPromotionQueryFlashGoodsAPIManager", params, {
        success: function(res) {
          let resData = window.JSON.parse(res)
          commit(types.GET_FLASHSALESGOODS, resData)
          resolve()
        },
        fail: function(err) {
          console.log(err)
          reject()
        },
        progress: function(data) {
          // console.log(data);
        }
      });
    })
  },
  flashSalesListGoods ({ commit }, params) {
    return new Promise((resolve, reject) => {
      window.LoadAPI("BLQueryBrandDetailSearchActivityAPIManager", params, {
        success: function(res) {
          let resData = window.JSON.parse(res)
          commit(types.GET_FLASHSALESLISTGOODS, resData)
          resolve()
        },
        fail: function(err) {
          console.log(err)
          reject()
        },
        progress: function(data) {
          // console.log(data);
        }
      });
    })
  }
}

// mutations
const mutations = {
  [types.GET_FLASHSALESGOODS] (state, res) {
    state.flashSalesGoods = res
  },
  [types.GET_FLASHSALESLISTGOODS] (state, res) {
    state.flashSalesListGoods = res.resultInfo.pageModel
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
