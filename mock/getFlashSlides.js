/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

module.exports = {
  api: '/mockapi/getFlashSlides',
  response: function (req, res) {
    res.json(
      [
        {
          "deployName": "法国娇兰",
          "mediaUrl": "http://img23.iblimg.com/market-2/images/content/1149936757.jpg"
        },
        {
          "deployName": "肌美精",
          "mediaUrl": "http://img22.iblimg.com/market-2/images/content/1352513114.jpg"
        }
      ]
    )
  }
}
