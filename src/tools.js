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

export default {
  dbGet,
  dbSet,
  dbRemove
}
