import Vue from 'vue'

let baseUrl = require('src/api/prd-urlConfig').SERVICE_BASE_URL

if (process.env.NODE_ENV !== 'production') {
  baseUrl = require('src/api/dev-urlConfig').DEV_SERVICE
}

export default {
// 我的钱包
  myWallet: {
    // 查询余额
    getBalance: params => {
      return Vue.http.post(baseUrl + '/search/queryBalance.htm', params);
    },
    // 查询积分
    getPoint: params => {
      return Vue.http.post(baseUrl + '/memberPoint/queryMemberPoint.htm', params);
    },
    // 查询ECP
    getECP: params => {
      return Vue.http.post(baseUrl + '/search/accmsAcctMastInfo.htm', params);
    },
    // 查询是否设置支付密码
    checkPayWord: params => {
      return Vue.http.post(baseUrl + '/myInformation/validPayPwd.htm', params);
    },
    // 查询余额明细
    getBalanceList: params => {
      return Vue.http.post(baseUrl + '/search/transactionDetail.htm', params);
    },
    // 查询积分明细
    getPointsInfo: params => {
      return Vue.http.post(baseUrl + '/myInformation/queryPointHistory.htm', params);
    },
    // 查询ECP明细
    getECPList: params => {
      return Vue.http.post(baseUrl + '//turn/forwardBizms/syn/000000000104.htm', params);
    },
    // 查询小额免密
    checkNoPswPay: params => {
      return Vue.http.post(baseUrl + '/blpay/queryPassword.htm', params);
    },
    // // 查看实名认证等级
    // realNameAuth: params => {
    //   return Vue.http.post(baseUrl + '/memberRNAuthList/queryMemberRNAuthDetail.htm', params);
    // },
    }
  }
