<style lang="scss" src="./css/powerDetail.scss" scoped></style>
<template>
  <div class="new">
   	<div class="freedom-top">
        <div class="trilateral-up trilateral-adress"></div>
        <div class="interestsPic"><img :src="power.pic"/></div>
        <div class="freedom-name">
              {{power.title}}
            <div class="freedom-text">
              <div v-for="item in power.viceTitle">{{item}}</div ><br/>
            </div>
        </div>
    </div>
    <div class="freedom-details">
        <ul>
            <li>
                <p class="freedom-head">权益内容</p>

                <p class="font-color-ash2 font-size-miner">{{power.rightContent}}</p>
            </li>
            <li>
                <p class="freedom-head">权益备注</p>

                <p class="font-color-ash2 font-size-miner">{{power.condition}}</p>
            </li>
            <li id="count" style="display: none">
                <p class="freedom-head">权益数量</p>
                <p class="font-color-ash2 font-size-miner" v-if="power.rightCode == '004'">您目前还有<span class="font-color-red">0</span>张免费停车券</p>
                <p class="freedom-bottom-detail" v-if="power.rightCode == '012'">
                    您的积分是<label class="font-color-green">0</label>，根据活动规则，您尚有
                    <label class="freedom-red-font">0</label>次参与机会，目前您兑换剩余
                    <label class="freedom-red-font">0</label>次预约资格。
                </p>
            </li>
            <li id='con' style="display: none">
                查看历史兑换纪录
                <p class="fr"><i class="iconfont icon-enter "></i></p>
            </li>
        </ul>
    </div>
    <div class="freedom-details freedom-button">
        <a href="tel:4009008800" class="simple-password-buttom" v-if="power.rightCode == '009'">一键接通贵宾客服</a>
        <router-link :to="{path: '/applyShop/' + encodeURIComponent(JSON.stringify(power))}" class="simple-password-buttom" v-if="power.rightCode == '002'||power.rightCode == '004'||power.rightCode == '007'||power.rightCode == '008'">查看门店清单</router-link>
        <router-link :to="{path: '/integralExchange'}" class="simple-password-buttom" v-if="power.rightCode == '011'">合作商户积分互换</router-link>
        <a href="#" class="simple-password-buttom green-button" style="display:none"
           id="appointment">快速预约</a>
        <a href="#" class="simple-password-buttom green-button" style="display:none"
           id="vip" @click="getDate">立即预约</a>
        <button class="simple-password-buttom green-button" style="display:none"
                id="qualify" @click="checkQualify" data-role="none">立即参与
        </button>
    </div>
  </div>
</template>
<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'powerDetail',

  data() {
    return {
      memberId: '',
      memberToken: '',
      member_mobile: '',
    	power: {
        title: '',
        rightContent: '',
        pic: '',
        id: '',
        rightCode: '',
        viceTitle: [],
        memberLevels: '',
        condition: '',
        backColor: ''
      }
    }
  },
  created() {
    this.memberToken = utils.dbGet('userInfo').member_token
    this.memberId = utils.dbGet('userInfo').member_id
    this.member_mobile = utils.dbGet('userInfo').member_mobile
    console.log(this.memberToken)
  //	let powerId = this.$route.params.powerId
    let powerId = '011'
  	console.log(powerId)
  	api.getPowerDel(JSON.stringify({
    	'rightCode': powerId
    })).then(data => {
    	this.$loading.close()
      console.log("----powerId------" + data.body.obj)
    	if (data.body.obj) {
    	let obj = JSON.parse(data.body.obj)
    		let sub = '';
                if (obj.viceTitle) {
                    sub = obj.viceTitle.split("-");
                }
                this.power = {
                    title: obj.title,
                    rightContent: obj.rightContent,
                    pic: obj.mobileIco,
                    id: obj.id,
                    rightCode: obj.rightCode,
                    viceTitle: sub,
                    memberLevels: obj.memberLevels,
                    condition: obj.condition,
                    backColor: obj.backColor
                }
        console.log("------" + JSON.stringify(this.power))
        $(".freedom-top").css("background", this.power.backColor);
        if (this.power.rightCode == '004') {
            this.getCouponCount();
        }
        if (this.power.rightCode == '012') {
            this.checkQualify();
        }
        if (this.power.rightCode == '014') {
            this.getVip();
        }
    	} else {
    		this.$toast(data.body.msg)
    	}
    }, err => {
      console.log(err)
    })
  },
  actived() {
  	// 埋点
    try {
        sa.track('$pageview', {
          pageId: 'APP_' + this.power.title,
          categoryId: 'APP_User',
          $title: '权益详情_' + this.power.title
        })
      } catch (err) {
        console.log("sa error => " + err);
      }
  },
  methods: {
    getCouponCount() {
      api.getCouponCount(JSON.stringify({
            userToken: this.memberToken,
            couponType: 12,
            status: 0,
            pageNum: 1,
            pageSize: 1
        })).then(data => {
        this.$loading.close()
        console.log("----getCouponCount-----" + data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          $("#count").show().find("span").html(obj.count);
        }
      }, err => {
        console.log(err)
      })
    },
    checkQualify() {
      api.queryQualify(JSON.stringify({
        memberId: this.memberId,
        ruleCode: '20160624152997',
        channelId: '1'
      })).then(data => {
        this.$loading.close()
        console.log("-----checkQualify--" + data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          $("#count").find("label").eq(0).html(obj.memberPoint)
                $("#count").find("label").eq(1).html(obj.remainTimes)
                $("#count").find("label").eq(2).html(obj.usedTimes)
                $("#count").show();
                if (parseInt(obj.usedTimes) > 0) {
                    $("#appointment").show()
                    return
                }
                if (parseInt(obj.remainTimes) > 0) {
                    $("#qualify").show()
                } else {
                    $("#qualify").removeClass("green-button").attr("disabled", "disabled").show()
                }
        } else {
          this.$toast(data.body.msg)
        }
      }, err => {
        console.log(err)
      })
    },
    getVip() {
      api.queryQualify(JSON.stringify({
        memberId: this.memberId,
        ruleCode: '20161130166214',
        channelId: '1'
      })).then(data => {
        this.$loading.close()
        console.log("-----checkQualify--" + data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          if (parseInt(obj.usedTimes) > 0 || parseInt(obj.remainTimes) > 0) {
            $("#con").show()
            $("#vip").show()
            return
          }
          if (parseInt(obj.usedTimes) == 0 && parseInt(obj.remainTimes) == 0) {
            $("#con").show()
            $("#vip").show().attr("href", "javascript:void(0)").css("backgroundColor", "#ccc")
          }
        } else {
          this.$toast(data.body.msg)
        }
      }, err => {
        console.log(err)
      })
    },
    getDate() {
      api.checkActivity(JSON.stringify({
        ruleCode: '20161130166214',
        memberId: this.memberId,
        channelId: '1',
        mobile: this.member_mobile
      })).then(data => {
        console.log("-------getDate------" + data.body.obj)
        this.$loading.close()
        this.getVip()
      })
    }
  },
   // 控制路由跳转
  beforeRouteEnter (to, from, next) {
    utils.isLogin().then(user => {
      next()
    })
  }
}
</script>
