/* creat by chenpeng */

/**
 * 使用常量替代 mutation 事件类型在各种 Flux 实现中是很常见的模式。这样可以使 linter 之类的工具发挥作用，同时把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然
 * @type {String}
 */

/* flashSales */
export const GET_SLIDE = 'GET_SLIDE' // 轮播图
export const QUERY_CATE = 'QUERY_CATE' // 分类
export const GET_FLASHDETAIL = 'GET_FLASHDETAIL' // 活动列表
export const GET_PAGES = 'GET_PAGES' // 总页数

/* productsListView */
export const GET_FLASHSALESGOODS = 'GET_FLASHSALESGOODS' // 活动闪购活动商品
export const GET_FLASHSALESLISTGOODS = 'GET_FLASHSALESLISTGOODS' // 活动闪购活动商品列表
export const GET_FLASHSALESLISTGOODSPAGES = 'GET_FLASHSALESLISTGOODSPAGES' // 活动闪购活动商品列表总页数
