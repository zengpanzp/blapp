<style lang="scss" src="./css/integralExchange.scss" scoped></style>
<template>
<div>
    <div class="credit-exchange">
      <div class="goods-box" v-infinite-scroll="getAllShop" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="row-box" v-for="(item,index) in list" :id="item.index">
          <div class="credit-shop vtt">
              <img v-lazy="{src: item.logo}"/>
              <div class="tied-account tac bind" @click="action" v-if="item.isBind == ''"><a>绑定账户</a></div>
          </div>
          <div class="credit-account">
              <div class="credit-a1"><span class="c-active">账户号:</span>{{item.thirdId}}</div>
              <div class="credit-a2">{{item.out.pointRate}}个百联通积分 =
                  {{item.out.pointRateThird}}个{{item.name}}积分
              </div>
              <div class="credit-a3">
                  <button class="credit-btn color-out" @click="action" :class="{'bind':item.isBind != ''}" data-role="none"
                :disabled="!item.canOut">换出积分
                  <span class="credit-smallspan">手续费{{item.out.fee}}%</span>
                  </button>
                  <button class="credit-btn color-in" @click="action" :class="{'bind':item.isBind != ''}" data-role="none"
                  :disabled="!item.canIn">换入积分
                  <span class="credit-smallspan">手续费{{item.in.fee}}%</span>
                  </button>
              </div>
          </div>
        </div>
    </div>
    </div>
</div>
</template>
<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'integralExchange',

  data () {
    return {
      memberToken: '',
      memberId: '',
      pageNo: '',
      busy: false,
      list: [],
      merchantList: [],
      index: 0,
      curNo: 0
    };
  },
  created() {
    // 埋点
    try {
      console.log((new Date()).toLocaleString() + 'APP_合作商户积分互换页')
      sa.track('$pageview', {
        pageId: 'APP_合作商户积分互换页',
        categoryId: 'APP_User',
        $title: '合作商户积分互换页'
      });
    } catch (err) {
      console.log("sa error => " + err);
    }
  	this.memberToken = utils.dbGet('userInfo').member_token
    this.memberId = utils.dbGet('userInfo').member_id
  },
  methods: {
    getAllShop() {
      this.busy = true
      api.queryAllShop(JSON.stringify({
        merchantTypeCode: '0001',
        memberToken: this.memberToken,
        pageSize: '10',
        channelId: '1',
        'appOpenChFlag': '1',
        currentPage: String(this.curNo + 1)
      })).then(data => {
        this.$loading.close()
        console.log("##########", data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          this.pageNo = obj.pages
          if (obj.list) {
            this.busy = false
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
                this.list = this.list.concat(merchant)
                this.merchantList = this.merchantList.concat(merchant)
            }
            if (obj.list.length < 10) {
              this.busy = true
            }
          }
        }
      }, err => {
        console.log(err)
      })
    },
    action($event) {
      let index = parseInt($($event.currentTarget).parents(".row-box").attr("id"))
      console.log("下标:" + index)
      let mercha = this.merchantList[index]
      console.log(JSON.stringify(this.merchantList[index]))
      let dom = $($event.currentTarget)
      api.memberRNAuthDetail(JSON.stringify({
        memberId: this.memberId
      })).then(data => {
        this.$loading.close()
        console.log("---action---", data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          if (obj) {
            let path = 'exchangePoint/' + index + '/'
            if (dom.hasClass('bind')) {
              this.getBindParam(mercha)
            } else if (dom.hasClass("color-out") && obj.realNameAuthType >= 2) {
              path += 'out'
              this.$router.push({path: path})
            } else if (dom.hasClass("color-out") && obj.realNameAuthType < 2) {
              // 跳实名认证
            } else if (dom.hasClass("color-in")) {
              path += 'in'
              this.$router.push({path: path})
            } else if (dom.hasClass("unbind")) {
              // 跳验证
              this.$router.push({path: ''})
            }
          }
        }
      }, err => {
        console.log(err)
        let path = 'exchangePoint/' + index + '/'
        if (dom.hasClass("bind")) {
          this.getBindParam(mercha);
        } else if (dom.hasClass("color-in")) {
          path += 'in';
          this.$router.push({path: path})
        } else if (dom.hasClass("color-out")) {
          // 跳实名认证
        } else if (dom.hasClass("unbind")) {
          // 跳验证
          this.$router.push({path: ''})
        }
      })
    },
    getBindParam(message) {
      api.getBind(JSON.stringify({
        member_token: this.memberToken,
        third_party_id_type: message.type
      })).then(data => {
        this.$loading.close()
        console.log("pppp", data)
        if (data.body.obj) {
          // let obj = JSON.parse(data.body.obj)
          // let url = message.bindURL + "?" + obj.bindParameters + "&callback=" + encodeURIComponent("bindThirdPartySuccess") + "&type=" + message.type
          // let requestData = {pageUrl: url, pageTitle: message.name + "自助绑卡服务"};
          let u = navigator.userAgent
          let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
          if (isAndroid) {
          } else {
          }
        } else {
          this.$toast(data.body.msg)
        }
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
