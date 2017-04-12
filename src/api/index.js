/* creat by chenpeng */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true

Vue.http.interceptors.push((request, next) => {
  request.headers.set('chnflg', 'h5')
  next()
})
// 生产
// const baseUrl = 'http://10.201.128.216:24080'

// 测试
// const baseUrl = '/api'

// mock
const baseUrl = '/mockapi'

export default {
  // test 验证
  test: (params) => {
    return Vue.http.post(baseUrl + '/getFlashSlides', params)
  },

}
