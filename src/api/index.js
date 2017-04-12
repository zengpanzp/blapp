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
  // 获得券列表
  getCouponList: (params) => {
    return (
      Vue.http.post(baseUrl + (process.env.NODE_ENV !== 'production' ? '/getCouponDetail' : params.url), JSON.stringify(params.data))
    )
  }

}
