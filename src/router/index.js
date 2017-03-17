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
      redirect: '/electricMainPage'
    },
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
      component: r => require.ensure([], () => r(require('../views/flashSale/productsListView')), 'flashsaleproductspage')
    },
    /* 陈鹏 电器城首页 */
    {
      path: '/electricMainPage',
      meta: {
        title: '电器城'
      },
      component: r => require.ensure([], () => r(require('../views/electricCity/electricHome')), 'electricMainPage')
    },
    /* 陈鹏 值得买首页 */
    {
      path: '/rankMainPage',
      meta: {
        title: '大家都在买'
      },
      component: r => require.ensure([], () => r(require('../views/rank/mainView')), 'rankMainPage')
    }
  ]
})
