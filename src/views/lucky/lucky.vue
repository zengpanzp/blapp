<style lang="scss" src="./css/_lucky.scss" scoped></style>
<template>
	<div id="lucky">
		<div class="new main">
		    <div class="message">
		        <div class="txt" v-if="ruleId == 1"><i></i>每人一次，祝你好运~</div>
		        <div class="txt" v-else><i></i>今天还有 <span class="yellow">{{remainMaxNumUserDay}}</span> 次机会哟~~</div>
		    </div>
		    <div class="lottery-list">
		        <dl id="lottery">
		        	<dd class="lottery-unit lottery-unit-0"><img :src="showPic[0]"></dd>
					<dd class="lottery-unit lottery-unit-1"><img :src="showPic[1]"></dd>
					<dd class="lottery-unit lottery-unit-2"><img :src="showPic[2]"></dd>
					<dd class="lottery-unit lottery-unit-3"><img :src="showPic[3]"></dd>
					<dd class="lottery-unit lottery-unit-11"><img :src="showPic[11]"></dd>
					<dd class="lottery-unit lottery-unit-4"><img :src="showPic[4]"></dd>
					<dd class="lottery-unit lottery-unit-10"><img :src="showPic[10]"></dd>
					<dd class="lottery-unit lottery-unit-5"><img :src="showPic[5]"></dd>
					<dd class="lottery-unit lottery-unit-9"><img :src="showPic[9]"></dd>
					<dd class="lottery-unit lottery-unit-8"><img :src="showPic[8]"></dd>
					<dd class="lottery-unit lottery-unit-7"><img :src="showPic[7]"></dd>
					<dd class="lottery-unit lottery-unit-6"><img :src="showPic[6]"></dd>
					<dt id="lucky_ruler_start" @click="startLucky"><img :src="templateButtonPic"/></dt>
		        </dl>
		    </div>
		    <div class="ruler" v-if="rulerFlag">
		        <div class="line">
		            <div class="name">活动说明：</div>
		            <div class="txt" id="lucky_ruler_desc">{{drawDesc}}</div>
		        </div>
		        <div class="line">
		            <div class="name">活动时间：</div>
		            <div class="txt" id="locky_ruler_time">{{enableTimeFrom}} - {{enableTimeTo}}</div>
		        </div>
		    </div>
		</div>
		<div class="mask" v-if="maskFlag"></div>
		<div class="modal modal-out not-change" id="modal-success">
		    <div class="modal-close"></div>
		    <div class="modal-inner">
		        <div class="modal-title">哇，抽到了！</div>
		        <div class="modal-text">
		            <div class="modal-img">
		                <img src="./i/lucky-ok.png">
		            </div>
		            <p class="shake-text"><span class="color-red"></span></p>
		        </div>
		    </div>
		    <div class="modal-buttons shake-buttons">
		        <a class="modal-button active" data-role="none">关闭</a>
		        <a id="coupon" class="modal-button" data-role="none">我的优惠券</a>
		    </div>
		</div>
		<div class="modal modal-out not-change" id="modal-fail">
		    <div class="modal-close"></div>
		    <div class="modal-inner">
		        <div class="modal-title">啊哟，没有抽中~</div>
		        <div class="modal-text">
		            <div class="modal-img">
		                <img src="./i/lucky-bad.png">
		            </div>
		        </div>
		    </div>
		    <div class="modal-buttons shake-buttons">
		        <a class="modal-button active" data-role="none">关闭</a>
		    </div>
		</div>
		<div class="modal not-change" id="modal-error" :class="{ 'modal-in' : maskFlag , 'modal-out' : !maskFlag }">
		    <div class="modal-close" @click="closeMask"></div>
		    <div class="modal-inner">
		        <div class="modal-title">{{errorTitle}}</div>
		        <div class="modal-text">
		            <div class="modal-img">
		                <img src="./i/lucky-error.png">
		            </div>
		        </div>
		    </div>
		    <div class="modal-buttons shake-buttons" @click="closeMask">
		        <a class="modal-button active" data-role="none">关闭</a>
		    </div>
		</div>
	</div>
</template>

<script>
import api from './api/index'
import utils from 'src/utils'
export default {

  name: 'lucky',

  data () {
    return {
    	lottery: null,
    	click: false,
        remain: 1,
        ruleId: "",
        coupon: "",
        drawId: "4",
        isSigninFlag: '',
    	memberId: "",
    	memberToken: "",
    	templateButtonPic: "",
    	drawDesc: "",
    	enableTimeFrom: "",
    	enableTimeTo: "",
    	rulerFlag: false,
    	remainMaxNumUserDay: "",
    	maskFlag: false,
    	errorTitle: "",
    	showPic: []
    };
  },
  created() {
  	if (this.$route.params.ruleId && this.$route.params.ruleId != "null") {
  		this.ruleId = this.$route.params.ruleId
  	} else {
  		this.ruleId = "1"
  	}
  	if (this.$route.params.coupon && this.$route.params.coupon != "null") {
  		this.coupon = this.$route.params.coupon
  	}
  	if (this.$route.params.isSigninFlag && this.$route.params.isSigninFlag != "null") {
  		this.isSigninFlag = this.$route.params.isSigninFlag
  	}
  	if (this.ruleId != '1') {
  		try {
	        sa.track('$pageview', {
	          pageId: 'APP_抽奖页',
	          categoryId: 'APP_Choujiang',
	          $title: "APP_抽奖页_lucky"
	        })
	    } catch (err) {
	    	console.log("sa error => " + err);
	    }
  	}
  	utils.isLogin().then(data => {
    	this.memberId = data.member_id;
     	this.memberToken = data.member_token;
     	this.queryLuckySetting()
    })
  },
  methods: {
  	startLucky: function () {
  		try {
	        sa.track('$pageview', {
	          pageId: 'APP_抽奖页O2O',
	          categoryId: 'APP_Choujiang',
	          $title: "lucky-按钮"
	        })
	    } catch (err) {
	    	console.log("sa error => " + err);
	    }
	    if (this.click) {
            return;
        }
        this.lottery.speed = 100;
        this.click = true;
        this.getCoupon();
  	},
  	queryLuckySetting: function () {
  		let list = [];
  		let requestData = {
	  		userToken: this.memberToken,
	        channelId: "1"
	  	}
	  	if (this.isSigninFlag == 'Y') {
	        requestData.isSigninFlag = 'Y'
	    }
	    if (this.ruleId == '1') {
	        requestData.couponTemplateId = this.coupon.couponTemplateId;
	    } else {
	        requestData.drawId = this.ruleId;
	    }
  		api.queryLuckySetting(
  			JSON.stringify(requestData)
  		).then(data => {
  			this.$loading.close()
  			if (data.body.obj) {
  				let obj = JSON.parse(data.body.obj)
  				this.templateButtonPic = obj.templateButtonPic
  				for (let i = 0; i < obj.campDrawCoupons.length; i++) {
                	list.push(obj.campDrawCoupons[i])
                	this.showPic.push(list[i].showPic)
                    // list[parseInt(obj.campDrawCoupons[i].showWeight) - 1] = JSON.parse(JSON.stringify(obj.campDrawCoupons[i]));
                }
                if (this.ruleId != '1') {
                    this.remain = parseInt(obj.remainMaxNumUserDay);
                    this.remainMaxNumUserDay = obj.remainMaxNumUserDay
                }
  				$("#lucky").css({
                    "background": "url(" + obj.backPic + ")" + obj.backColor,
                    "background-size": "100%",
                    "background-position": "center bottom",
                    "background-repeat": "no-repeat"
                });
  				$("#lottery").css({
                    "background": "url(" + obj.templateBackPic + ") " + obj.templateBackColor,
                    "border-color": obj.templateBorderColor,
                    "background-size": "100%",
                    "background-repeat": "no-repeat"
                });
                document.title = obj.drawName
                window.CTJSBridge._setNativeTitle(obj.drawName);
                this.drawDesc = obj.drawDesc
  				this.enableTimeFrom = obj.enableTimeFrom
  				this.enableTimeTo = obj.enableTimeTo
  				this.rulerFlag = true
  				if (obj.remainMaxNumUser != 0 && obj.remainMaxNumUserDay == 0) {
                    this.maskFlag = true
                    this.errorTitle = "抽奖次数当天已用完"
                    return;
                }
                if (obj.remainMaxNumUser == 0) {
                    this.maskFlag = true
                    this.errorTitle = "抽奖总次数已用完"
                    return;
                }
                this.bindRoll();
  			} else {
  				this.maskFlag = true
  				this.errorTitle = data.body.msg
  			}
  		}, err => {
  			console.log(err)
  		})
  	},
  	getCoupon: function () {
  	},
  	closeMask: function () {
  		this.maskFlag = false
  	},
  	bindRoll: function () {
        // var current = this;
        this.lottery = {
            id: 'lottery',
            // 当前转动到哪个位置，起点位置
            index: -1,
            // 总共有多少个位置
            count: 0,
            // setTimeout的ID，用clearTimeout清除
            timer: 0,
            // 初始转动速度
            speed: 20,
            // 转动次数
            times: 0,
            // 转动基本次数：即至少需要转动多少次再进入抽奖环节
            cycle: 50,
            // 中奖位置
            prize: -1,
            init: function (id) {
                this.id = id;
                if ($("#" + id).find(".lottery-unit").length > 0) {
                    this.obj = $("#" + id);
                    // 获取有多少个奖品格子
                    this.count = this.obj.find(".lottery-unit").length;
                    this.obj.find(".lottery-unit-" + this.index).addClass("active");
                }
            },
            roll: function () {
                var index = this.index;
                var count = this.count;
                this.obj.find(".lottery-unit-" + index).removeClass("active");
                index += 1;
                if (index > count - 1) {
                    index = 0;
                }
                this.obj.find(".lottery-unit-" + index).addClass("active");
                this.index = index;
                return false;
            }
        };
        this.lottery.init("lottery");
    },
  	roll: function (coupon) {
        this.lottery.times += 1;
        this.lottery.roll();
        if (this.lottery.times > this.lottery.cycle + 10 && this.lottery.prize == this.lottery.index) {
            clearTimeout(this.lottery.timer);
            this.lottery.prize = -1;
            this.lottery.times = 0;
            this.click = false;
            // this.showCoupon(coupon);
            return false;
        }
        if (this.lottery.times < this.lottery.cycle) {
            this.lottery.speed -= 10;
        } else if (this.lottery.times == this.lottery.cycle) {
            if (coupon) {
                this.lottery.prize = parseInt(coupon.showWeight) - 1;
            } else {
                this.lottery.prize = parseInt(Math.random() * 11);
            }
        } else {
            if (this.lottery.times > (this.lottery.cycle + 10) && ((this.lottery.prize == 0 && this.lottery.index == 7) || this.lottery.prize == (this.lottery.index + 1))) {
                this.lottery.speed += 110;
            } else {
                this.lottery.speed += 20;
            }
        }
        if (this.lottery.speed < 40) {
            this.lottery.speed = 40;
        }
        var current = this;
        this.lottery.timer = setTimeout(function () {
            current.roll(coupon);
        }, this.lottery.speed);
    }
  }
};
</script>
