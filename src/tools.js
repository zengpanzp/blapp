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
 * 图片预加载
 * @chenpeng
 * @DateTime 2017-03-28T16:35:42+0800
 */
const imgLoad = (url, callback) => {
  let img = new Image();
  img.src = url;
  if (img.complete) {
    callback(img.width, img.height);
  } else {
    img.onload = function() {
      callback(img.width, img.height);
      img.onload = null;
    };
  };
};

export default {
  dbGet,
  dbSet,
  dbRemove,
  getRect,
  imgLoad
}
