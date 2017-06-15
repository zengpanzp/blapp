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
	// 曾攀 根据powerId查权益详情
  getPowerDel: params => {
    return Vue.http.post(baseUrl + '/memberLevelRight/load.htm', params)
  },
  	//	曾攀查询券总数
  getCouponCount: params => {
    return Vue.http.post(baseUrl + '/coupon/myCouponList.htm', params)
  },
  	//	曾攀查会员资格
  queryQualify: params => {
  	return Vue.http.post(baseUrl + '/memberActivity/queryMemberActivityQualification.htm', params)
  },
  	//	曾攀查会员活动
  checkActivity: params => {
  	return Vue.http.post(baseUrl + '/memberActivity/memberActivityQualification.htm', params)
  }
}
