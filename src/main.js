// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import VueLazyload from 'bl-lazyload'
import ScrollTo from 'scroll'

import App from './App'
import store from './store'

// FastClick 调用
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body)
  }, false);
}

Vue.use(VueLazyload)

import bluer from 'vue-bluer'
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

/* eslint-disable */
function cssReady(fn, link) {
  var d = document,
  t = d.createStyleSheet,
  r = t ? 'rules' : 'cssRules',
  s = t ? 'styleSheet' : 'sheet',
  l = d.getElementsByTagName('link');
  // passed link or last link node
  link || (link = l[l.length - 1]);
  function check() {
    try {
      return link && link[s] && link[s][r] && link[s][r][0];
    } catch(e) {
      return false;
    }
  }
  (function poll() {
    check() && setTimeout(fn, 0) || setTimeout(poll, 100);
  })();
}

let linkCssObj = document.getElementById('classLink')
// 登录拦截
router.beforeEach(({ meta, path }, from, next) => {
  document.title = meta.title
  if (meta.class) {
    linkCssObj.href = `static/css/${meta.class}.css`
    cssReady(() => next(), linkCssObj)
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
