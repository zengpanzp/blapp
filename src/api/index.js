/* creat by chenpeng */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import urlConfig from 'src/urlConfig'

Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }

Vue.http.interceptors.push((request, next) => {
  request.headers.set('chnflg', 'h5')
  next((response) => {
    return response
  });
})

// 生产
// const baseUrl = 'http://10.201.128.216:24080'

// 测试
// const baseUrl = '/api'

const baseUrl = process.env.NODE_ENV !== 'production' ? '/api' : urlConfig.SERVICE_BASE_URL

export default {
  // 红卡卡密查询（HCT004）
  payRed: params => {
    return Vue.http.post(baseUrl + '/blpay/red.htm', params)
  }

}
