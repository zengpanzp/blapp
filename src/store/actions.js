/* creat by chenpeng */

/**
 * 根级别的 action,异步逻辑都应该封装到 action 里面。
 * Action 提交的是 mutation，而不是直接变更状态。
 * Action 可以包含任意异步操作。
 * Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，下面{ commit }是用到了ES6 参数结构的方法（https://github.com/lukehoban/es6features#destructuring）
 */

import api from '../api'
import * as types from './mutation-types'
import { Promise } from 'es6-promise'

export const addToCart = ({ commit }, params) => {
  /* 请求 */
  api.buyProducts(params).then(
    // 成功操作
    () => commit(types.CHECKOUT_SUCCESS),
    // 失败操作
    () => commit(types.CHECKOUT_FAILURE)
  )
}

export const getAllProducts = ({ commit }, params) => {
  return new Promise((resolve, reject) => {
    api.getProducts(params).then(products => {
      commit(types.RECEIVE_PRODUCTS, { products })
      resolve()
    }, (err) => {
      console.log(err)
    })
  })
}
