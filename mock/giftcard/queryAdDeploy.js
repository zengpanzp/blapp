/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

module.exports = {
  api: '/mockapi/site/queryAdDeploy.htm',
  response: function(req, res) {
    var resData = { "resCode": "00100000", "obj": "{\"resCode\":\"00100000\",\"obj\":{\"activity\":[],\"coupon\":null,\"otherResource\":[{\"advList\":[{\"mediaUrl\":\"http://Img.st.iblimg.com/markettest-1//2016/07/res5268.jpg\",\"jumpUrl\":null,\"deployName\":\"礼品卡-app/H5-轮播1\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"0\",\"jumpId\":null,\"priority\":1,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040031,\"deployId\":7529,\"pCatalog\":null,\"contentId\":\"5268\",\"pName\":null},{\"mediaUrl\":\"http://Img.st.iblimg.com/markettest-1//2016/08/res5394.jpg\",\"jumpUrl\":null,\"deployName\":\"礼品卡-app/H5-轮播2\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"0\",\"jumpId\":null,\"priority\":2,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040031,\"deployId\":7530,\"pCatalog\":null,\"contentId\":\"5394\",\"pName\":null},{\"mediaUrl\":\"http://Img.st.iblimg.com/markettest-1//2016/08/res5408.jpg\",\"jumpUrl\":null,\"deployName\":\"礼品卡-APP/H5-轮播3\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"0\",\"jumpId\":null,\"priority\":3,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040031,\"deployId\":7549,\"pCatalog\":null,\"contentId\":\"5408\",\"pName\":null},{\"mediaUrl\":\"http://Img.st.iblimg.com/markettest-1//2016/08/res5389.jpg\",\"jumpUrl\":\"http://m.st.bl.com/h5-web/product/scanBuy.html?productid=340438\",\"deployName\":\"礼品卡-APP/H5-轮播4\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"5\",\"jumpId\":null,\"priority\":4,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040031,\"deployId\":8402,\"pCatalog\":null,\"contentId\":\"5389\",\"pName\":null}],\"resourceId\":3040031},{\"advList\":[{\"mediaUrl\":\"http://img23.st.iblimg.com/market-1/images/content/858043256.png\",\"jumpUrl\":\"162880电子卡\",\"deployName\":\"电子卡\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"2\",\"jumpId\":\"162880\",\"priority\":1,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040032,\"deployId\":10325,\"pCatalog\":null,\"contentId\":\"7069\",\"pName\":null},{\"mediaUrl\":\"http://Img.st.iblimg.com/markettest-1//2016/07/res5336.jpg\",\"jumpUrl\":\"159964主题\",\"deployName\":\"主题\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"2\",\"jumpId\":\"159964\",\"priority\":1,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040032,\"deployId\":7531,\"pCatalog\":null,\"contentId\":\"5336\",\"pName\":null},{\"mediaUrl\":\"http://Img.st.iblimg.com/markettest-1//2016/07/res5334.jpg\",\"jumpUrl\":\"159965对象\",\"deployName\":\"对象\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"2\",\"jumpId\":\"159965\",\"priority\":2,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040032,\"deployId\":7532,\"pCatalog\":null,\"contentId\":\"5334\",\"pName\":null},{\"mediaUrl\":\"http://Img.st.iblimg.com/markettest-1//2016/07/res5332.jpg\",\"jumpUrl\":\"159966节日\",\"deployName\":\"节日\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"2\",\"jumpId\":\"159966\",\"priority\":3,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040032,\"deployId\":7533,\"pCatalog\":null,\"contentId\":\"5332\",\"pName\":null},{\"mediaUrl\":\"http://Img.st.iblimg.com/markettest-1//2016/07/res5331.jpg\",\"jumpUrl\":\"159967价格\",\"deployName\":\"价格\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"2\",\"jumpId\":\"159967\",\"priority\":4,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040032,\"deployId\":7534,\"pCatalog\":null,\"contentId\":\"5331\",\"pName\":null}],\"resourceId\":3040032},{\"advList\":[{\"mediaUrl\":\"http://Img.st.iblimg.com/markettest-1//2016/08/res5389.jpg\",\"jumpUrl\":\"159968经典卡\",\"deployName\":\"礼品卡-APP/H5-单品推1\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"2\",\"jumpId\":\"159968\",\"priority\":1,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040033,\"deployId\":7535,\"pCatalog\":null,\"contentId\":\"5389\",\"pName\":null},{\"mediaUrl\":\"http://Img.st.iblimg.com/markettest-1//2016/08/res5389.jpg\",\"jumpUrl\":\"159969感谢卡\",\"deployName\":\"礼品卡-APP/H5-单品推2\",\"hint\":null,\"picDesc1\":null,\"picDesc2\":null,\"jumpType\":\"2\",\"jumpId\":\"159969\",\"priority\":2,\"contentText\":null,\"jumpCode\":\"0\",\"resourceId\":3040033,\"deployId\":7536,\"pCatalog\":null,\"contentId\":\"5389\",\"pName\":null}],\"resourceId\":3040033}],\"search\":null}}" };
    res.json(resData)
  }
}
