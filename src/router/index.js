/* creat by chenpeng */

/*
 * 路由管理
 */

import Vue from 'vue'
import Router from 'vue-router'

import { prdRouter } from './prdRouter'

let router = prdRouter

if (process.env.NODE_ENV !== 'production') {
  router = prdRouter.concat(require('./uiRouter').uiRouter)
}
Vue.use(Router)

export default new Router({
  routes: router
})
