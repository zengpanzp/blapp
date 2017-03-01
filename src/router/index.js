/* creat by chenpeng */

/*
* 路由管理
*/

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/flashSales'
    },
    // {
    //   path: '/components',
    //   meta: {
    //     title: '组件'
    //   },
    //   component: r => require.ensure([], () => r(require('vue-bluer/components')), 'components')
    // },
    /* 陈鹏 精品闪购首页 */
    {
      path: '/flashSales',
      meta: {
        title: '精品闪购'
      },
      component: r => require.ensure([], () => r(require('../views/flashSale/flashSales')), 'flashSales')
    },
    /* 陈鹏 精品闪购活动列表页 */
    {
      path: '/flashsaleproductspage/:flashId/:isStart',
      meta: {
        title: '精品闪购'
      },
      component: r => require.ensure([], () => r(require('../views/flashSale/productsListView')), 'flashsaleproductspage')
    }
  ]
})
