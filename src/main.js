// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'

import App from './App'
import store from './store'

// FastClick 调用
FastClick.attach(document.body)

// 公共组件 引入
import components from 'components'
// 公共组件 调用
Object.keys(components).forEach((key) => {
  let name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`Bl${name}`, components[key])
})

// components
import Toast from 'components/toast'
import Modal from 'components/modal'

Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$modal = Vue.prototype.$modal = Modal;

let linkCssObj = document.getElementById('classLink')

// 登录拦截
router.beforeEach(({ meta, path }, from, next) => {
  document.title = meta.title
  if (meta.class) {
    linkCssObj.href = `static/css/${meta.class}.css`
    linkCssObj.onload = () => next()
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
