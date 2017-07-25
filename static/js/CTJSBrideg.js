window.CTJSBridge = {}

var h5BaseUrl = 'https://m.bl.com/h5-web';

CTJSBridge.prototype.LoadMethod = function(targetName, actionName, data, callback) {
  switch (actionName) {
    // 埋点信息
    case 'fetchUserInfo':
      callback.success({
        platform: 'H5',
        mmc: '',
        memberId: JSON.parse(localStorage.getItem('userInfo')).member_id
      })
      break;
    // 获取APP用户登录信息
    case 'fetchLoginInfo':
      callback.success(localStorage.getItem('userInfo'))
      break;
    // 商品详情页
    case 'BLGoodsDetailViewController':
      window.location.href = h5BaseUrl + '/product/scanBuy.html?productid=' + data.goodsid
      break;
    // 搜索列表页, TODO:关键字传给H5
    case 'SearchList':
      window.location.href = h5BaseUrl + '/search/productList.html'
      break;
    // 资源位跳转, TODO:
    case 'BLAdvertResourceController':
      window.location.href = h5BaseUrl
      break;
    // 打开新的webview
    case 'loadWebView':
      window.location.href = data.pageUrl
      break;
    // 分类
    case 'BLCategoryViewController':
      window.location.href = h5BaseUrl + '/circuitCity/SearchCategorylist.html?parentSid=' + data.categoryId
      break;
    // 分享
    case 'H5BLShareParams':
      break;
    /* 充值缴费相关 */
    // 充值缴费--缴费记录跳转
    case 'chargeAndPaymentViewController':
      window.location.href = '/' + data.url + '?orderType=' + data.type
      break;
    // 充值缴费--缴费记录跳转 TODO: 订单类型传值
    case 'chargeAndPaymentViewController':
      window.location.href = '/' + data.url + '?orderType=' + data.type
      break;
    // 收银台跳转
    case 'cashierNavigationController':
      // TODO
      break;
    // 返回H5首页
    case 'pagemanagerNavigateToHome':
      window.location.href = h5BaseUrl + '/page/view_Index.html?pageNumber=1&pageSize=5'
      break;
    // 返回H5首页
    case 'pagemanagerNavigateToHome':
      window.location.href = h5BaseUrl + '/page/view_Index.html?pageNumber=1&pageSize=5'
      break;
    default:
      // TODO default
  }
};

CTJSBridge.prototype.LoadAPI = function(apiName, data, callback) {
  // TODO
  switch (apiName) {
    // 添加购物车
    case 'BLDJAddCartAPIManager':
      break;
  }
};

CTJSBridge.prototype._setNativeTitle = function(title) {
  // body...
};
