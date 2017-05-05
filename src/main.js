// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import ScrollTo from 'scroll'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'

import App from './App'
import router from './router'
import bluer from './vue-bluer'

Vue.use(infiniteScroll)

Vue.config.devtools = process.env.NODE_ENV !== 'production'

// FastClick 调用
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body)
  }, false);
}

Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('src/assets/icon_banner_loading.png'),
  error: require('src/assets/icon_banner_loading.png'),
  try: 3 // default 1
})

Vue.use(bluer)

Vue.filter('limitFixed', function (value, num = 0) {
  return parseFloat(value).toFixed(num)
})
Vue.filter('limitLength', function (value, num) {
  return String(value).slice(0, num)
})
Vue.filter('stringSpace', function (value, num = 4) {
  let t = ''
  let l = String(value)
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % num == 0 && i + 1 != l.length ? " " : "");
  }
  return t
})

Vue.directive('scroll-fixed', function(el) {
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
  if (!isAndroid) {
    let [xx, yy, XX, YY, swipeX, swipeY] = []
    let h = document.body.clientHeight || document.body.offsetHeight || window.innerHeight
    let bodyScroll = (e) => {
      e.preventDefault();
    }
    el.addEventListener('touchstart', function(e) {
      xx = e.targetTouches[0].screenX;
      yy = e.targetTouches[0].screenY;
      swipeX = true;
      swipeY = true;
    }, false)
    el.addEventListener('touchmove', function(e) {
      XX = e.targetTouches[0].screenX;
      YY = e.targetTouches[0].screenY;
      if (swipeX && Math.abs(XX - xx) - Math.abs(YY - yy) > 0) {
        // 左右滑动
        // e.stopPropagation();
        // e.preventDefault();
        swipeY = false;
      } else if (swipeY && Math.abs(XX - xx) - Math.abs(YY - yy) < 0) {
        // 上下滑动
        let nScrollHight = el.scrollHeight;
        let nScrollTop = el.scrollTop;
        // 到达底部
        if (nScrollTop + h >= nScrollHight) {
          // 下滑
          if (YY <= yy) {
            el.addEventListener('touchmove', bodyScroll(e), false);
          }
        }
        // 到达顶部
        if (nScrollTop === 0) {
          // 下滑
          if (YY >= yy) {
            el.addEventListener('touchmove', bodyScroll(e), false);
          }
        }
      }
    }, false)
  }
})

/* 返回顶部指令 */
Vue.directive('scroll-top', {

  bind: function (el, binding) {
    let ducDiv = document.createElement('div')
    let winHeight = document.documentElement.clientHeight
    let oEl = binding.modifiers.window ? document.body : el
    let fnToggleShow = () => {
      let thisScrollTop = oEl.scrollTop
      if (thisScrollTop > winHeight - 50) {
        ducDiv.style.display = 'block'
      } else {
        ducDiv.style.display = 'none'
      }
    }
    ducDiv.className = 'gotop'
    ducDiv.style.display = 'none'
    if (el.parentNode && !binding.modifiers.window) {
      el.parentNode.appendChild(ducDiv)
    } else {
      el.appendChild(ducDiv)
    }
    ducDiv.addEventListener('click', function() {
      ScrollTo.top(oEl, 0)
    })
    if (binding.modifiers.window) {
      window.addEventListener('scroll', fnToggleShow, false)
    } else {
      oEl.addEventListener('scroll', fnToggleShow, false)
    }
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
      if (!el.getAttribute('disabled')) {
        window.CTJSBridge.LoadMethod('BLGoodsDetail', 'BLGoodsDetailViewController', args)
      }
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

// const isiBailianApp = /iBailian/.test(navigator.userAgent) // 判断userAgent是否是百联APP
// window.isiBailianApp = isiBailianApp
/*
 *  @auth 神马
 *  flag 为对应的 intervalId
 *  避免多个jsBridgeReady的时候出现死循环
 */
const jsBridgeReady = (flag, isWeb = false, calback) => {
      window[flag] = setInterval(function() {
      if (window.CTJSBridge || isWeb) {
        clearInterval(window[flag]);
        return calback()
      }
      // } else {
      //   document.addEventListener('BLBridgeReady', calback, false)
      // }
    }, 50);
}
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
sa.register({
  platform: isiOS ? 'iOS' : isAndroid ? 'Android' : ''
})
jsBridgeReady("_maiDian", false, () => {
  try {
    // 资源位埋点
    window.CTJSBridge && window.CTJSBridge.LoadMethod('NativeEnv', 'fetchUserInfo', {}, {
      success: res => {
        let userInfo = JSON.parse(res);
        console.log(userInfo)
        if (userInfo.distinctId) {
          sa.identify(userInfo.distinctId)
        }
        sa.register({
          platform: userInfo.platform,
          memberId: userInfo.memberId,
          resourceId: userInfo.resourceId,
          resourceType: userInfo.resourceType,
          deployId: userInfo.deployId,
          mmc: userInfo.mmc
        })
      },
      fail: err => {
        console.log(err)
      },
      progress: data => {}
    })
  } catch (err) {
    console.log('sa error => ' + err)
  }
})

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
  jsBridgeReady("_loginInfo", meta.isWeb, () => {
    if (meta.title) {
      document.title = meta.title
      if (window.isiOS) {
        setTimeout(() => {
          window.CTJSBridge && window.CTJSBridge._setNativeTitle(meta.title)
        }, 400)
      } else {
        window.CTJSBridge && window.CTJSBridge._setNativeTitle(meta.title)
      }
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
  template: '<App/>',
  components: { App }
})
