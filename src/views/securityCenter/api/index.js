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
  // 个人中心
  userCenter: {
    // 安全中心 获取个人信息
    getMyInformation: params => {
      return Vue.http.post(baseUrl + '/myInformation/getMyInformation.htm', params);
    },
    // 安全中心 设置支付密码
    queryMemberRNAuthDetail: params => {
      return Vue.http.post(baseUrl + '/memberRNAuthList/queryMemberRNAuthDetail.htm', params);
    },
    // 安全中心 验证登录密码强度
    validPayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/validPayPwd.htm', params);
    },
    // 安全中心 修改邮箱
    modifyEmail: params => {
      return Vue.http.post(baseUrl + '/myInformation/modifyEmail.htm', params);
    },
  }
}
