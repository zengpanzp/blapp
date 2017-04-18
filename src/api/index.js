/* creat by chenpeng */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import URL from '../default-urlConfig'
import { DEV_SERVICE } from './dev-urlConfig'

Vue.use(VueResource)
Vue.http.options.xhr = { withCredentials: true }

Vue.http.interceptors.push((request, next) => {
  request.headers.set('chnflg', 'h5')
  next((response) => {
    return response
  });
})

const baseUrl = process.env.NODE_ENV !== 'production' ? DEV_SERVICE : URL.SERVICE_BASE_URL

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
  addCart: params => {
    return Vue.http.post(baseUrl + '/search/addCartV3.htm', params)
  },
  // CMS优惠券领取优惠券
  getCoupon: params => {
    return Vue.http.post(baseUrl + '/coupon/getCoupon.htm', params);
  },
  // 百联财礼 百联有礼
  blgift: {
    // 根据关键字搜索商品
    searchByKeyWord: params => {
      return Vue.http.post(baseUrl + '/goodSearch/keyWordSearchGood.htm', params);
    },
    // 查询资源位
    queryAdDeploy: params => {
      return Vue.http.post(baseUrl + '/site/queryAdDeploy.htm', params);
    },
    // 取消订单
    cancelOrderByNo: params => {
      return Vue.http.post(baseUrl + '/order/cancelOrderByParentNo.htm', params);
    }
  },
  // 查询资源位
  queryAdDeploy: params => {
    return Vue.http.post(baseUrl + '/site/queryAdDeploy.htm', params);
  },
  // 查询二级目录
  queryCategory: params => {
    return Vue.http.get(baseUrl + '/productSearch/doCategoryByLevOne.htm', params);
  }
}
