# LoadAPI(apiName, data, callback)

apiName | 参数 | 动作 | 中间件
---|---|---|---
BLAPPSiteQueryAdDeployAPIManager | {resourceId: ''} | 调接口 | site/queryAdDeploy.htm
BLPromotionQueryFlashCategoryAPIManager | {channelld: ''} | 调接口 | promotion/queryFlashCatetory.htm
BLPromotionQueryFlashListAPIManager | {channelid: '',type: '', pageNum: '', pageSize: '', parameter: '', flashCategories: ''} | 调接口 | promotion/queryFlashList.htm
BLPromotionQueryFlashGoodsAPIManager | {channelid: '', flashId: ''} | 调接口 | promotion/queryFlashGoods.htm
BLQueryBrandDetailSearchActivityAPIManager | {actCode: '', sorCol: '',sorTye:'',pageSize:'',pageNo:'',isava:'',brandSid:''} | 调接口 | search/queryActivityProduct.htm
BLSearchByKeyWordAPIManager | {channelSid: '', c: '', searchInfo:{sorCol:'', sorTye:'',pageModel:{pageNo:'',pageSize:''}}} | 调接口 | search/searchByKeyWord.htm
BLAPPSiteQueryAdDeployAPIManager | {resourceId:''} | 调接口 | site/queryAdDeploy.htm
BLQueryProductListAPIManager | {fkRankid: ''} | 调接口 | content/queryrankProductList.htm
BLQueryRankListAPIManager | {rankType: ''} | 调接口 | content/queryRankList.htm

暂时用到这些

# LoadMethod(targetName, actionName, data, callback)

targetName | actionName | 参数 | 动作
---|---|---|---
BLGoodsDetail | BLGoodsDetailViewController | {goodsid:'',goodsName:'',goodsPrice:'',goodsImageUrl:'',isGiftGoods:Boolean} | h5跳native商品详情页
SearchList | SearchList | {searchkey:''} | h5跳native搜索列表页
BLAdvertResource | BLAdvertResourceController | {} | 资源位跳转
BLCategory | BLCategoryViewController | { categoryId: '' } | 跳native分类
打开新的webview
NativeWebView | loadWebView  { pageUrl:”http://www.baidu.com”,pageTitle:”百度”}  
# native方法

```js
// 跳native商品详情页
window.CTJSBridge.LoadMethod('BLGoodsDetail', 'BLGoodsDetailViewController', {
  goodsid: '',
  goodsName: '',
  goodsPrice: '',
  goodsImageUrl: '',
  isGiftGoods: Boolean || false
})

// 跳native搜索列表页
window.CTJSBridge.LoadMethod('SearchList', 'SearchList', {
  searchkey: ''
})

// 资源位跳转
window.CTJSBridge.LoadMethod('BLAdvertResource', 'BLAdvertResourceController', {})

// 打开新的webview
window.CTJSBridge.LoadMethod('NativeWebView', 'loadWebView', { pageUrl:”http://www.baidu.com”,pageTitle: "百度"})

// 跳native分类
window.CTJSBridge.LoadMethod('BLCategory', 'BLCategoryViewController', { categoryId: '9999' + id })

// 设置title
window._setNativeTitle('')

// 分享,native会调window下的commShare方法
window.commShare = function() {
    window.CTJSBridge.LoadMethod('BLShare', 'H5BLShareParams', {
        url: '',
        title: '',
        content: ''
    })
}

// 获取APP用户登录信息
window.CTJSBridge.LoadMethod('NativeEnv', 'fetchLoginInfo', {}, {
    success: data => {
        console.log(data)
        <!-- 返回数据如下 -->
        {
            "memberLevel": "261",
            "realNameLevel": "0",
            "nickName": "",
            "memberLevelCode": "10",
            "passportId": "1_79d9bb4d2de24e45a333ceab9c4a67a5_6861",
            "mediaCephUrl": "",
            "member_id": "100000002716861",
            "high_risk": false,
            "groupIds": "",
            "usable_stat": "0",
            "black_account": false,
            "idFlag": "0",
            "avatarUrl": "",
            "isSalesman": "0",
            "expire_in": "2400",
            "remain_times": "3",
            "need_complete": false,
            "callbackIdentifier": "-2051622763",
            "member_token": "4acf40fa4a3f2a41d87cf1df4f754f241e719d90e785f35bac1c544060b38c3d",
            "newRegFlag": false,
            "encode_memberId": "",
            "encode_mobile": "",
            "locked_reason": "",
            "shellId": "BL_e171f50217b64d1cba148ead08737bb4_6861",
            "loginCode": "",
            "mobile": "18337166071",
            "result": "success",
            "error_times": "0",
            "member_name": "18337166071"
        }
    }
})

// 加入购物车
window.CTJSBridge && window.CTJSBridge.LoadAPI('BLDJAddCartAPIManager', {
  memberId: data.member_id,
  member_token: data.member_token,
  orderSourceCode: "1",
  shoppingCartType: "1",
  goodsList: [{
    goodsId: goodId,
    goodsNumber: "1",
    type: "10",
  }]
}, {
  success: data => {
    let resData = JSON.parse(data)
    Vue.$toast({
      position: 'bottom',
      message: resData.resultMsg
    });
  },
  fail: () => {},
  progress: () => {}
})

// 资源位埋点
window.CTJSBridge && window.CTJSBridge.LoadMethod('NativeEnv', 'fetchUserInfo', {}, {
  success: res => {
    let userInfo = JSON.parse(res);
    console.log(userInfo)
    if (userInfo.memberId) {
      userInfo.distinctId = userInfo.memberId
    }
    if (userInfo.distinctId) {
      sa.identify(userInfo.distinctId)
    }
    sa.register({
      platform: userInfo.platform,
      memberId: userInfo.memberId,
      resourceId: userInfo.resourceId,
      resourceType: userInfo.resourceType,
      deployId: userInfo.deployId,
      mmc: userInfo.mmc
    })

    <!-- 返回数据如下 -->
    {
        platform: 'iOS',
        memberId: '100000000298420',
        resourceId: '1161',
        resourceType: '13',
        deployId: '138106',
        mmc: 'AppStore'
    }
  },
  fail: err => {
    console.log(err)
  },
  progress: data => {}
})

======================================Start
2017-05-24添加  做充值缴费过程用到的

// 充值缴费--缴费记录跳转
window.CTJSBridge && window.CTJSBridge.LoadMethod('BLChargeAndPayment', 'chargeAndPaymentViewController', {
  type: type,
  url: url
}, {})

// 调原生通讯录
window.CTJSBridge && window.CTJSBridge.LoadMethod('Contact', 'selectItem', '', {
  success: data => {
    <!-- 返回数据如下 -->
    {
        phoneNumber: '18679475831'
    }
  },
  fail: () => {},
  progress: () => {}
})

// 获取服务器的url信息
window.CTJSBridge && window.CTJSBridge.LoadMethod('ExposeJsApi', 'getServiceCfg', '', {
  success: data => {
    console.log(ServiceCfg)
    <!-- 返回数据如下 -->
    {
        "result": "success",
        "ServiceCfg": {
            "searchCommonPayment": "http://mapi.blemall.com/sdm/order_search",
            "falshSales": "https://mh5.st.bl.com/#/flashSales",
            "searchCommonPaymentByTime": "http://mapi.blemall.com/orderunion/orderunionsearch",
            "mh5BaseUrl": "https://mh5.st.bl.com/#/",
            "sdGameDetail": "http://10.201.96.143/szk/application/controllers/json/",
            "queuereqGetOrderDetailStand": "http://9now.cn/api/queue/user/",
            "virtualMerId": "000090150504233",
            "walletMerId": "000090150504238",
            "queuereqDetailStand": "http://9now.cn/api/queue/req/",
            "payNotifyUrl": "http://10.201.129.64:7000/notification/payedApp/appPayForGroupon.htm",
            "commonAnalysisBarcode": "http://mapi.blemall.com/txmjx/do_txmjx",
            "commonTelPay": "http://mapi.blemall.com/kmgm/buyszk",
            "commonPaymentDetailNew": "http://mapi.blemall.com/gyjf/goods_new_detail",
            "commonGameDetail": "http://mapi.blemall.com/game_charge/cplb",
            "queuereqCancelOrderDetailStand": "http://9now.cn/api/queue/cancel/",
            "rechargeOrder": "http://mapi.blemall.com/kmgm/gen_order",
            "commonPaymentTypeDetail": "http://mapi.blemall.com/sdm/type_detail",
            "flashsaleprouctpages": "https://mh5.st.bl.com/#/flashsaleproductspage",
            "realMerId": "000090150504231",
            "searchRechargeOrder": "http://mapi.blemall.com/sjzc/order_search",
            "rechargeGoodsDetailUrl": "http://mapi.blemall.com/kmgm/goods_detail",
            "commonPaymentOrder": "http://222.73.227.153/mapi/gyjf/gen_order",
            "queueDetailStand": "http://9now.cn/api/queue/detail/",
            "commonGetStatus": "http://mapi.blemall.com/kmgm/getStatus",
            "payNotifyCommonUrl": "http://10.201.129.64:7000/notification/payedApp/",
            "commonGetTicket": "http://mapi.blemall.com/game_charge/query"
        },
        "callbackIdentifier": "1692386264"
    }
  }
})

// 收银台
let payRequestData = {
  'MerOrderNo': order.outOrderNo,
  'memberId': member_id,
  'MerId': ServiceCfg.virtualMerId,
  'MarAfterUrl': `${ServiceCfg.payNotifyCommonUrl}payedDailyLifeNew.htm?flag=ok&methodN=${orderType}&tranDate=${order.orderTime}&orderid=${order.outOrderNo}&memberId=${member_id}`,
  'TranDate': formatOrderTime(order.orderTime)[0],
  'TranTime': formatOrderTime(order.orderTime)[1],
  'orderAmt': Number(orderAmt).toFixed(2),
  'discountAmt': Number(discountAmt).toFixed(2),
  'orderExpiryEndTime': order.activeTime + "",
  'SubId': "",
  'payType': order.payType ? order.payType : 0
}
window.CTJSBridge.LoadMethod('BLCashier', 'cashierNavigationController', payRequestData, {
  success: data => {
    console.log(data)
  },
  fail: error => {
    console.log(error)
    let errorData = JSON.parse(error)
    if (errorData.result == 'fail') {
      // 取消支付
    }
  }
})

// 扫一扫
  window.CTJSBridge && window.CTJSBridge.LoadMethod('BLBarScanner', 'presentH5BLBarScanner', '', {
    success: data => {
      console.log(data)
    },
    fail: data => {
      console.log(data)
    }
  })
}

// 返回首页

setTimeout(function () {
window.CTJSBridge.LoadMethod('BLPageManager', 'pagemanagerNavigateToHome', {pageId: ''})
}, 2500)

// 弹框
<!-- ios  style 不传值 默认为default--> 
window.CTJSBridge.LoadMethod('AlertController', 'showAlert', {
  title: "title",
  message: "message",
  buttons: [
  {
    title: "default"
  }, {
    title: "cancel",
    style: "disabled"
  }, {
    title: "destructive",
    style: "highlighted"
  }]
}, { success: data => {
  console.log("####success#####" + data)
}})

<!-- android -->
  window.CTJSBridge.LoadMethod('AlertController', 'showAlert', {
    title: "提示",
    message: "确认要退出？",
    buttons: [ "取消", "确定" ]
  }, { success: data => {
    debugger
    console.log("####success#####" + data)
    if (data.index == 0) {
      alert("取消")
    } else if (data.index == 1) {
      alert("确定")
    }
  }
})
======================================End
```


