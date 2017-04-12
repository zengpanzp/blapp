let isDebug = process.env.NODE_ENV !== 'production'
let doMain = ''
let serviceBaseUrl = ''; // 接口请求
if (isDebug) {
  doMain = 'http://m.st.bl.com/h5-web';
  serviceBaseUrl = 'http://10.201.128.110:7210/h5_gateway'
} else {
  doMain = 'http://m.bl.com/h5-web'
  serviceBaseUrl = 'http://10.201.32.152:7280'
}

export default {
  H5_FLASH: `${doMain}/flash/goflash.html`,
  H_FLASHSHOP: `${doMain}/flash/viewFlashBuyShop.html?`,
  SERVICE_BASE_URL: serviceBaseUrl
}
