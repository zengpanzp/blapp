/* creat by chenpeng */

/**
 * 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然
 * @type {String}
 */

export const ADD_TO_CART = 'ADD_TO_CART'
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS'
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

/* flashSales */
export const GET_SLIDE = 'GET_SLIDE' // 轮播图
export const QUERY_CATE = 'QUERY_CATE' // 分类
export const GET_FLASHDETAIL = 'GET_FLASHDETAIL' // 活动列表
export const GET_PAGES = 'GET_PAGES' // 总页数
