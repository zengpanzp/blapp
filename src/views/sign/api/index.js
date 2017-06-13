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
  // 签到
  sign: {
    // 查询用户是否有抽奖资格
    lotteryQualification: params => {
      return Vue.http.post(baseUrl + '/memberSignIn/signIn/lotteryQualification.htm', params);
    },
    // 查询签到日历
    querysignInCalendar: params => {
      return Vue.http.post(baseUrl + '/memberSignIn/signInHistory/querysignInCalendar.htm', params);
    },
    // 查询用户是否有签到资格
    signInQualification: params => {
      return Vue.http.post(baseUrl + '/memberSignIn/signIn/signInQualification.htm', params);
    },
    // 签到抽奖促销回调接口
    lotteryCallback: params => {
      return Vue.http.post(baseUrl + '/memberSignIn/signIn/lotteryCallback', params);
    },
    // 签到接口
    signIn: params => {
      return Vue.http.post(baseUrl + '/memberSignIn/signIn/signIn.htm', params);
    },
    // 查询资源位
    queryAdDeploy: params => {
      return Vue.http.post(baseUrl + '/site/queryAdDeploy.htm', params);
    }
  }
}
