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
    return Vue.http.post(baseUrl + '/member/login.htm', params);
  },
  // 发送短信验证码
  sendSMSCode: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/sendRegisterOrLoginValidateCodeMessage.htm', params);
  },
  // 注册的短信验证码
  sendSMSCodeByRegister: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/sendRegisterValidateCodeMessage.htm', params);
  },
  // 重置密码的短信验证码
  sendSMSCodeByResetPass: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/sendResetPasswordValidateCodeMessage.htm', params);
  },
  // 重置密码验证短信验证码的有效性
  validatePasswordSMSCode: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/verifyPasswordSmsCode.htm', params);
  },
  // 重置密码
  resetPassword: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/resetPasswordBySmsCode.htm', params);
  },
  // 根据短信验证码登录
  loginWithSmsCode: params => {
    return Vue.http.post(baseUrl + '/member/login.htm', params);
  },
  // 验证安付宝账号是否存在
  validateOKPayExit: params => {
    return Vue.http.post(baseUrl + '/member/successJointlogin.htm', params);
  },
  // 绑定安付宝账号
  bindOKPay: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/registerAndLoginWithThirdPartyUidByCode.htm', params);
  },
  // 注册账号
  register: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/appWeixinRegister.htm', params);
  },
  // 验证唯一性手机号
  validatePhone: params => {
    return Vue.http.post(baseUrl + '/baseinfo/jn/checkPhoneUnique.htm', params);
  },
  // 安付宝 登录 或者 绑定
  unionLogin: params => {
    return Vue.http.post(baseUrl + '/rsa/getAFBUrl.htm', params);
  }
}
