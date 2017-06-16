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
    // 游戏充值 获取游戏商品详情
    cplb: params => {
      return Vue.http.post(baseUrl + '/game_charge/cplb.htm', params);
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
    // 删除账号
    deletePaySubNo: params => {
      return Vue.http.post(baseUrl + '/myInformation/deletePaySubNos.htm', params);
    },
    // 更新账号信息
    updatePaySubNo: params => {
      return Vue.http.post(baseUrl + '/myInformation/updatePaySubNo.htm', params);
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
  }
}
