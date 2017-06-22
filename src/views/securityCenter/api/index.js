/* creat by chenpeng */

/**
 * 个人中心 安全中心
 */
import Vue from 'vue'

let baseUrl = require('src/api/prd-urlConfig').SERVICE_BASE_URL

if (process.env.NODE_ENV !== 'production') {
  baseUrl = require('src/api/dev-urlConfig').DEV_SERVICE
}

export default {
  userCenter: {
    // 获取个人信息
    getMyInformation: params => {
      return Vue.http.post(baseUrl + '/myInformation/getMyInformation.htm', params);
    },
    // 设置支付密码
    queryMemberRNAuthDetail: params => {
      return Vue.http.post(baseUrl + '/memberRNAuthList/queryMemberRNAuthDetail.htm', params);
    },
    // 验证登录密码
    validPayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/validPayPwd.htm', params);
    },
    // 修改邮箱
    modifyEmail: params => {
      return Vue.http.post(baseUrl + '/myInformation/modifyEmail.htm', params);
    },
    // 修改支付密码
    revisePayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/revisePayPwd.htm', params);
    },
    // 支付密码修改 发送短信验证码
    sendCodePayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/sendCodePayPwd.htm', params);
    },
    // 支付密码修改 验证短信验证码
    validCodePayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/validCodePayPwd.htm', params);
    },
    // 支付密码修改 忘记密码 提交密码
    setPayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/setPayPwd.htm', params);
    },
    // 登录密码修改
    modifyPassword: params => {
      return Vue.http.post(baseUrl + '/myInformation/modifyPassword.htm', params);
    },
  }
}
