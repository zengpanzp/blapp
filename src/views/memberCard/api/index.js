/* creat by Jeanne */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'

let baseUrl = require('src/api/prd-urlConfig').SERVICE_BASE_URL

if (process.env.NODE_ENV !== 'production') {
  baseUrl = require('src/api/dev-urlConfig').DEV_SERVICE
}

export default {
// 查询二维码
  qrcode: params => {
    return Vue.http.post(baseUrl + '/points/generateTwoDimensionalCode', params);
  }
}
