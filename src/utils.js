/**
 * 浏览器的sessionStorage
 * @type {[Function]}
 */
const localStorage = window.localStorage
const JSON = window.JSON
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
    str = str.replace(/\r/g, '\\r');
    str = str.replace(/\n/g, '\\n');
    str = str.replace(/\t/g, '\\t');
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/("")+/g, '"');
    str = str.replace(/\'/g, '&#39;');
    str = str.replace(/ /g, '&nbsp;');
    str = str.replace(/</g, '&glt;');
    str = str.replace(/>/g, '&gt;');
  }
  return str;
}
/**
 * 日期格式化
 * @param  {[type]} format  yyyy-MM-dd hh:mm:ss
 * @return {[type]}        [description]
 */

<<<<<<< HEAD
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
};
=======
const transData = (data) => {
  if (typeof data == 'string') {
    return JSON.parse(data.replace(/[\r\n\\]/g, "").replace(/[\s]/g, " "))
  } else {
    return data
  }
}

>>>>>>> 53eebea0555d437fa6998038cf31c6b1f259085e
export default {
  dbGet,
  dbSet,
  dbRemove,
  getRect,
<<<<<<< HEAD
  transSpecialChar,
  dateFormat
=======
  transData
>>>>>>> 53eebea0555d437fa6998038cf31c6b1f259085e
}
