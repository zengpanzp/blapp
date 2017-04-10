import urlConfig from 'src/urlConfig'
let baseUrl = urlConfig.SERVICE_BASE_URL;  // 接口请求根路径

var GET_DATA = async(type = 'GET', url = '', data = {}, method = 'fetch') => {
  type = type.toUpperCase();
  url = baseUrl + url;
  if (type == 'GET') {
    let dataStr = ''; // 数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }
  if (window.fetch && method == 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'chnflg': 'h5'
      },
      mode: "cors",
      cache: "force-cache"
    }
    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify({data: data})
      })
    }
    debugger
    try {
      var response = await fetch(url, requestConfig);
      var responseJson = await response.json();
    } catch (error) {
      throw new Error(error)
    }
    return responseJson
  } else {
    let requestObj;
    if (window.XMLHttpRequest) {
      requestObj = new XMLHttpRequest();
    }
    let sendData = '';
    if (type == 'POST') {
      sendData = JSON.stringify({data: data});
    }
    requestObj.open(type, url, true);
    requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    requestObj.send(sendData);
    requestObj.onreadystatechange = () => {
      if (requestObj.readyState == 4) {
        if (requestObj.status == 200) {
          let obj = requestObj.response
          if (typeof obj !== 'object') {
            obj = JSON.parse(obj);
          }
          return obj
        } else {
          throw new Error(requestObj)
        }
      }
    }
  }
}
/**
 * 创建临时数据
 */
// const setpromise = data => {
//   return new Promise((resolve, reject) => {
//     resolve(data)
//   })
// }

// 编译环境使用真实数据
if (process.env.NODE_ENV == 'development') {
  // 获取优惠券列表
  var getCouponList = (couponTemplateId, memberId) => GET_DATA('POST', '/h5/coupon/queryCouponTemplateDetail.htm', {
    channelId: 3,
    couponTemplateId: couponTemplateId,
    memberId: memberId
  });
} else {
  // 获取优惠券列表
  var getCouponList2 = (couponTemplateId, memberId) => GET_DATA('GET', '/campaign/coupon/queryCouponTemplateDetail.htm', {
    channelId: 3,
    couponTemplateId: couponTemplateId,
    memberId: memberId
  });
}

export {getCouponList, getCouponList2}
