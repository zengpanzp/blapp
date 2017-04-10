/* creat by chenpeng */

/*
 * 路由管理
 */

import Vue from 'vue'
import Router from 'vue-router'

import { uiRouter } from './uiRouter'
import { prdRouter } from './prdRouter'

Vue.use(Router)

export default new Router({
  routes: process.env.NODE_ENV !== 'production' ? uiRouter.concat(prdRouter) : prdRouter
})
