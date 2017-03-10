// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import ScrollTo from 'scroll'
import VueLazyload from 'vue-lazyload'

import App from './App'
import store from './store'
import utils from './utils'

// FastClick 调用
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body)
  }, false);
}

Vue.use(VueLazyload, {
  preLoad: 1.3,
  try: 3 // default 1
})

import bluer from './vue-bluer'
Vue.use(bluer)

Vue.$LoadMethod = Vue.prototype.$LoadMethod = window.LoadMethod

/* 返回顶部指令 */
Vue.directive('scroll-top', {

  bind: function (el) {
    let ducDiv = document.createElement('div')
    let winHeight = document.documentElement.clientHeight
    ducDiv.className = 'gotop'
    ducDiv.style.display = 'none'
    if (el.parentNode) {
      el.parentNode.appendChild(ducDiv)
    }
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
  }
})

/* 跳转到native商品详情页指令 */
Vue.directive('go-native-goods-detail', {

  bind: function (el, binding) {
    let args = {
      goodsid: binding.value.goodsId,
      goodsName: binding.value.goodsMsg,
      goodsPrice: binding.value.goodsPrice,
      goodsImageUrl: binding.value.goodsImgPath,
      isGiftGoods: binding.modifiers.isGiftGoods || false
    }
    el.addEventListener('click', function() {
      Vue.$LoadMethod('BLGoodsDetail', 'BLGoodsDetailViewController', args)
    }, false)
  }

})

/* 资源位跳转 */
Vue.directive('go-native-resource', {

  bind: function (el, binding) {
    el.addEventListener('click', function() {
      Vue.$LoadMethod('BLAdvertResource', 'BLAdvertResourceController', binding.value)
    }, false)
  }

})

let linkCssObj = document.getElementById('classLink')
// 登录拦截
router.beforeEach(({ meta, path }, from, next) => {
  document.title = meta.title
  if (meta.class) {
    linkCssObj.href = `static/css/${meta.class}.css`
    utils.cssReady(() => {
      return next()
    }, linkCssObj)
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
