// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import VueLazyload from 'vue-lazyload'
import ScrollTo from 'scroll'

import App from './App'
import store from './store'

// FastClick 调用
FastClick.attach(document.body)

Vue.use(VueLazyload)

// 公共组件 引入
// import components from 'components'
// // 公共组件 调用
// Object.keys(components).forEach((key) => {
//   let name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
//   Vue.component(`Bl${name}`, components[key])
// })

// // components
// import Toast from 'components/toast'
// import Modal from 'components/modal'

// Vue.$toast = Vue.prototype.$toast = Toast;
// Vue.$modal = Vue.prototype.$modal = Modal;

import bluer from 'vue-bluer'
Vue.use(bluer)

/* 返回顶部指令 */
Vue.directive('scroll-top', {

  bind: function (el) {
    let winHeight = document.documentElement.clientHeight
    let ducDiv = document.createElement('div')
    ducDiv.className = 'gotop'
    ducDiv.style.display = 'none'
    el.appendChild(ducDiv)
    ducDiv.addEventListener('click', function() {
      ScrollTo.top(el, 0)
    })
    el.addEventListener('scroll', function () {
      let thisScrollTop = el.scrollTop
      if (thisScrollTop > winHeight) {
        ducDiv.style.display = 'block'
      } else {
        ducDiv.style.display = 'none'
      }
    })
  },

  unbind: function (el) {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
})

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
