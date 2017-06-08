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
  // 查询资源位
  queryAdDeploy: params => {
    return Vue.http.post(baseUrl + '/site/queryAdDeploy.htm', params);
  },
  // 查询评价数量
  queryCount: params => {
    return Vue.http.post(baseUrl + '/product/queryCommentCount.htm', params)
  },
  // 查询待评价信息
  queryCommentBytype: params => {
    return Vue.http.post(baseUrl + '/product/queryCommentByType.htm', params)
  },
  // 查询待评价信息
  queryComnentByorder: params => {
    return Vue.http.post(baseUrl + '/product/queryOrderProductComment.htm', params)
  }
}
