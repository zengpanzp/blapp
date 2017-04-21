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
 * 判断是否到达底部
 * @chenpeng
 * @DateTime 2017-03-28T16:34:10+0800
 */
const getRect = (ele = document.body) => {
  let inHeight = window.innerHeight
  let rect = ele.getBoundingClientRect()

  rect.isVisible = rect.top - inHeight < 0; // 是否在可视区域
  rect.isBottom = rect.bottom - inHeight <= 0;
  return rect;
}
/**
 * 针对字符串替换功能  尤其是返回的json字符串替换
 * @神马
 * @param  {[type]} str [字符串]
 * @return {[type]}     [string]
 */
const transSpecialChar = (str) => {
  if (str) {
    str = str.replace(/\r/g, ' ');
    str = str.replace(/\n/g, ' ');
    str = str.replace(/\t/g, ' ');
    str = str.replace(/\f/g, ' ');
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/[\s]/g, " ");
  }
  return str;
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
    return JSON.parse(transSpecialChar(data))
  } else {
    return data
  }
}

/**
 * 判断是否登录
 * @chenpeng
 * @DateTime 2017-04-20T12:51:10+0800
 * @param    {[number]} loginStatus [0:失效 1:正常]
 * @return   {[obj]}    [Promise]
 */
const isLogin = (loginStatus = 1) => {
  let memberId = null
  let memberToken = null
  if (loginStatus) {
    memberId = ssdbGet('member_id')
    memberToken = ssdbGet('member_token')
  }
  return new Promise((resolve, reject) => {
    if (!memberId && !memberToken) {
      console.log('没有登录')
      window.CTJSBridge && window.CTJSBridge.LoadMethod('BLLogin', 'PresentLoginViewController', {}, {
        success: data => {
          let resData = transData(data)
          ssdbSet('member_id', resData.member_id)
          ssdbSet('member_token', resData.member_token)
          resolve()
        },
        fail: () => {
          reject && reject()
        }
      })
    } else {
      console.log('已经登录')
      resolve()
    }
  })
}

const addCard = (goodId) => {
  isLogin().then(() => {
    let memberId = ssdbGet('member_id')
    let memberToken = ssdbGet('member_token')
    window.CTJSBridge && window.CTJSBridge.LoadAPI('BLDJAddCartAPIManager', {
      memberId: memberId,
      member_token: memberToken,
      orderSourceCode: "1",
      goodsList: [
        {
          goodsId: goodId,
          goodsNumber: "1",
          type: "10",
        }
      ]
    }, {
      success: data => {
        let resData = JSON.parse(data)
        Vue.$toast({
          position: 'bottom',
          message: resData.resultMsg
        });
      },
      fail: err => { console.log(err) },
      progress: data => { console.log(data) }
    })
  }, () => {})
}

export default {
  dbGet,
  dbSet,
  dbRemove,
  ssdbGet,
  ssdbSet,
  ssdbRemove,
  getRect,
  transSpecialChar,
  dateFormat,
  transData,
  isLogin,
  addCard
}
