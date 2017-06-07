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
  // 个人中心
  userCenter: {
    // 我的收藏
    queryFavorites: params => {
      return Vue.http.post(baseUrl + '/myInformation/queryFavorites.htm', params);
    },
    // 我的收藏 商品
    searchProductByIds: params => {
      return Vue.http.post(baseUrl + '/goodSearch/searchProductByIds.htm', params);
    },
    // 我的收藏 门店
    queryShopFavorites: params => {
      return Vue.http.post(baseUrl + '/memberCenter/queryShopFavorites.htm', params);
    }
  }
}
