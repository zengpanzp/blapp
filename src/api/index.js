/* creat by chenpeng */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

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

const baseUrl = process.env.NODE_ENV !== 'production' ? '/mockapi' : '/h5_gateway'
export default {
  // 红卡卡密查询（HCT004）
  payRed: params => {
    return Vue.http.post(baseUrl + '/blpay/red.htm', params)
  },
  // CMS优惠券里面的获取券详情
  getCouponDetail: params => {
    return Vue.http.post(baseUrl + '/coupon/queryCouponTemplateDetail.htm', params)
  },
  // CMS优惠券领取优惠券
  getCoupon: params => {
    return Vue.http.post(baseUrl + '/coupon/getCoupon.htm', params);
  }

}
