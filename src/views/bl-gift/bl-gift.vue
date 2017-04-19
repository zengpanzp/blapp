<style lang="scss" src="./css/_bl-gift.scss" scoped></style>
<template>
	  <div class="new blgift">
         <bl-scroll :enableRefresh="true" :on-infinite="onInfinite" :enableInfinite="isLoading" id="container" v-scroll-top v-scroll-record v-scroll-fixed>
			<!-- content Start -->
			<!-- 轮播 Start -->
			<bl-slide class="blgift-swipe" :slides="fillAllSlides" :autoPlay="true" :showShadow="true"></bl-slide>
			<!-- 轮播 End -->
			<!-- 送礼对象 Start -->
			<div class="gift-main">
				<div class="gift-title">
					<div style="background:#e6133c;"></div>
					送礼对象
				</div>
				<div class="gift-ul">
					<ul>
						<li v-for="item in sendType">
							<a href="#">
								<span><img :src="item.mediaUrl"></span>
								<span class="gift-name">{{item.deployName}}</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- 送礼对象 End -->

			<!-- 当季热销 Start -->
			<div class="recommend-main" v-for="item,index in hotType">
				<div class="gift-title">
					<div style="background:#c77c10;"></div>
					当季热推
				</div>
				<div class="recommend-info">
					<div class="recommend-info-banner">
						<div class="gift-benfont">#{{item.deployName}}#参与即得10积分</div>
						<div class="banner-box"></div><img :src="item.mediaUrl">
					</div>
					<div class="recommend-show">
						<div class="recommend-ul">
							<ul>
								<li v-for="goodsItem in goodsList[index]">
									<div>
										<a href="#"><img :src="goodsItem[0].goodsImgPath?goodsItem[0].goodsImgPath:'http://img23.st.iblimg.com/market-1/images/content/743528369.png'"></a>
									</div>
									<div class="recommend-name">
										<a href="#">{{goodsItem[0].productName}}</a>
									</div>
									<div class="recommend-money"><i>￥</i>{{goodsItem[0].marketPrice}}</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<!-- 当季热销 End -->
			<!-- 礼物分类 Start -->
			<div class="title-hot">
				<div class="title-hot-top">
					<div class="title-hot-font">
						<div class="title-box"><img :src="hotIcon">礼物分类</div>
					</div>

				</div>
			</div>
			<div class="bl-class">
				<ul>
					<li v-for="item in goodType">
						<div>
							<a href="#"><img :src="item.mediaUrl"></a>
						</div>
					</li>
				</ul>
			</div>
			<!-- 礼物分类 End -->
			<!-- bottom Start -->
			<div class="file-show">
				<div class="file-lshow">
					<div class="file-ltop">
						<a href="#"><i>18</i><img src="css/i/give-gift/l-icon-1.png"></a>
					</div>
					<div class="file-ltop">
						<a href="#"><img src="css/i/give-gift/l-icon-2.png"></a>
					</div>
					<div class="file-top">
						<a href="javascript:;"><img src="css/i/give-gift/top-icon.png"></a>
					</div>
				</div>
			</div>
		</bl-scroll>
	</div>
	<!-- bottom End -->

	<!-- content End -->
</template>
<script>
import api from 'src/api/index'
import utils from 'src/utils'
export default {

  name: 'blgift',

  data() {
    return {
      hotIcon: require('./i/hot-icon-1.png'),
      // 广告资源位
      banner: [],
      // 送礼对象列表
      sendType: [],
      // 热推商品
      hotType: [],
      // 商品类别
      goodType: [],
      // 商品列表
      goodsList: []
    }
  },
  computed: {
    fillAllSlides() {
      return this.banner
    }
  },
  created() {
    debugger;
  	window.$$vue = this;
    this.$loading.close();
    api.blgift.queryAdDeploy({
      'otherresource': {
        'resourceId': "1604,1605,1606,1607,1608,1609,1610,1611,1612,1613,1614,1615,1616,1617,1618,1619,1620,1621,1624"
      },
    }).then(data => {
    	console.log(data);
    	let obj = JSON.parse(data.body.obj);
    	console.log(obj);
    	let resList = [];
    	let typeList = [];
    	obj = obj.obj
    	if (obj && obj.otherResource) {
	        for (var i = 0; i < 17; i++) {
	            if (obj.otherResource[i] && obj.otherResource[i].advList) {
	                for (var k = 0; k < obj.otherResource[i].advList.length; k++) {
		              if (parseInt(obj.otherResource[i].advList[k].jumpType) == 14) {
		                // window.setAdvertRoute(obj.otherResource[i].advList[k]);
		              }
		              if (parseInt(obj.otherResource[i].advList[k].jumpType) == 33) {
		                // window.setAdvertRoute(obj.otherResource[i].advList[k]);
			          }
		              if (parseInt(obj.otherResource[i].advList[k].jumpType) == 3) {
		                    obj.otherResource[i].advList[k].routeurl += "/giftFlag";
		                }
		            }
		            if (obj.otherResource[i].advList && obj.otherResource[i].advList[0]) {
		                obj.otherResource[i].advList[0].index = i;
		                typeList.push(obj.otherResource[i].advList[0]);
		            }
		        }
		    }
		    for (i = 17; i < 19; i++) {
		    	if (obj.otherResource[i] && obj.otherResource[i].advList) {
		    		for (var j = 0; j < obj.otherResource[i].advList.length; j++) {
		                // window.setAdvertRoute(obj.otherResource[i].advList[j]);
		                console.log(obj.otherResource[i].advList[j])
		                if (parseInt(obj.otherResource[i].advList[j].jumpType) == 2) {
		                    obj.otherResource[i].advList[j].routeurl = "#BLPresentGoodListPage/0/" + encodeURIComponent(JSON.stringify(obj.otherResource[i].advList[j]));
		                }
		                if (parseInt(obj.otherResource[i].advList[j].jumpType) == 3) {
		                    obj.otherResource[i].advList[j].routeurl += "/giftFlag";
		                }
		            }
		            resList.push(obj.otherResource[i].advList);
		        }
		    }
		}
		console.log(resList);
		console.log(typeList);
		// 有礼头部banner
		this.banner = resList[1];
		// 送礼的类别
		let sendTag = [];
		for (let i = 0; i < 8; i++) {
			sendTag.push(typeList[i]);
		}
		this.sendType = sendTag;
		// 热门商品分类
		let goodTag = [];
		for (let i = 8; i < typeList.length; i++) {
			goodTag.push(typeList[i]);
		}
		console.log(goodTag)
		this.goodType = goodTag;
		// 商品类别
		this.hotType = resList[0];
		for (let i = 0; i < this.hotType.length; i++) {
			// 根据jumpId获得商品列表
			api.blgift.searchByKeyWord({
                "clientIp": "127.0.0.1",
                "clientRequestTime": utils.dateFormat("yyyyMMddhhmm"),
                "requestData": JSON.stringify({
	                "c": "9999" + this.hotType[i].jumpId,
	                "channelSid": "1",
	                "isColl": "1",
	                "searchInfo": {
	                    "isava": "",
	                    "sorCol": "",
	                    "yunType": "",
	                    "ifPickup": "",
	                    "sorTye": "",
	                    "props": {},
	                    "pageModel": {
	                        "pageNo": "1",
	                        "pageSize": "8"
	                    }
	                }
	            }),
                "systemNo": "06"
            }).then(data => {
            	console.log(data);
            	let json = JSON.parse(data.body.obj);
            	this.goodsList.push(json.resultInfo.pageModel.rows);
			});
		}
		this.$el.querySelector('.infinite-layer').hide();
    });
  },
  methods: {
    onRefresh(done) {
      setTimeout(() => {
        done()
      }, 2000)
    }
  }
};
</script>
<style lang="scss">
	// 百联彩礼首页
	.blgift-swipe {
	    .swiper-pagination {
	        position: absolute;
	        padding: 0;
	        bottom: 8px;
	        width: 100%;
	        text-align: center;
	        li {
	            border-color: transparent;
	            background-color: transparent;
	            display: inline-block;
	            width: rem(16);
	            margin: 0 rem(8);
	            height: rem(16);
	            line-height: 1;
	            font-size: 0;
	            border: 1px solid #fff;
	            border-radius: 50%;
	            opacity: 1;
	        }
	        li.on {
	            background: #fff;
	            background-color: #fff;
	        }
	    }
	}
</style>
