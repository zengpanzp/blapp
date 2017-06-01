import Vue from 'vue'
/**
 * 浏览器的localStorage
 * @type {[Function]}
 */
const dbGet = (name) => {
  let value = localStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
  return value
}

const dbSet = (name, value) => {
  if (typeof value === typeof {}) value = JSON.stringify(value)
  return localStorage.setItem(name, value)
}

const dbRemove = (name) => {
  return localStorage.removeItem(name)
}

/**
 * 浏览器的sessionStorage
 * @type {[Function]}
 */
const ssdbGet = (name) => {
  let value = sessionStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
  return value
}

const ssdbSet = (name, value) => {
  if (typeof value === typeof {}) value = JSON.stringify(value)
  return sessionStorage.setItem(name, value)
}

const ssdbRemove = (name) => {
  return sessionStorage.removeItem(name)
}

/**
 * 日期格式化
 * @param  {[type]} format  yyyy-MM-dd hh:mm:ss
 * @return {[type]}        [description]
 */

const dateFormat = (format) => {
    let dt = new Date();
    var date = {
      "M+": dt.getMonth() + 1,
      "d+": dt.getDate(),
      "h+": dt.getHours(),
      "m+": dt.getMinutes(),
      "s+": dt.getSeconds(),
      "q+": Math.floor((dt.getMonth() + 3) / 3),
      "S+": dt.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
      format = format.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length))
    }
    for (var k in date) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length))
      }
    }
    return format
  }
  /**
   * 判断参数类型,统一返回JSON
   * @chenpeng
   * @DateTime 2017-04-20T12:49:54+0800
   * @param    {[String,Object]}
   * @return   {[Object]}
   */
const transData = (data) => {
  if (typeof data == 'string') {
    return JSON.parse(data.replace(/[\r\n\t\f\\]/g, "").replace(/[\s]/g, " "))
  } else {
    return data
  }
}

/**
 * 判断是否登录
 * @chenpeng
 * @DateTime 2017-04-20T12:51:10+0800
 * @return   {[obj]}    [Promise]
 */
const isLogin = (login = true) => {
  return new Promise((resolve, reject) => {
    window.CTJSBridge.LoadMethod('NativeEnv', 'fetchLoginInfo', {}, {
      success: res => {
        let resData = transData(res)
        console.log(resData)
        if (resData.member_id && resData.member_token) {
          ssdbSet('member_id', resData.member_id)
          ssdbSet('member_token', resData.member_token)
          ssdbSet('member_mobile', resData.mobile)
          console.log('已经登录')
          resolve(resData)
        } else {
          ssdbRemove('member_id')
          ssdbRemove('member_token')
          console.log('没有登录')
          login && window.CTJSBridge.LoadMethod('BLLogin', 'PresentLoginViewController', {}, {
            success: data => {
              let resData = transData(data)
              ssdbSet('member_id', resData.member_id)
              ssdbSet('member_token', resData.member_token)
              ssdbSet('member_mobile', resData.mobile)
              resolve(resData)
            },
            fail: () => {
              reject()
            }
          })
        }
      },
      fail: () => { reject() },
      progress: () => {}
    })
  })
}

/**
 * native加入购物车
 * @chenpeng
 * @DateTime 2017-04-27T12:51:49+0800
 * @param    {[string, number]}        goodId [商品id]
 * @param    {[Object]}                item [商品信息]
 */
const addCard = (goodId, item = {}) => {
  isLogin().then((data) => {
    window.CTJSBridge && window.CTJSBridge.LoadAPI('BLCartAddCartAPIManager', {
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
        // sensor analytics - addCart
        try {
          console.log((new Date()).toLocaleString() + '加入购物车 埋点')
          sa.track('addCart', {
            productId: item.goodsId,
            productName: item.productName,
            productType: item.goodsType,
            productBrand: item.brandSid,
            originalPriceR: Number(item.marketPrice),
            salePrice: Number(item.goodsPrice),
            productCount: Number(item.goodsNum)
          });
        } catch (err) {
          console.log("sa error => " + err);
        }
      },
      fail: () => {},
      progress: () => {}
    })
  }, () => {})
}

/**
 * 数组对象排序,默认升序
 * @chenpeng
 * @DateTime 2017-04-27T12:47:07+0800
 * @param    {[array]}               arrs [需要排序的数组]
 * @param    {[all]}                 prop [数组属性]
 * @return   {[array]}               [排序后的数组]
 */
const orderBy = (arrs, prop, sort = 1) => {
  return arrs.sort(function(obj1, obj2) {
    let val1 = obj1[prop];
    let val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2);
      if (!sort) {
        [val1, val2] = [val2, val1]
      }
    }
    if (val1 < val2) {
      return -1;
    } else if (val1 > val2) {
      return 1;
    } else {
      return 0;
    }
  })
}

/**
 * 生成时间戳
 * @chenpeng
 * @DateTime 2017-05-18T10:02:36+0800
 * @return   {[String]}                 [时间戳]
 */
const getTimeFormatToday = () => {
  let today = new Date();

  let year = today.getFullYear() + '';
  let month = (today.getMonth() + 1) + '';
  month = (month.length === 1) ? '0' + month : month;
  let day = today.getDate() + '';
  day = (day.length === 1) ? '0' + day : day;
  let hour = today.getHours() + '';
  hour = (hour.length === 1) ? '0' + hour : hour;
  let min = today.getMinutes() + '';
  min = (min.length === 1) ? '0' + min : min;
  let sec = today.getSeconds() + '';
  sec = (sec.length === 1) ? '0' + sec : sec;

  return year + month + day + hour + min + sec;
}

export default {
  dbGet,
  dbSet,
  dbRemove,
  ssdbGet,
  ssdbSet,
  ssdbRemove,
  dateFormat,
  transData,
  isLogin,
  addCard,
  orderBy,
  getTimeFormatToday,
}
