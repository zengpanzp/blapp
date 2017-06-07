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
  }
}
