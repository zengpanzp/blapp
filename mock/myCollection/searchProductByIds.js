/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

module.exports = {
  api: '/mockapi/goodSearch/searchProductByIds.htm',
  response: function (req, res) {
    res.json(
    	
    		[
    		  {
    		    "goodsId": "80672",
    		    "marketPrice": "7.7",
    		    "weight": "100",
    		    "goodsImgTetle": "中国台湾进口 维力张君雅碳烤鸡汁点心面 100g",
    		    "brandSid": "208309",
    		    "comSid": "2000",
    		    "mdmCategorySid": "16001",
    		    "goodsNum": "1",
    		    "goodsImgPath": "http://img15.st.iblimg.com/goods-5/2017/02/8493_@0_@360X360.jpg",
    		    "supplierSid": "2229",
    		    "isInventory": "1",
    		    "goodsPrice": "7.7",
    		    "categorySearchInfo": "a200475",
    		    "goodsMsg": "中国台湾进口 维力张君雅碳烤鸡汁点心面 100g"
    		  },
    		  {
    		    "goodsId": "66171",
    		    "marketPrice": "15.9",
    		    "weight": "180",
    		    "goodsImgTetle": "马来西亚进口 茱莉雷蒙德芒果夹心饼干 180g",
    		    "brandSid": "203844",
    		    "comSid": "2000",
    		    "mdmCategorySid": "16000",
    		    "goodsNum": "1",
    		    "supplierSid": "2229",
    		    "isInventory": "1",
    		    "goodsPrice": "15.9",
    		    "categorySearchInfo": "a200475",
    		    "goodsMsg": "马来西亚进口 茱莉雷蒙德芒果夹心饼干 180g"
    		  },
    		  {
    		    "goodsId": "88111",
    		    "marketPrice": "8.4",
    		    "weight": "100",
    		    "goodsImgTetle": "丹麦进口 丹麦蓝罐加仑子朱古力曲奇 90g",
    		    "brandSid": "203839",
    		    "comSid": "2000",
    		    "mdmCategorySid": "20396",
    		    "goodsNum": "1",
    		    "totalEvaluate": "43",
    		    "supplierSid": "2229",
    		    "isInventory": "1",
    		    "goodsPrice": "8.4",
    		    "categorySearchInfo": "a200475",
    		    "goodsMsg": "丹麦进口 丹麦蓝罐加仑子朱古力曲奇 90g"
    		  },
    		  {
    		    "goodsId": "80669",
    		    "weight": "40",
    		    "goodsImgTetle": "台湾进口 张君雅巧克力甜甜圈 45g",
    		    "brandSid": "208309",
    		    "comSid": "2000",
    		    "mdmCategorySid": "15999",
    		    "goodsNum": "1",
    		    "supplierSid": "2229",
    		    "isInventory": "1",
    		    "categorySearchInfo": "a200475",
    		    "goodsMsg": "台湾进口 张君雅巧克力甜甜圈 45g"
    		  },
    		  {
    		    "goodsId": "80673",
    		    "weight": "40",
    		    "goodsImgTetle": "台湾进口 张君雅捏碎面 40g",
    		    "brandSid": "208309",
    		    "comSid": "2000",
    		    "mdmCategorySid": "16001",
    		    "goodsNum": "0",
    		    "totalEvaluate": "138",
    		    "supplierSid": "2229",
    		    "isInventory": "0",
    		    "categorySearchInfo": "a200475",
    		    "goodsMsg": "台湾进口 张君雅捏碎面 40g"
    		  }
    		]
    )
  }
}
