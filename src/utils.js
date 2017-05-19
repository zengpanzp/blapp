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

/* eslint-disable no-array-constructor */
/* eslint-disable curly */
var hexcase = 0;
var chrsz = 8;

function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}
function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

function core_md5(x, len) {
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;
  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

function str2binl(str) {
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for (var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (i % 32);
  return bin;
}

function binl2hex(binarray) {
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for (var i = 0; i < binarray.length * 4; i++) {
    str += hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) +
      hex_tab.charAt((binarray[i >> 2] >> ((i % 4) * 8)) & 0xF);
  }
  return str;
}
const MD5 = (s) => {
  return binl2hex(core_md5(str2binl(s), s.length * chrsz));
}
/*  */

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
  MD5
}
