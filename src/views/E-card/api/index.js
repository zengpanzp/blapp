/* creat by chenpeng */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'

let baseUrl = require('src/api/prd-urlConfig').SERVICE_BASE_URL

if (process.env.NODE_ENV !== 'production') {
  baseUrl = require('src/api/dev-urlConfig').DEV_SERVICE
}

export default {
  // 红卡卡密查询（HCT004）
  payRed: params => {
    return Vue.http.post(baseUrl + '/blpay/red.htm', params)
  }
}
