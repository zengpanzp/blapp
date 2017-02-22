/* creat by chenpeng */

/**
 * cart 模块,
 * mutations 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation，Vuex 中的 mutations 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
 * mutation 是更改状态的唯一方法，并且这个过程是同步的。
 */

import * as types from '../mutation-types'

// initial state
const state = {
  added: [],
  products: []
}

// mutations
const mutations = {
  /* 添加购物车 mutations */
  [types.ADD_TO_CART] (state, { id }) {
    state.lastCheckout = null
    const record = state.added.find(p => p.id === id)
    if (!record) {
      state.added.push({
        id,
        quantity: 1
      })
    } else {
      record.quantity++
    }
  },
  [types.RECEIVE_PRODUCTS] (state, { products }) {
    state.products = products.body
  }
}

export default {
  state,
  mutations
}
