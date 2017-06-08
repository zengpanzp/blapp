import utils from 'src/utils'

// sucCallback 成功支付的回调  failCallback 取消支付的回调
const goPay = function(order, type, sucCallback, failCallback) {
  this.sendData = {
    price: Number(order.payMoney).toFixed(2),
    detailPageId: 0,
    arriveTime: 0,
    payNo: order.accountNo,
    virtual: true
  }
  function formatOrderTime(saleTime) {
    let time = [];
    let saleTimeArray = saleTime.split(' ');
    time.push(saleTimeArray[0].replace(/-/g, ''));
    time.push(saleTimeArray[1].replace(/:/g, ''));
    return time;
  }
  if (order.detailPageId) {
    this.sendData.detailPageId = order.detailPageId;
  }

  let orderType = "sdm";
  if (order.orderTypeCode == '23') {
    orderType = 'sjzc'
  }
  let orderAmt = order.payMoney;
  let discountAmt = order.changeMoney;
  if (order.payType == "0") {
    orderAmt = order.payMoney;
    discountAmt = order.payMoney;
  } else if (order.payType == "1") {
    orderAmt = order.changeMoney;
    discountAmt = order.changeMoney;
  }

  let member_id = utils.ssdbGet('member_id')
  window.CTJSBridge && window.CTJSBridge.LoadMethod('ExposeJsApi', 'getServiceCfg', '', {
    success: data => {
      sa.track('$pageview', {
        pageId: 'APP_虚拟页面_收银台',
        categoryId: 'APP_Fees',
        $title: "APP_虚拟页面_收银台"
      });
      let ServiceCfg = JSON.parse(data).ServiceCfg // 获取地址信息
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
          console.log('native接口 调native收银台返回报文=============<br>' + data)
          sucCallback && sucCallback(data);
        },
        fail: error => {
          console.log(error)
          let errorData = JSON.parse(error)
          if (errorData.result == 'fail') {
            // 取消支付
            failCallback && failCallback(errorData)
            if (type == '23') {
              window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
                pageId: 'expensesorderdetail',
                params: JSON.stringify({
                  order: order.orderNo
                })
              })
            }
          }
        }
      })
    }
  })
}

export default {
  goPay
}
