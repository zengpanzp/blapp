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
  // 加入购物车
  addCart: params => {
    return Vue.http.post(baseUrl + '/search/addCartV3.htm', params)
  },
  // CMS优惠券领取优惠券
  getCoupon: params => {
    return Vue.http.post(baseUrl + '/coupon/getCoupon.htm', params);
  },
  // 百联财礼 百联有礼
  blgift: {
    // 取消订单
    cancelOrderByNo: params => {
      return Vue.http.post(baseUrl + '/order/cancelOrderByParentNo.htm', params);
    },
    // 获取收到的礼物的数据
    getGiftOrderListByReceiver: params => {
      return Vue.http.post(baseUrl + '/order/getGiftOrderListByReceiver.htm', params);
    },
    // 获取我发出去的礼物的数据
    getGiftOrderListBySender: params => {
      return Vue.http.post(baseUrl + '/order/getGiftOrderListBySender.htm', params);
    }
  },
  // 查询资源位
  queryAdDeploy: params => {
    return Vue.http.post(baseUrl + '/site/queryAdDeploy.htm', params);
  },
  // 查询二级目录
  queryCategory: params => {
    return Vue.resource(baseUrl + '/productSearch/doCategoryByLevOne.htm').get(params)
  },
  // 我的收藏
  queryFavorites: params => {
    return Vue.http.post(baseUrl + '/myInformation/queryFavorites.htm', params);
  },
  // 我的收藏 商品
  searchProductByIds: params => {
    return Vue.http.post(baseUrl + '/goodSearch/searchProductByIds.htm', params);
  },
  // 我的收藏 门店
  queryShopFavorites: params => {
    return Vue.http.post(baseUrl + '/myCollect/queryShopFavorites.htm', params);
  },
  // 虚拟充值缴费的所有接口
  recharge: {
    // 查询我的缴费分组
    queryMyGroup: params => {
      return Vue.http.post(baseUrl + 'myInformation/queryPaySubGroup.htm', params);
    },
    // 水电煤的缴费机构
    queryCompanyGroup: params => {
      return Vue.http.post(baseUrl + 'gyjf/type_detail.htm', params);
    }
  }
}
