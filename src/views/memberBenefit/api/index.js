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
  },
  // 适用查询门店信息
  selectShop: params => {
    return Vue.http.post(baseUrl + '/site/range.htm', params)
  },
  // 查询坐标
  selectForIos: params => {
    return Vue.http.post(baseUrl + '/lbsApi/regeo.htm', params)
  },
  // 查询坐标
  selectCity: params => {
    return Vue.http.post(baseUrl + '/baseinfo/queryProCityAreas.htm', params)
  },
  // 查询所有省市区
  queryAllProvince: params => {
    return Vue.resource('/static/js/json/allCityAreas.json').get(params)
  },
  // 查询所有合作商户
  queryAllShop: params => {
    return Vue.http.post(baseUrl + '/myInformation/queryMriMerchants.htm', params)
  },
  // 查会员详情
  memberRNAuthDetail: params => {
    return Vue.http.post(baseUrl + '/memberRNAuthList/queryMemberRNAuthDetail.htm', params)
  },
  // 绑定
  getBind: params => {
    return Vue.http.post(baseUrl + '/memberPointExchange/assembleBindParameters.htm', params)
  },
  // 查询第三方积分
  getThirdPoint: params => {
    return Vue.http.post(baseUrl + '/memberPointExchange/queryThirdRemainPoint.htm', params)
  },
  // 查询积分
  getPointDel: params => {
    return Vue.http.post(baseUrl + '/memberPoint/externalQueryRemainPoint.htm', params)
  },

  // 龙腾贵宾室提交信息
  submitVIPRoomBookInf: params => {
    return Vue.http.post(baseUrl + '/memberActivity/submitVIPRoomBookInf.htm', params)
  },
  // 龙腾贵宾室查看预约状态
  queryVIPRoomBookStatus: params => {
    return Vue.http.post(baseUrl + '/memberActivity/queryVIPRoomBookStatus.htm', params)
  }
}
