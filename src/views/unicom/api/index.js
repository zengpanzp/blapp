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
  // 联通专区
  unicom: {
    // 登陆后查看认证状态
    authenticate: params => {
      return Vue.http.post(baseUrl + '/unicom/jn/UnicomVerifyAndGroup.htm', params);
    },
    // 点击认证查看认证状态
    checkAuthentic: params => {
      return Vue.http.post(baseUrl + '/unicom/jn/UnicomVerifyStatus.htm', params);
    },
    // 获取流量列表
    getTrafficList: params => {
      return Vue.http.post(baseUrl + '/uniconOrder/queryUniconGroupQuali.htm', params);
    },
    // 查看实名认证等级
    realName: params => {
      return Vue.http.post(baseUrl + '/memberRNAuthList/queryMemberRNAuthDetail.htm', params);
    },
    // 领取流量
    getTraffic: params => {
      return Vue.http.post(baseUrl + '/uniconOrder/makeUnicomOrder.htm', params);
    }
  }
}
