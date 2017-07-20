import Vue from 'vue'

let baseUrl = require('src/api/prd-urlConfig').SERVICE_BASE_URL

if (process.env.NODE_ENV !== 'production') {
  baseUrl = require('src/api/dev-urlConfig').DEV_SERVICE
}

export default {
// 转一转
  // 抽奖券设置信息查询接口
  queryLuckySetting: params => {
    return Vue.http.post(baseUrl + '/coupon/querySettigCampDrawCoupons.htm', params);
  },
  // 抽奖接口
  getCoupon: params => {
    return Vue.http.post(baseUrl + '/coupon/getCouponByDraw.htm', params);
  },
  }
