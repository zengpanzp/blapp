var bridge = function () {};

var h5BaseUrl = 'https://m.bl.com/h5-web';
bridge.prototype.LoadMethod = function(targetName, actionName, data, callback) {
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
      callback.success(localStorage.getItem('userInfo') || '{"memberLevel":"261","realNameLevel":"1","nickName":"","memberLevelCode":"10","passportId":"1_df40ee2b337f452b9dc5cb2b8959d439_5634","mediaCephUrl":"http:\/\/img.st.iblimg.com\/bl-iblapp-1\/1997980134.jpg","member_id":"100000002715634","high_risk":false,"groupIds":"","usable_stat":"0","black_account":false,"idFlag":"1","avatarUrl":"http:\/\/img.st.iblimg.com\/bl-iblapp-1\/1997980134.jpg","isSalesman":"0","expire_in":"2592000","remain_times":"3","need_complete":false,"callbackIdentifier":"-2051622763","member_token":"4acf40fa4a3f2a4165215fc682bf2ae65d772b2f386606f891e0ee426b9e065d","newRegFlag":false,"encode_memberId":"5cba905c18be762b6c352541ba81e6f8","encode_mobile":"4e3966d6c3493e3251c20148ef9c6e20","pwdStrength":"2","locked_reason":"","shellId":"BL_d55b0adf3ca845c8bf399e86f49e3184_5634","loginCode":"","mobile":"18679475831","error_times":"0","result":"success","member_name":"陈鹏"}')
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
      window.location.href = '/index2.html#/' + data.url + '?orderType=' + data.type
      break;
    // 收银台跳转
    case 'cashierNavigationController':
      // TODO
      break;
    // 返回H5首页
    case 'pagemanagerNavigateToHome':
      window.location.href = h5BaseUrl + '/page/view_Index.html?pageNumber=1&pageSize=5'
      break;
    default:
      // TODO default
  }
};

bridge.prototype.LoadAPI = function(apiName, data, callback) {
  // TODO
  switch (apiName) {
    // 添加购物车
    case 'BLDJAddCartAPIManager':
      break;
  }
};

bridge.prototype._setNativeTitle = function(title) {
  // body...
};

var CTJSBridge = new bridge();
