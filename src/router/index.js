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
      redirect: '/components'
    },
    {
      path: '/components',
      meta: {
        title: '组件'
      },
      component: r => require.ensure([], () => r(require('../components/components')), 'components')
    },
    {
      path: '/vuexdemo',
      meta: {
        title: 'vuexdemo'
      },
      component: r => require.ensure([], () => r(require('../views/vuexdemo')), 'vuexdemo')
    },
    /* 陈鹏 精品闪购首页 */
    {
      path: '/flashSales',
      meta: {
        title: '精品闪购',
        class: 'flashSales'
      },
      component: r => require.ensure([], () => r(require('../views/flashSales')), 'flashSales')
    }
  ]
})
