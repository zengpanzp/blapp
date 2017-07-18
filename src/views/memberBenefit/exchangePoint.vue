<style lang="scss" src="./css/exchangePoint.scss" scoped></style>
<template>
<div class="new">
    <div class="change-score">
        <div class="score-remain">
            <img src="./i/bailiantong.png"/>
            积分余额 <label class="own">0</label>
        </div>
        <div class="score-input">
            <label>兑{{title}}百联通积分</label>
            <input type="tel" data-role="none" :value="listItem.min" readonly/>
        </div>
        <div class="score-compute">
            <span>{{list.name}}积分余额<label class="third">0</label><br/>
			      <div v-if="type == 'out'">将增加<label class="add">0</label>个{{list.name}}积分，以及扣除转换手续费<label class="fee">0</label>个百联通积分</div>
            <div v-if="type == 'in'">将增加<label class="add">0</label>个百联通积分，以及扣除转换手续费<label class="fee">0</label>个{{list.name}}积分</div>
            </span>
        </div>
        <div class="commit-change">
            <button type="submit" v-if="type == 'out'" class="simple-password-buttom corner background-color-red" disabled>
                确认增加<span class="add">0</span>个{{list.name}}积分
            </button>
            <button type="submit" v-if="type == 'in'" class="simple-password-buttom corner background-color-red" disabled>
                确认增加<span class="add">0</span>个百联通积分
            </button>
        </div>
        <div class="score-compute">
 			<span style="white-space: pre-line;">兑换规则：<br/>
      {{listItem.des}}
 			</span>
        </div>
    </div>
    <div class="plusMark" style="display: none"></div>
    <div class="change-score-config" style="bottom: -100%">
        <div class="config-top">
            <label>确认互换信息</label><img id="close" src="./i/icon_close.png"/>
        </div>
        <div class="config-detail">
            <div class="account-show">
                <span>转出账号</span>
                <div class="account-log" v-if="type == 'out'"><img src="./i/jf-bailianlogo.png"/></div>
                <span v-if="type == 'out'"><label class="reduce"></label>百联通积分</span>
                <div class="account-log" v-if="type == 'in'"><img :src="list.logo"/></div>
                <span v-if="type == 'in'"><label class="reduce"></label></span>
            </div>
            <div class="account-show">
                <span style="opacity: 0">转出账号</span>

                <div class="move-direction"><img src="./i/move-down.png"/></div>
            </div>
            <div class="account-show">
                <span>转入账号</span>
                <div class="account-log" v-if="type == 'out'"><img src="list.logo"/></div>
                <span v-if="type == 'out'"><label class="add"></label>积分</span>
                <div class="account-log" v-if="type == 'in'"><img src="./i/jf-bailianlogo.png"/></div>
                <span v-if="type == 'in'"><label class="add"></label>百联通积分</span>
            </div>
        </div>
        <a class="config-bottom">确认</a>
    </div>
</div>

</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'exchangePoint',

  data () {
    return {
        type: 'out',
        index: 0,
        title: '',
        curNo: 1,
        pageNo: '',
        list: {},
        merchantList: [],
        listItem: {}
    };
  },
  created() {
    this.memberToken = utils.dbGet('userInfo').member_token
    this.memberId = utils.dbGet('userInfo').member_id
    this.getAllShop()
  },
  methods: {
    getAllShop() {
      api.queryAllShop(JSON.stringify({
        merchantTypeCode: '0001',
        memberToken: this.memberToken,
        pageSize: '10',
        channelId: '1',
        'appOpenChFlag': '1',
        currentPage: String(this.curNo)
      })).then(data => {
        this.$loading.close()
        console.log("###", data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          this.pageNo = obj.pages
          if (obj.list) {
            for (let i = 0; i < obj.list.length; i++) {
                let merchant = {
                    id: String(obj.list[i].id),
                    index: this.index,
                    name: obj.list[i].merchantName,
                    type: obj.list[i].merchantCode,
                    logo: obj.list[i].merchantLogo,
                    isBind: obj.list[i].isBind == '01',
                    bindURL: obj.list[i].appBindURL,
                    thirdId: obj.list[i].third_party_id ? String(obj.list[i].third_party_id) : '',
                    canOut: obj.list[i].isExchangeOut == '01',
                    canIn: obj.list[i].isExchangeIn == '01',
                    out: {},
                    in: {}
                }
                if (obj.list[i].mriPointsExchangeRuleOut) {
                    merchant.out = {
                        id: String(obj.list[i].mriPointsExchangeRuleOut.id),
                        code: String(obj.list[i].mriPointsExchangeRuleOut.ruleCode),
                        bizType: String(obj.list[i].mriPointsExchangeRuleOut.businessType),
                        pointRate: parseInt(obj.list[i].mriPointsExchangeRuleOut.pointRate),
                        pointRateThird: parseInt(obj.list[i].mriPointsExchangeRuleOut.pointRateThird),
                        min: parseInt(obj.list[i].mriPointsExchangeRuleOut.exchangeStart),
                        per: parseInt(obj.list[i].mriPointsExchangeRuleOut.exchangeAddMin),
                        max: parseInt(obj.list[i].mriPointsExchangeRuleOut.exchangeLimitPoints),
                        fee: parseInt(obj.list[i].mriPointsExchangeRuleOut.exchangeCharges),
                        limitTime: obj.list[i].mriPointsExchangeRuleOut.exchangeLimitTime,
                        des: obj.list[i].mriPointsExchangeRuleOut.ruleDesc
                    }
                    merchant.out.rate = parseFloat(merchant.out.pointRateThird / merchant.out.pointRate)
                }
                if (obj.list[i].mriPointsExchangeRuleIn) {
                    merchant.in = {
                        id: obj.list[i].mriPointsExchangeRuleIn.id,
                        code: String(obj.list[i].mriPointsExchangeRuleIn.ruleCode),
                        bizType: String(obj.list[i].mriPointsExchangeRuleIn.businessType),
                        pointRate: parseInt(obj.list[i].mriPointsExchangeRuleIn.pointRate),
                        pointRateThird: parseInt(obj.list[i].mriPointsExchangeRuleIn.pointRateThird),
                        min: parseInt(obj.list[i].mriPointsExchangeRuleIn.exchangeStart),
                        per: parseInt(obj.list[i].mriPointsExchangeRuleIn.exchangeAddMin),
                        max: parseInt(obj.list[i].mriPointsExchangeRuleIn.exchangeLimitPoints),
                        fee: parseInt(obj.list[i].mriPointsExchangeRuleIn.exchangeCharges),
                        limitTime: obj.list[i].mriPointsExchangeRuleIn.exchangeLimitTime,
                        des: obj.list[i].mriPointsExchangeRuleIn.ruleDesc
                    }
                    merchant.in.rate = parseFloat(merchant.in.pointRateThird / merchant.in.pointRate)
                }
                this.index++
                this.merchantList = this.merchantList.concat(merchant)
            }
            this.$route.params.index = 1
            this.$route.params.type = 'out'
            this.index = parseInt(this.$route.params.index)
            this.type = this.$route.params.type
            this.list = this.merchantList[this.index]
            console.log("eeeeeeeee", JSON.stringify(this.list))
            this.listItem = this.list[this.type]
            this.title = '积分换' + this.type == 'out' ? '出' : '入'
            window.CTJSBridge && window.CTJSBridge._setNativeTitle(this.title)
            this.getAvailable()
          }
        }
      }, err => {
        console.log(err)
      })
    },
    getAvailable() {
      api.getThirdPoint(JSON.stringify({
        blMemberId: this.merchantList[this.index].thirdId,
        memberId: this.memberId,
        merchantCode: this.merchantList[this.index].type
      })).then(data => {
        this.$loading.close()
        console.log("ddddddddddd", data)
      }, err => {
        console.log(err)
      })
    },
    getPoint() {
      api.getPointDel(JSON.stringify({
        member_token: this.memberToken
      })).then(data => {
        this.$loading.close()
      }, err => {
        console.log(err)
      })
    }
  },
  // 控制路由跳转
  beforeRouteEnter (to, from, next) {
    utils.isLogin().then(user => {
    next()
    })
  }
};
</script>

<style lang="css" scoped>
</style>
