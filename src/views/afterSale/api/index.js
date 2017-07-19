/* creat by zp */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'

let baseUrl = require('src/api/prd-urlConfig').SERVICE_BASE_URL

if (process.env.NODE_ENV !== 'production') {
  baseUrl = require('src/api/dev-urlConfig').DEV_SERVICE
}

export default {
  // 曾攀 查询状态名
  getStatusByname: params => {
    return Vue.http.post(baseUrl + '/dict/list.htm', params)
  },
	// 曾攀 根据powerId查权益详情
  getList: params => {
    return Vue.http.post(baseUrl + '/order/getReturnList.htm', params)
  },
  // 曾攀 取消售后订单
  getCancel: params => {
    return Vue.http.post(baseUrl + '/order/cancelReturn.htm', params)
  },
  // 曾攀 查看售后订单详情
  getDetail: params => {
    return Vue.http.post(baseUrl + '/order/getReturn.htm', params)
  },
  // 曾攀 查看售后
  queryConfig: params => {
    return Vue.http.post(baseUrl + '/dict/list.htm', params)
  }
}
