/* creat by chenpeng */

/**
 * 个人中心
 */
import Vue from 'vue'

let baseUrl = require('src/api/prd-urlConfig').SERVICE_BASE_URL

if (process.env.NODE_ENV !== 'production') {
  baseUrl = require('src/api/dev-urlConfig').DEV_SERVICE
}

export default {
  userCenter: {
    // 安全中心 获取个人信息
    getMyInformation: params => {
      return Vue.http.post(baseUrl + '/myInformation/getMyInformation.htm', params);
    },
    // 安全中心 设置支付密码
    queryMemberRNAuthDetail: params => {
      return Vue.http.post(baseUrl + '/memberRNAuthList/queryMemberRNAuthDetail.htm', params);
    },
    // 安全中心 验证登录密码
    validPayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/validPayPwd.htm', params);
    },
    // 安全中心 修改邮箱
    modifyEmail: params => {
      return Vue.http.post(baseUrl + '/myInformation/modifyEmail.htm', params);
    },
    // 安全中心 修改支付密码
    revisePayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/revisePayPwd.htm', params);
    },
    // 安全中心 支付密码修改 发送短信验证码
    sendCodePayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/sendCodePayPwd.htm', params);
    },
    // 安全中心 支付密码修改 验证短信验证码
    validCodePayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/validCodePayPwd.htm', params);
    },
    // 安全中心 支付密码修改 忘记密码 提交密码
    setPayPwd: params => {
      return Vue.http.post(baseUrl + '/myInformation/setPayPwd.htm', params);
    },
    // 安全中心 登录密码修改
    modifyPassword: params => {
      return Vue.http.post(baseUrl + '/myInformation/modifyPassword.htm', params);
    },
    // 设置 登录密码修改
    getDicInfo: params => {
      return Vue.http.post(baseUrl + '/dict/list.htm', params);
    },
    // 设置 更新用户信息
    update: params => {
      return Vue.http.post(baseUrl + '/baseinfo/update.htm', params);
    },
    // 上传图片
    upload: params => {
      return Vue.http.post(baseUrl + '/media/upload.htm', params)
    },
    modifyCar: params => {
      return Vue.http.post(baseUrl + '/myInformation/modifyCarNumberNew.htm', params)
    }
  },
  otherInfo: {
    dictInfo: params => {
      return Vue.http.post(baseUrl + '/dict/list.htm', params)
    },
    ueryDictList: params => {
      return Vue.http.post(baseUrl + '/store/getDetailsByCodeAndType.htm', params)
    }
  }
}
