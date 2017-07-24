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
  // 查询闪购分类
  queryFlashCategory: params => {
    return Vue.http.post(baseUrl + '/flashBuy/queryFlashCategory.htm', params);
  },
  // 查询闪购活动商品
  queryFlashList: params => {
    return Vue.http.post(baseUrl + '/flashBuy/queryFlashList.htm', params)
  },
  // 搜索活动商品信息
  activitySearchGood: params => {
    return Vue.http.post(baseUrl + '/goodSearch/activitySearchGood.htm', params)
  },
  // 查询活动商品
  queryFlashGoods: params => {
    return Vue.http.post(baseUrl + '/flashBuy/queryFlashGoods.htm', params)
  },
  // 查询资源位
  queryAdDeploy: params => {
    return Vue.http.post(baseUrl + '/site/queryAdDeploy.htm', params);
  }
}
