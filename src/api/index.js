/* creat by chenpeng */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'
import URL from '../default-urlConfig'
import { DEV_SERVICE } from './dev-urlConfig'

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
  // 个人中心
  userCenter: {
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
  messageCenter: {
    // 查询消息类型
    loadMsgType: params => {
      return Vue.http.post(baseUrl + '/dict/listByTypes.htm', params);
    },
    // 查询第一条消息
    getCount: params => {
      return Vue.http.post(baseUrl + '/send/findStationMsgByType.htm', params);
    },
    // 查询具体消息内容
    getMessage: params => {
      return Vue.http.post(baseUrl + '/send/findByPage.htm', params);
    },
    // 对消息进行操作
    operateMessage: params => {
      return Vue.http.post(baseUrl + '/send/operationMsg.htm', params);
    }
  },
  // 虚拟充值缴费的所有接口
  recharge: {
    // 虚拟充值 可充值产品查询接口
    queryPhoneGoodsDetail: params => {
      return Vue.http.post(baseUrl + '/kmgm/goods_detail.htm', params);
    },
    // 虚拟充值 生成订单
    genOrder: params => {
      return Vue.http.post(baseUrl + '/kmgm/gen_order.htm', params);
    },
    // 虚拟充值 生成固话订单
    buyszkOrder: params => {
      return Vue.http.post(baseUrl + '/kmgm/buyszk.htm', params);
    },
    // 虚拟充值 创建费用订单
    createExpensesOrder: params => {
      return Vue.http.post(baseUrl + '/order/createExpensesOrder.htm', params);
    },
    // 游戏充值 获取游戏商品详情
    sdyxJson: params => {
      return Vue.http.post(baseUrl + '/web/sdyx_json.htm', params);
    },
    // 查询我的缴费分组
    queryMyGroup: params => {
      return Vue.http.post(baseUrl + '/myInformation/queryPaySubGroup.htm', params);
    },
    updateMyGroup: params => {
      return Vue.http.post(baseUrl + '/myInformation/updatePaySubGroup.htm', params);
    },
    // 添加我的分组名称
    createMyGroup: params => {
      return Vue.http.post(baseUrl + '/myInformation/createPaySubNoGroup.htm', params);
    },
    // myInformation/createPaySubNo.htm
    // 添加我的分组名称
    createPaySubNo: params => {
      return Vue.http.post(baseUrl + '/myInformation/createPaySubNo.htm', params);
    },
    // 查询我的分组名称
    queryPaySubNo: params => {
      return Vue.http.post(baseUrl + '/myInformation/queryPaySubNo.htm', params);
    },
    // 删除我的分组
    deleteMyGroup: params => {
      return Vue.http.post(baseUrl + '/myInformation/deletePaySubGroup.htm', params);
    },
    // 水电煤的缴费机构
    queryCompanyGroup: params => {
      return Vue.http.post(baseUrl + '/gyjf/type_detail.htm', params);
    },
    // 有线电视和铁通机构查询
    queryLineTVAndTieTongCompany: params => {
      return Vue.http.post(baseUrl + '/sdm/type_detail.htm', params);
    },
    // 水电煤 生成订单
    createOrder: params => {
      return Vue.http.post(baseUrl + '/gyjf/gen_order.htm', params);
    },
    // 水电煤 订单详情
    getOrderDetail: params => {
      return Vue.http.post(baseUrl + '/gyjf/order_search.htm', params);
    },
    // 水电煤 订单详情
    getNewOrderDetail: params => {
      return Vue.http.post(baseUrl + '/order/getOrderDetail.htm', params);
    },
    // 根据扫描条形码进行账单查询
    getOrderByScanCode: params => {
      return Vue.http.post(baseUrl + '/txmjx/do_txmjx.htm', params);
    },
    // 水电煤 商品详情
    getGoodsDetail: params => {
      return Vue.http.post(baseUrl + '/gyjf/goods_new_detail.htm', params);
    },
    // 水电煤 订单状态
    getOrderStatus: params => {
      return Vue.http.post(baseUrl + '/gyjf/getstatus.htm', params);
    },
    // 水电煤 缴费凭证
    getSignMsg: params => {
      return Vue.http.post(baseUrl + '/gyjf/signmsg.htm', params);
    },
    // 水电煤 支付提货
    pickUp: params => {
      return Vue.http.post(baseUrl + '/gyjf/pickup.htm', params);
    }
  },
  // 查询待评价信息
  queryCommentBytype: params => {
    return Vue.http.post(baseUrl + '/product/queryCommentByType.htm', params)
  },
  // 查询评价数量
  queryCount: params => {
    return Vue.http.post(baseUrl + '/product/queryCommentCount.htm', params)
  },
  // 获取售后单列表
  getSaleList: params => {
    return Vue.http.post(baseUrl + '/order/getReturnList.htm', params)
  }
}
