/* creat by chenpeng */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import urlConfig from 'src/urlConfig'

Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true
Vue.http.interceptors.push((request, next) => {
  request.headers.set['chnflg'] = 'h5';
  request.headers.set('Content-Type', 'application/json;charset=utf-8')
  next((response) => {
    return response
  });
})

// 生产
// const baseUrl = 'http://10.201.128.216:24080'

// 测试
// const baseUrl = '/api'

// mock
let baseUrl = urlConfig.SERVICE_BASE_URL;
// baseUrl = '/mockapi'
// Axios.defaults.withCredentials = true
// Axios.defaults.baseURL = baseUrl;
// Axios.defaults.headers.post['Content-Type'] = 'application/json';
// Axios.defaults.headers.post['chnflg'] = 'h5';
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
      Vue.http.post(baseUrl + '/getproducts', params)
    )
  },
  // getFlashSlides
  getFlashSlides: (params) => {
    return (
      Vue.http.post(baseUrl + '/getFlashSlides', params)
    )
  },
  // 获得券列表
  getCouponList: (params) => {
    return (
      Vue.http.post(baseUrl + (process.env.NODE_ENV !== 'production' ? '/getCouponDetail' : params.url), JSON.stringify(params.data))
    )
  }

}
