// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import ScrollTo from 'scroll'
import VueLazyload from 'vue-lazyload'

import App from './App'
import store from './store'

// FastClick 调用
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body)
  }, false);
}

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: './static/img/loading-spin.svg',
  try: 3 // default 1
})

import bluer from './vue-bluer'
Vue.use(bluer)

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
      window.CTJSBridge.LoadMethod('BLGoodsDetail', 'BLGoodsDetailViewController', args)
    }, false)
  }

})

/* 资源位跳转 */
Vue.directive('go-native-resource', {

  bind: function (el, binding) {
    el.addEventListener('click', function() {
      window.CTJSBridge.LoadMethod('BLAdvertResource', 'BLAdvertResourceController', binding.value)
    }, false)
  }

})

/**
 * 判断css是否加载成功
 * @chenpeng
 * @DateTime 2017-03-10T20:53:14+0800
 * @param    {Function}               fn   [加载成功的回调]
 * @param    {[Obj]}                 link  [link标签元素]
 * @return   {[Boolean]}                      [加载成功返回true，失败返回false]
 */
const cssReady = (fn, link) => {
  let d = document
  let t = d.createStyleSheet
  let r = t ? 'rules' : 'cssRules'
  let s = t ? 'styleSheet' : 'sheet'
  let l = d.getElementsByTagName('link');
  // passed link or last link node
  link || (link = l[l.length - 1]);
  function check() {
    try {
      return link && link[s] && link[s][r] && link[s][r][0]
    } catch (e) {
      return false
    }
  }
  (function poll() {
    check() && setTimeout(fn, 0) || setTimeout(poll, 100);
  })();
}

const jsBridgeReady = (calback) => {
  function check() {
    try {
      return window.CTJSBridge
    } catch (e) {
      return false
    }
  }
  (function poll() {
    check() && setTimeout(calback, 0) || setTimeout(poll, 100)
  })();
}

let linkCssObj = document.getElementById('classLink')
// 登录拦截
router.beforeEach(({ meta, path }, from, next) => {
  if (document.querySelectorAll('.ant-transparent.white-bg').length === 0) {
    Vue.$loading = Vue.prototype.$loading = Vue.$toast({
      iconClass: 'preloader white',
      message: '加载中',
      duration: 'loading',
      className: 'white-bg'
    })
  }
  jsBridgeReady(() => {
    if (meta.title) {
      document.title = meta.title
      window.CTJSBridge._setNativeTitle(meta.title)
    }
    if (meta.class) {
      linkCssObj.href = `static/css/${meta.class}.css`
      cssReady(() => {
        return next()
      }, linkCssObj)
    } else {
      next()
    }
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
