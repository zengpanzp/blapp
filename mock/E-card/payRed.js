/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

module.exports = {
  api: '/mockapi/blpay/red.htm',
  response: function (req, res) {
    var resData = {"resCode": "00100000", "obj": "{\"header\":{\"resCode\":\"0000\",\"resMsg\":\"交易成功\",\"signature\":\"a0278d8632155e627935d825afd2be7dd69adac8e8a93e2303127639ae539230\"},\"body\":{\"cardList\":[{\"cardNo\":\"020000104788\",\"balance\":\"32\",\"cardName\":\"百联电子卡（100元）\",\"bindFlag\":\"0\",\"usedFlag\":\"1\",\"cardPin\":\"0490726A8C3E8554BD956FCC5398E18AC8BFE08C486152006DFF53DB497F94EB\",\"cardValue\":\"100\",\"sku\":\"1126292\",\"cardTime1\":\"2020-01-31\",\"cardStatus\":\"06\"},{\"cardNo\":\"020000104789\",\"balance\":\"0\",\"cardName\":\"百联电子卡（100元）\",\"bindFlag\":\"0\",\"usedFlag\":\"1\",\"cardPin\":\"355CC22A52D310356F4C398EFDB137B0C8BFE08C486152006DFF53DB497F94EB\",\"cardValue\":\"100\",\"sku\":\"1126292\",\"cardTime1\":\"2020-01-17\",\"cardStatus\":\"04\"}],\"count\":\"2\",\"start\":\"1\",\"end\":\"2\"}}"};
    res.json(resData)
  }
}
