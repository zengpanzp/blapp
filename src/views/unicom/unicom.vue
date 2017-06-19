<style lang="scss" src="./css/unicom.scss" scoped></style>
<template>
	<div class="new">
	    <div class="unicom-content" id="hf-app">
	        <div class="unicom-ban">
	            <div><img src="./i/fill_icon.jpg"></div>
	        </div>
	        <div class="block" id="start" style="display: block" @click="authenticate">
	            <div class="unicom-confirm">
	                <a>
	                    <h4 class="confirm">开始认证</h4>

	                    <p>请使用联通号码认证</p>
	                </a>
	            </div>
	        </div>
	        <div class="block" id="finish" style="display: none">
	            <div class="unicom-confirm unicom-finsh">
	                <a>
	                    <h4 class="finish-confirm">已完成认证</h4>
	                </a>
	            </div>
	        </div>
	        <div class="block" id="cannot" style="display: none">
	            <div class="unicom-confirm unicom-error">
	                <a>
	                    <h4 class="num-error">号码不符合</h4>

	                    <p>请使用联通号码认证</p>
	                </a>
	            </div>
	        </div>

	        <div class="unicom-box" style="display: block">
	            <div class="box-title">
	                <div class="box-title-left">流量就在这里领</div>
	                <div class="box-title-right" @click="notice"><a id="notice">流量领取说明</a></div>
	            </div>
	            <div class="box-ll">
	                <ul>
	                	<li class="box-llitem" v-for="item, index in llList">
						    <div class="llitem-left">
						        <div class="lll-name">{{item.ruleName}}</div>
						        <div class="lli-balance">{{item.rechargeNum + item.unit}}
						            <span class="contr-small">全国流量包</span>
						        </div>
						    </div>
						    <div class="llitem-right" @click="getTraffic(item.ruleCode)">
						        <a :class="{ 'unicom-disabled' : item.remainTimes <= 0 }">点击<br/>领取</a>
						    </div>
						</li>
	                </ul>
	            </div>
	        </div>
	    </div>

	    <div class="mask" style="display: none;"></div>
	    <div class="modal fix-modal iphone-modal modal-out" style="display: none">
	        <div class="modal-inner unic-modal-inner">
	            <h3 class="unic-modal-title">流量领取说明</h3>

	            <div class="unic-modal-con">
	            	<div class="unic-con-title">
	            		1.i百联注册新会员专属:
	            	</div>
	            	<div class="unic-con-text">
	            		如果您未注册百联通，通过认证并完成百联通会员注册，可领取100M流量，每位用户限领一次
	            	</div>
	            	<div class="unic-con-title">
	            		2.i百联老会员认证专属:
	            	</div>
	            	<div class="unic-con-text">
	            		如果您已是百联通会员，通过认证后，可领取50M流量，每位用户限领一次
	            	</div>
	            	<div class="unic-con-title">
	            		3.i百联消费满额会员专属（不定期活动）:
	            	</div>
	            	<div class="unic-con-text">
	            		百联通会员（包括新注册会员）通过联通认证后，活动月内在i百联商城消费满一定额度（虚拟产品除外），即可至该专区领取1024M流量
	            	</div>
	            </div>
	        </div>
	        <div class="modal-buttons">
	            <a class="modal-button full-button" @click="close">关 闭</a>
	        </div>
	    </div>
	</div>
</template>

<script>
import api from './api/index'
import utils from 'src/utils'
export default {

  name: 'unicom',

  data () {
    return {
    	deviceId: "",
    	memberId: "",
    	memberToken: "",
    	mobile: "",
    	llList: []
    };
  },
  created() {
  	try {
        sa.track('$pageview', {
          pageId: 'APP_联通专区',
          categoryId: 'APP_User',
          $title: "APP_联通专区"
        })
    } catch (err) {
    	console.log("sa error => " + err);
    }
  	window.CTJSBridge.LoadMethod('ExposeJsApi', 'getIMEI', '', {
  			success: data => {
	        	this.deviceId = JSON.parse(data).IMEI
	        },
	        fail: () => {},
	        progress: () => {}
  		})
  	this.getTrafficList()
  },
  methods: {
  	getTrafficList() {
  		let list = [];
  		api.unicom.getTrafficList({
  			deviceId: this.deviceId,
  			member_token: this.memberToken
  		}).then(data => {
  			let obj = JSON.parse(data.body.obj);
  			console.log("-----gjGetTrafficList-----" + JSON.stringify(obj));
  			for (var i = 0; i < obj.list.length; i++) {
  				list.push(obj.list[i])
  			}
  			this.llList = list
	  	utils.isLogin().then(data => {
	  		this.memberId = data.member_id;
	  		this.memberToken = data.member_token;
	  		this.mobile = data.mobile;
	  		// $(".llitem-right a").addClass("unicom-disabled")
	  		api.unicom.checkAuthentic({
	  			member_token: this.memberToken,
	            mobile: this.mobile,
	            deviceId: this.deviceId
	  		}).then(data => {
	  			this.$loading.close();
	  			$(".block").hide();
	  			if (data.body.obj) {
	  				let obj = JSON.parse(data.body.obj);
		  			if (obj && obj.key) {
		  				if (obj.key == "1") {
		  					$("#start").css("display", "block")
			  			} else if (obj.key == "2") {
			  				$("#finish").css("display", "block")
			  			} else if (obj.key == "3") {
			  				$("#cannot").css("display", "block")
			  			}
		  			}
	  			}
	  			this.$nextTick(() => {
	  				for (var i = 0; i < this.llList.length; i++) {
	  					// if (this.llList[i].remainTimes <= '0') {
	  					// 	$(".llitem-right a").addClass("unicom-disabled")
	  					// }
	  					if ((this.llList[i].exchangedTimes && parseInt(this.llList[i].exchangedTimes) > 0 && parseInt(this.llList[i].remainTimes) <= 0)) {
	  							$(".llitem-right a").html("已领取")
	  					}
		  			}
	  			})
	  		}, err => {
	  			console.log(err)
	  			$("#start").css("display", "block")
	  		})
	  	})
  	})
  	},
  	notice() {
  		$(".modal").removeClass("modal-out").css({
  			"top": "30%",
  			"border-radius": "0",
  			"display": "block"
  		})
  		$(".mask").css("display", "block")
  	},
  	close() {
  		$(".modal").addClass("modal-out").css("top", "50%")
  		$(".mask, .modal").css("display", "none")
  	},
  	authenticate() {
  		if (this.memberId) {
  			api.unicom.authenticate({
  			member_token: this.memberToken,
            deviceId: this.deviceId,
            mobile: this.mobile
	  		}).then(data => {
	  			$(".block").hide();
	  			if (data.body.obj) {
	  				let obj = JSON.parse(data.body.obj);
		  			if (obj && obj.status) {
		  				if (obj.status == "1") {
		  					$("#start").css("display", "block")
			  			} else if (obj.status == "2") {
			  				this.$toast("~认证成功~")
			  				$("#finish").css("display", "block")
			  			} else if (obj.status == "3") {
			  				$("#cannot").css("display", "block")
			  			}
		  			}
	  			} else {
	  				$("#cannot").css("display", "block")
	  			}
	  		})
  		} else {
  			utils.isLogin().then(data => {
  				this.memberId = data.member_id;
  				this.memberToken = data.member_token;
  				this.mobile = data.mobile;
  				window.CTJSBridge.LoadMethod('ExposeJsApi', 'getIMEI', '', {
		  			success: data => {
			        	this.deviceId = JSON.parse(data).IMEI
			        },
			        fail: () => {},
			        progress: () => {}
		  		})
  			})
  		}
  	},
  	getTraffic(ruleCode) {
  		if ($(".llitem-right a").hasClass("unicom-disabled")) {
  			if ($("#start")[0].style.cssText == "display: block;") {
  				this.$toast({position: "bottom", message: "~请开始认证，详见流量领取说明~"})
  			} else if ($(".llitem-right a").text() == "已领取") {
                this.$toast({position: "bottom", message: "~很遗憾，您已领取过该流量礼包~"});
            } else {
            	this.$toast({position: "bottom", message: "~很遗憾您不符合参与条件，详见流量领取说明~"})
            }
            return
  		}
  		api.unicom.realName({
  			memberId: this.memberId
  		}).then(data => {
  			if (data.body.obj) {
  				let obj = JSON.parse(data.body.obj);
	  			if (obj.realNameAuthType < 2) {
	  				this.$modal({
					    title: '提示',
					    content: '~您还没完成实名认证哦，完成认证可领取免费流量！~',
					    buttons: [{
					      text: '取消',
					      onClick: () => {
					        this.$toast('取消')
					      }
					    }, {
					      text: '确定',
					      onClick: () => {
					        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
					          pageId: 'authenticate'
					      	})
					      }
					    }]
					})
	                return;
            	}
            	api.unicom.getTraffic({
            		member_token: this.memberToken,
	                ruleCode: ruleCode,
	                mobile: this.mobile,
	                deviceId: this.deviceId
            	}).then(data => {
            		var current = this
            		if (data.body.obj) {
	            		this.$toast({
					        position: 'bottom',
					        message: "~领取成功~"
					    })
					   	setTimeout(function () {
					   		window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
					          pageId: 'mycoupon'
					      	})
					      	current.getTrafficList()
					   	}, 2000)
            		} else {
            			this.$toast({
					        position: 'bottom',
					        message: data.body.msg
					    })
            		}
            	})
            } else {
            	this.$modal({
				    title: '提示',
				    content: '~您还没完成实名认证哦，完成认证可领取免费流量！~',
				    buttons: [{
				      text: '取消',
				      onClick: () => {
				      }
				    }, {
				      text: '确定',
				      onClick: () => {
  						window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
				          pageId: 'authenticate'
				      	})
				      }
				    }]
				})
            }
  		})
  	}
  }
};
</script>
