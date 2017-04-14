/* creat by chenpeng */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import { SERVICE_BASE_URL } from '../default-urlConfig'

Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }

Vue.http.interceptors.push((request, next) => {
  request.headers.set('chnflg', 'h5')
  next((response) => {
    return response
  });
})

const baseUrl = process.env.NODE_ENV !== 'production' ? '/api' : SERVICE_BASE_URL

export default {
  // 红卡卡密查询（HCT004）
  payRed: params => {
    return Vue.http.post(baseUrl + '/blpay/red.htm', params)
  },
  // CMS优惠券里面的获取券详情
  getCouponDetail: params => {
    return Vue.http.post(baseUrl + '/coupon/queryCouponTemplateDetail.htm', params)
  },
  // 礼品卡入口电子卡查询商品
  getGoods: params => {
    return Vue.http.post(baseUrl + '/goodSearch/keyWordSearchGood.htm', params)
  },
  // CMS优惠券领取优惠券
  getCoupon: params => {
    return Vue.http.post(baseUrl + '/coupon/getCoupon.htm', params);
  }
}
