let isDebug = process.env.NODE_ENV !== 'production'
let doMain = ''

if (isDebug) {
  doMain = 'http://m.st.bl.com/h5-web'
} else {
  doMain = 'http://m.bl.com/h5-web'
}

export default {
  H5_FLASH: `${doMain}/flash/goflash.html`,
  H_FLASHSHOP: `${doMain}/flash/viewFlashBuyShop.html?`
}
