/* creat by chenpeng */

/**
 * 我们组装模块并导出 store 的地方
 */

import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
// import cart from './modules/cart'
import flashSales from './modules/flashSales'
import flashSalesList from './modules/flashSalesList'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    // cart,
    flashSales,
    flashSalesList
  },
  strict: process.env.NODE_ENV !== 'production'
})
