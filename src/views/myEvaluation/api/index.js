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
  },
  // 上传图片
  upload: params => {
    return Vue.http.post(baseUrl + '/media/upload.htm', params)
  },
  // 添加评价
  addComment: params => {
    return Vue.http.post(baseUrl + '/product/addComment.htm', params)
  },
  // 点赞
  supportComment: params => {
    return Vue.http.post(baseUrl + '/product/supportComment.htm', params)
  },
  // 添加评价
  queryTagCountById: params => {
    return Vue.http.post(baseUrl + '/product/queryTagCountById.htm', params)
  },
  // 追加评价
  addCommentAgain: params => {
    return Vue.http.post(baseUrl + '/product/addCommentAgain.htm', params)
  },
  // 追加评价晒图
  addCommentPic: params => {
    return Vue.http.post(baseUrl + '//product/addCommentPic.htm', params)
  }
}
