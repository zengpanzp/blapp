/* creat by chenpeng */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true

// 生产
// const baseUrl = 'http://10.201.128.216:24080'

// 测试
// const baseUrl = '/api'

// mock
const baseUrl = '/mockapi'

export default {
  // token 验证
  auth: (params) => {
    return (
      Vue.http.interceptors.push((request, next) => {
        if (params.token) {
          request.headers.set('token', params.token)
        }
        next((response) => {
          return response
        });
      }),
      Vue.resource(baseUrl + '/auth').get()
    )
  },
  // 登录
  login: (params) => {
    return (
      Vue.http.post(baseUrl + '/login/web', params)
    )
  },
  // 退出登录
  forget: (params) => {
    return (
      Vue.http.post(baseUrl + '/forget', params)
    )
  },
  // buyProducts
  buyProducts: (params) => {
    return (
      Vue.http.post(baseUrl + '/buyProducts', params)
    )
  },
  // getProducts
  getProducts: (params) => {
    return (
      Vue.http.post(baseUrl + '/getProducts', params)
    )
  },
  // getFlashSlides
  getFlashSlides: (params) => {
    return (
      Vue.http.post(baseUrl + '/getFlashSlides', params)
    )
  },

}
