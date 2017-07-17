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
  // 账号密码登录
  login: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/login.htm', params);
  },
  // 发送短信验证码
  sendSMSCode: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/sendRegisterOrLoginValidateCodeMessage.htm', params);
  },
  // 根据短信验证码登录
  loginWithSmsCode: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/loginWithSmsCode.htm', params);
  }
}
