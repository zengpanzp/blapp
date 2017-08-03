/* creat by zp */

/**
 * 请求集中在这个文件中
 */
import Vue from 'vue'

let baseUrl = require('src/api/prd-urlConfig').SERVICE_BASE_URL

if (process.env.NODE_ENV !== 'production') {
  baseUrl = require('src/api/dev-urlConfig').DEV_SERVICE
}

export default {
  // 查询活动地区
  queryActivityAreas: params => {
    return Vue.http.post(baseUrl + '/memberActivity/queryActivityAreas.htm', params)
  },
  // 查询医院
  queryHospitalByArea: params => {
    return Vue.http.post(baseUrl + '/memberActivity/queryHospitalByArea.htm', params)
  },
  // 查询医院科室
  queryDeptCatByHospital: params => {
    return Vue.http.post(baseUrl + '/memberActivity/queryDeptCatByHospital.htm', params)
  },
  // TODO
  queryRemainResourceNum: params => {
    return Vue.http.post(baseUrl + '/memberActivity/queryRemainResourceNum.htm', params)
  },
  // TODO
  memberActivityQualification: params => {
    return Vue.http.post(baseUrl + '/memberActivity/memberActivityQualification.htm', params)
  },
  // 提交信息
  submitHospitalBookInf: params => {
    return Vue.http.post(baseUrl + '/memberActivity/submitHospitalBookInf.htm', params)
  }
}
