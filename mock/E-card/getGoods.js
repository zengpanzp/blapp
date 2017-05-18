/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

module.exports = {
  api: '/mockapi/goodSearch/keyWordSearchGood.htm',
  response: function (req, res) {
    var resData = {
	    "statusCode": 200,
	    "resultCode": "sucess",
	    "resultMsg": "sucess",
	    "resultInfo": {
	        "picAddress": null,
	        "jumpAddress": null,
	        "startTime": null,
	        "endTime": null,
	        "status": null,
	        "jumpUrl": "",
	        "finalPropValueNameAndIdAndScore": null,
	        "pageModel": {
	            "pageSize": 10,
	            "count": 6,
	            "pageNo": 1,
	            "totalPage": 1,
	            "rows": [
	                {
	                    "goodsId": "93668",
	                    "marketPrice": "348.0",
	                    "goodsPrice": "348.0",
	                    "goodsMsg": "美的（Midea）MB-WFS4017TM 4L电饭煲 智能不锈钢涡轮圆灶釜内胆",
	                    "goodsImgPath": "",
	                    "comSid": "3000",
	                    "supplierSid": "2230",
	                    "mdmGoodsId": "300001079861",
	                    "proSellPoint": "",
	                    "categoryid": "a210360",
	                    "categoryBackId": "103128",
	                    "brandSid": "207841",
	                    "productName": "美的（Midea）MB-WFS4017TM 4L电饭煲 智能不锈钢涡轮圆灶釜内胆",
	                    "productSid": null,
	                    "if7Refund": "0",
	                    "actStartTime": null,
	                    "actEndTime": null,
	                    "actStart": null,
	                    "actEnd": null,
	                    "isStoreAvi": null,
	                    "storePrice": null,
	                    "customCategory": "",
	                    "shipOriginPlace": "",
	                    "placeOfOrgin": "",
	                    "customRate": "",
	                    "crossBorderType": "",
	                    "importPort": "",
	                    "infoMarchantName": "",
	                    "infoMarchantSid": "",
	                    "infoStoreSid": "",
	                    "infoStoreName": "",
	                    "goodsNum": "0",
	                    "activityType": null,
	                    "isAvailable": "1",
	                    "yunType": "1",
	                    "activityCode": null,
	                    "limitBuyPersonSum": null,
	                    "limitBuySum": null,
	                    "color": "",
	                    "actSortOrder": null,
	                    "isMajorGoods": 1,
	                    "labels": [],
	                    "systemScore": "",
	                    "totalEvaluate": 0,
	                    "goodRatio": 0,
	                    "bestSeller": "",
	                    "categorySearchInfo": null,
	                    "newGoods": "",
	                    "saleStockSum": null,
	                    "goodsType": null,
	                    "isMultiTypeBind": 0,
	                    "promotion": null,
	                    "actReleasTime": null,
	                    "basketLimit": null,
	                    "actPrePrice": null,
	                    "hotPropValues": null,
	                    "boughtGood": null,
	                    "ptActivityType": null,
	                    "ptActivityCode": null,
	                    "ptActivityInfo": null,
	                    "activityTitle": null,
	                    "activityColor": null
	                },
	                {
	                    "goodsId": "94465",
	                    "marketPrice": "",
	                    "goodsPrice": "",
	                    "goodsMsg": "铁三角（audio-technica）（Audio-technica） ATH-M50xBK 专业监听旗舰级耳机",
	                    "goodsImgPath": "",
	                    "comSid": "3000",
	                    "supplierSid": "2230",
	                    "mdmGoodsId": "300001153874",
	                    "proSellPoint": "",
	                    "categoryid": "a202818",
	                    "categoryBackId": "102806",
	                    "brandSid": "208167",
	                    "productName": "铁三角（audio-technica）（Audio-technica） ATH-M50xBK 专业监听旗舰级耳机",
	                    "productSid": null,
	                    "if7Refund": "0",
	                    "actStartTime": null,
	                    "actEndTime": null,
	                    "actStart": null,
	                    "actEnd": null,
	                    "isStoreAvi": null,
	                    "storePrice": null,
	                    "customCategory": "",
	                    "shipOriginPlace": "",
	                    "placeOfOrgin": "",
	                    "customRate": "",
	                    "crossBorderType": "",
	                    "importPort": "",
	                    "infoMarchantName": "",
	                    "infoMarchantSid": "",
	                    "infoStoreSid": "",
	                    "infoStoreName": "",
	                    "goodsNum": "0",
	                    "activityType": null,
	                    "isAvailable": "1",
	                    "yunType": "1",
	                    "activityCode": null,
	                    "limitBuyPersonSum": null,
	                    "limitBuySum": null,
	                    "color": "",
	                    "actSortOrder": null,
	                    "isMajorGoods": 1,
	                    "labels": [],
	                    "systemScore": "",
	                    "totalEvaluate": 0,
	                    "goodRatio": 0,
	                    "bestSeller": "",
	                    "categorySearchInfo": null,
	                    "newGoods": "",
	                    "saleStockSum": null,
	                    "goodsType": null,
	                    "isMultiTypeBind": 0,
	                    "promotion": null,
	                    "actReleasTime": null,
	                    "basketLimit": null,
	                    "actPrePrice": null,
	                    "hotPropValues": null,
	                    "boughtGood": null,
	                    "ptActivityType": null,
	                    "ptActivityCode": null,
	                    "ptActivityInfo": null,
	                    "activityTitle": null,
	                    "activityColor": null
	                },
	                {
	                    "goodsId": "93688",
	                    "marketPrice": "7399.0",
	                    "goodsPrice": "7399.0",
	                    "goodsMsg": "佳能（Canon）微距双灯头闪光灯MT-24EX",
	                    "goodsImgPath": "",
	                    "comSid": "3000",
	                    "supplierSid": "2230",
	                    "mdmGoodsId": "300001080160",
	                    "proSellPoint": "",
	                    "categoryid": "a202898",
	                    "categoryBackId": "102237",
	                    "brandSid": "209650",
	                    "productName": "佳能（Canon）微距双灯头闪光灯MT-24EX",
	                    "productSid": null,
	                    "if7Refund": "0",
	                    "actStartTime": null,
	                    "actEndTime": null,
	                    "actStart": null,
	                    "actEnd": null,
	                    "isStoreAvi": null,
	                    "storePrice": null,
	                    "customCategory": "",
	                    "shipOriginPlace": "",
	                    "placeOfOrgin": "",
	                    "customRate": "",
	                    "crossBorderType": "",
	                    "importPort": "",
	                    "infoMarchantName": "",
	                    "infoMarchantSid": "",
	                    "infoStoreSid": "",
	                    "infoStoreName": "",
	                    "goodsNum": "0",
	                    "activityType": null,
	                    "isAvailable": "1",
	                    "yunType": "1",
	                    "activityCode": null,
	                    "limitBuyPersonSum": null,
	                    "limitBuySum": null,
	                    "color": "",
	                    "actSortOrder": null,
	                    "isMajorGoods": 1,
	                    "labels": [],
	                    "systemScore": "",
	                    "totalEvaluate": 0,
	                    "goodRatio": 0,
	                    "bestSeller": "",
	                    "categorySearchInfo": null,
	                    "newGoods": "",
	                    "saleStockSum": null,
	                    "goodsType": null,
	                    "isMultiTypeBind": 0,
	                    "promotion": null,
	                    "actReleasTime": null,
	                    "basketLimit": null,
	                    "actPrePrice": null,
	                    "hotPropValues": null,
	                    "boughtGood": null,
	                    "ptActivityType": null,
	                    "ptActivityCode": null,
	                    "ptActivityInfo": null,
	                    "activityTitle": null,
	                    "activityColor": null
	                },
	                {
	                    "goodsId": "94438",
	                    "marketPrice": "4399.0",
	                    "goodsPrice": "4399.0",
	                    "goodsMsg": "富士（FUJIFLIM）FUJIFILM X-M1（16-50mm+50-230mm双镜头）微型单电套机 银色",
	                    "goodsImgPath": "",
	                    "comSid": "3000",
	                    "supplierSid": "2230",
	                    "mdmGoodsId": "300001153078",
	                    "proSellPoint": "",
	                    "categoryid": "a202848",
	                    "categoryBackId": "101970",
	                    "brandSid": "209572",
	                    "productName": "富士（FUJIFLIM）FUJIFILM X-M1（16-50mm+50-230mm双镜头）微型单电套机 银色",
	                    "productSid": null,
	                    "if7Refund": "0",
	                    "actStartTime": null,
	                    "actEndTime": null,
	                    "actStart": null,
	                    "actEnd": null,
	                    "isStoreAvi": null,
	                    "storePrice": null,
	                    "customCategory": "",
	                    "shipOriginPlace": "",
	                    "placeOfOrgin": "",
	                    "customRate": "",
	                    "crossBorderType": "",
	                    "importPort": "",
	                    "infoMarchantName": "",
	                    "infoMarchantSid": "",
	                    "infoStoreSid": "",
	                    "infoStoreName": "",
	                    "goodsNum": "0",
	                    "activityType": null,
	                    "isAvailable": "0",
	                    "yunType": "1",
	                    "activityCode": null,
	                    "limitBuyPersonSum": null,
	                    "limitBuySum": null,
	                    "color": "",
	                    "actSortOrder": null,
	                    "isMajorGoods": 1,
	                    "labels": [],
	                    "systemScore": "",
	                    "totalEvaluate": 0,
	                    "goodRatio": 0,
	                    "bestSeller": "",
	                    "categorySearchInfo": null,
	                    "newGoods": "",
	                    "saleStockSum": null,
	                    "goodsType": null,
	                    "isMultiTypeBind": 0,
	                    "promotion": null,
	                    "actReleasTime": null,
	                    "basketLimit": null,
	                    "actPrePrice": null,
	                    "hotPropValues": null,
	                    "boughtGood": null,
	                    "ptActivityType": null,
	                    "ptActivityCode": null,
	                    "ptActivityInfo": null,
	                    "activityTitle": null,
	                    "activityColor": null
	                },
	                {
	                    "goodsId": "93789",
	                    "marketPrice": "16699.0",
	                    "goodsPrice": "16699.0",
	                    "goodsMsg": "佳能（Canon）XA25 专业数码摄像机",
	                    "goodsImgPath": "",
	                    "comSid": "3000",
	                    "supplierSid": "2230",
	                    "mdmGoodsId": "300001084626",
	                    "proSellPoint": "",
	                    "categoryid": "a202850",
	                    "categoryBackId": "102805",
	                    "brandSid": "209650",
	                    "productName": "佳能（Canon）XA25 专业数码摄像机",
	                    "productSid": null,
	                    "if7Refund": "0",
	                    "actStartTime": null,
	                    "actEndTime": null,
	                    "actStart": null,
	                    "actEnd": null,
	                    "isStoreAvi": null,
	                    "storePrice": null,
	                    "customCategory": "",
	                    "shipOriginPlace": "",
	                    "placeOfOrgin": "",
	                    "customRate": "",
	                    "crossBorderType": "",
	                    "importPort": "",
	                    "infoMarchantName": "",
	                    "infoMarchantSid": "",
	                    "infoStoreSid": "",
	                    "infoStoreName": "",
	                    "goodsNum": "0",
	                    "activityType": null,
	                    "isAvailable": "0",
	                    "yunType": "1",
	                    "activityCode": null,
	                    "limitBuyPersonSum": null,
	                    "limitBuySum": null,
	                    "color": "",
	                    "actSortOrder": null,
	                    "isMajorGoods": 1,
	                    "labels": [],
	                    "systemScore": "",
	                    "totalEvaluate": 0,
	                    "goodRatio": 0,
	                    "bestSeller": "",
	                    "categorySearchInfo": null,
	                    "newGoods": "",
	                    "saleStockSum": null,
	                    "goodsType": null,
	                    "isMultiTypeBind": 0,
	                    "promotion": null,
	                    "actReleasTime": null,
	                    "basketLimit": null,
	                    "actPrePrice": null,
	                    "hotPropValues": null,
	                    "boughtGood": null,
	                    "ptActivityType": null,
	                    "ptActivityCode": null,
	                    "ptActivityInfo": null,
	                    "activityTitle": null,
	                    "activityColor": null
	                },
	                {
	                    "goodsId": "94468",
	                    "marketPrice": "",
	                    "goodsPrice": "",
	                    "goodsMsg": "苹果（Apple）iPad Air 2 9.7英寸平板电脑 16G WiFi版 金色 MH0W2CH/A",
	                    "goodsImgPath": "",
	                    "comSid": "3000",
	                    "supplierSid": "2230",
	                    "mdmGoodsId": "300001149108",
	                    "proSellPoint": "",
	                    "categoryid": "a202645",
	                    "categoryBackId": "102010",
	                    "brandSid": "207941",
	                    "productName": "苹果（Apple）iPad Air 2 9.7英寸平板电脑 16G WiFi版 金色 MH0W2CH/A",
	                    "productSid": null,
	                    "if7Refund": "0",
	                    "actStartTime": null,
	                    "actEndTime": null,
	                    "actStart": null,
	                    "actEnd": null,
	                    "isStoreAvi": null,
	                    "storePrice": null,
	                    "customCategory": "",
	                    "shipOriginPlace": "",
	                    "placeOfOrgin": "",
	                    "customRate": "",
	                    "crossBorderType": "",
	                    "importPort": "",
	                    "infoMarchantName": "",
	                    "infoMarchantSid": "",
	                    "infoStoreSid": "",
	                    "infoStoreName": "",
	                    "goodsNum": "0",
	                    "activityType": null,
	                    "isAvailable": "0",
	                    "yunType": "1",
	                    "activityCode": null,
	                    "limitBuyPersonSum": null,
	                    "limitBuySum": null,
	                    "color": "",
	                    "actSortOrder": null,
	                    "isMajorGoods": 1,
	                    "labels": [],
	                    "systemScore": "",
	                    "totalEvaluate": 0,
	                    "goodRatio": 0,
	                    "bestSeller": "",
	                    "categorySearchInfo": null,
	                    "newGoods": "",
	                    "saleStockSum": null,
	                    "goodsType": null,
	                    "isMultiTypeBind": 0,
	                    "promotion": null,
	                    "actReleasTime": null,
	                    "basketLimit": null,
	                    "actPrePrice": null,
	                    "hotPropValues": null,
	                    "boughtGood": null,
	                    "ptActivityType": null,
	                    "ptActivityCode": null,
	                    "ptActivityInfo": null,
	                    "activityTitle": null,
	                    "activityColor": null
	                }
	            ],
	            "params": null
	        }
	    }
	}
    res.json(resData)
  }
}