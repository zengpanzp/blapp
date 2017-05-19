/**
 * Created by an.han on 16/10/15.
 * 基于 express 的接口处理定义
 * See http://expressjs.com/zh-cn/4x/api.html
 */

module.exports = {
  api: '/mockapi/coupon/queryCouponTemplateDetail.htm',
  response: function (req, res) {
    res.json(
    	
    		{
	        "contentTextApp": 1,
	        "contentTextPc": 1,
	        "contentTextScreen": 1,
	        "couponChannelType": 1,
	        "effectDays": 1,
	        "erCode": 1,
	        "jumpValue": 1,
	        "maxNum": 1,
	        "maxNumPerUser": 1,
	        "maxNumPerUserDay": 1,
	        "notSentCouponCount": 1,
	        "siteStore": 1,
	        "suitShopCount": 1,
	        "waitDays": 1,
	        "canAcquireCoupon": "Y",
	        "couponDesc": "满60减41满60减41满60减41满60减41满60减41满60减41满60减41满60减41",
	        "couponDetailUrl": "http://211.147.91.84/pic/camp/2016/07/6693_detail.jpg",
	        "couponListUrl": "http://211.147.91.84/pic/camp/2016/07/6693_list.jpg",
	        "couponName": "满60减41",
	        "couponPicUrl": "http://211.147.91.84/pic/camp/2016/07/6693_logo.jpg",
	        "couponShortDesc": "满60减41",
	        "couponTemplateId": "6693",
	        "couponType": "现金券",
	        "couponTypeId": "10",
	        "dayCouponCount": 1,
	        "enableTimeFrom": "2016-07-07 00:00:00",
	        "enableTimeTo": "2016-07-31 23:59:59",
	        "isAcquiredCoupon": "N",
	        "jumpType": "0",
	        "maxNumDay": 5,
	        "offsetAmount": "41",
	        "openTimeFrom": "2016-07-01 00:00:00",
	        "openTimeTo": "2016-07-31 23:59:59",
	        "pointsValue": 0,
	        "showOrder": 1,
	        "signinAcquire": "1",
	        "validType": "0",
	        "obj": {
	        	"hjk": 'fghj'
	        }
      	}
    )
  }
}
