<style lang="scss" src="./css/applyAftersale.scss" scoped></style>
<template>
<div class="new">
    <div class="main">
        <div class="payList corner combination-package" v-if="orderDetail.orderDetailList">
            <ul>
                <li class="package-top">
                    <div><span class="combination-logo">组合套餐</span>{{orderDetail.goodsName}}
                        <span class="combination-money">&#65509;{{Number(orderDetail.salePrice*orderDetail.saleSum)}}</span></div>
                    <div class="right-text">X{{orderDetail.saleSum}}</div>

                </li>
                <li v-for="item in orderDetail.orderDetailList">
                    <div class="combination-package-goods">
                        <div class="pic">
                            <div class="disInline"><img :src="item.picUrl"/></div>
                        </div>
                        <div class="package-goods-detail">
                            <p class="two-line-hide">{{item.goodsName}}</p>
                            <p v-if="item.goodsColor">
                              颜色：<label>{{item.goodsColor}}</label>
                            </p>
                            <p v-if="item.goodsStan">
                              规格：<label>{{item.goodsStan}}</label>
                            </p>
                        </div>
                        <div class="package-goods-num">
                          {{item.saleSum}}件/套
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="payList corner" v-else>
            <ul>
                <li class="payPic after-sale">
                    <a class="awrap">
                        <div class="pic"><img :src="orderDetail.picUrl"/></div>
                        <div class="goodsInfo goodsPadding">
                            {{orderDetail.goodsName}}<br/>
                            <p><span class="colorRed">&#65509;{{orderDetail.salePrice}}</span>
                                数量：{{orderDetail.saleSum}}</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
        <div class="columnTitle border corner-top">服务类型</div>
        <div class="proColor proColorPadding proColorBg corner-bottom return" id="serviceType">
            <span class="disAble" @click="userService"><a>退货</a></span>
            <span class="disAble" @click="userService"><a>换货</a></span>
            <span class="disAble" @click="userService"><a>维修</a></span>

            <div class="agreement" @click="goQuestion"><a>什么情况下不可以申请退换货<i class="iconfont arrow-back tran-right"></i></a>
            </div>
        </div>
        <div class="columnTitle border corner-top">申请数量<label class="colorRed">*</label></div>
        <div class="proColor  proColorBg corner-bottom  applyNum">
            <div class="proNum proNumMar">
                <a class="proAdd " @click="isCan && reduce()">-</a>
                <input type="number" class="proNumInput" v-model="returnCnt"/>
                <a class="proAdd " @click="isCan && add()">+</a>
            </div>
            <label class="max">最大可提交数量为<b>{{maxReturnQuantity}}</b>个</label>
        </div>
        <div class="columnTitle border corner-top">申请凭证<label class="colorRed">*</label></div>
        <div class="checkbox-box" id="checkBox">
          <div class="check-item">
            <label class="check-label">
              <input class="check-iput" type="radio" v-model="picked" value="true" />
              <div class="flex-m">
                <svg class="icon">
                  <use xlink:href="#icon-check"></use>
                </svg>
                <div>无发票</div>
              </div>
            </label>
          </div>
          <div class="check-item">
            <label class="check-label">
              <input class="check-iput" type="radio" v-model="picked" value="false" />
              <div class="flex-m">
                <svg class="icon">
                  <use xlink:href="#icon-check"></use>
                </svg>
                <div>有发票</div>
              </div>
            </label>
          </div>
        </div>
        <div class="columnTitle border corner-top">检测报告<label class="font-color-ash2">（无检测报告会影响售后进度）</label>
        </div>
        <div class="checkbox-box" id="checkBox">
          <div class="check-item">
            <label class="check-label">
              <input class="check-iput" type="radio" v-model="check" value="false" />
              <div class="flex-m">
                <svg class="icon">
                  <use xlink:href="#icon-check"></use>
                </svg>
                <div>尚无检测报告</div>
              </div>
            </label>
          </div>
          <div class="check-item">
            <label class="check-label">
              <input class="check-iput" type="radio" v-model="check" value="true" />
              <div class="flex-m">
                <svg class="icon">
                  <use xlink:href="#icon-check"></use>
                </svg>
                <div>已有监测报告</div>
              </div>
            </label>
          </div>
        </div>
        <div class="columnTitle border corner-top">退款方式<label class="colorRed">*</label></div>
        <div class="proColor proColorPadding proColorBg corner-bottom return bank" id="bank">
            <span class="disAble" @click="bank"><a>原支付返回</a></span>
            <span class="disAble" @click="bank"><a>其他银行卡</a></span>

            <div class="service-miner-box font-color-ash2 bank" style="display: none">
                收款人姓名<i class="iconfont icon-enter"></i>
            </div>
            <div class="service-miner-box font-color-ash2 bank" style="display: none">
                收款人储蓄卡号<i class="iconfont icon-enter"></i>
            </div>
            <div class="service-miner-box font-color-ash2 bank" style="display: none">
                开户行<i class="iconfont icon-enter"></i>
            </div>
            <div class="font-color-ash2 font-size-miner" style="display: none">
                如为银行卡、百联积点卡、百联会员卡支付支持原路返回；如积点卡丢失，请联系客服4009008800。
            </div>
            <div class="font-color-ash2 font-size-miner" style="display: none">
                仅支持现金
            </div>
        </div>
        <div class="payList corner">
            <ul id="reason" @click="isCan && seeReason()">
                <li><a><label>{{ defaultValue ? trueList : '请点击选择退货原因'}}
                    <i class="iconfont arrow-back tran-con"></i></label>退货原因<span class="colorRed">*</span></a>
                </li>
            </ul>
        </div>
        <bl-slide-bar :showModal="reason"
              @modalChange="reason = $event"
              :list="list"
              v-model="defaultValue"
              title="选择退货原因"></bl-slide-bar>
        <div class="columnTitle border corner-top">问题描述<label>(非必填)</label></div>
        <div class="ipt-b common-box r-case corner-bottom border1 return">
            <div class="return-desc corner">
                        <textarea class="fl textareaCon corner"
                        placeholder="请描述您遇到的具体问题，将有助于客服人员更快的处理您的申请，最多140个字！" v-model="question" maxlength="140" :disabled="!isCan">
                        </textarea>
                <span>140</span>
            </div>
        </div>
        <bl-upload ref="upload" commentType="afterSale" maxLength="3"></bl-upload>
    </div>
    <footer>
        <div class="fixedMainbtn orderbtn orderbtnSize return">
            <a id="service" class="btn-sub" @click="service">在线客服</a>
            <button type="submit" class="btn-1" :class="{'btn': isCan}" @click="nextStep" data-role="none" :disabled="!isCan">下一步</button>
        </div>
    </footer>
</div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'applyAftersale',

  data () {
    return {
      memberId: '',
      picked: true,
      check: false,
      orderDetail: '',
      orderNo: '',
      inlineLoading: null,
      level: '',
      address: '',
      list: [],
      requestData: null,
      returnCnt: 1,
      maxReturnQuantity: '',
      canReturn: '',
      isCan: true,
      reason: false,
      defaultValue: '',
      question: '',
      reasonCode: '',
      serType: [],
      payMethodList: []
    };
  },
  created() {
     this.memberId = utils.dbGet('userInfo').member_id
    this.level = utils.dbGet('userInfo').memberLevelCode
    console.log(this.level)
    let data = {
     "orderNo": "LPE20170713137427", "orderDetail": "{\"tax\":\"0.17\",\"bgCateSid\":\"102892\",\"discountAmount\":\"0\",\"goodsCode\":\"81958\",\"goodsDetSid\":\"0611880001\",\"goodsName\":\"三和四美 糟方腐乳 500g\",\"goodsSid\":\"271091\",\"goodsStan\":\"500g\",\"goodsType\":\"1\",\"goodsWeight\":\"0.5\",\"tariffRate\":\"0\",\"tariff\":\"0\",\"shopSid\":\"-1\",\"salePrice\":\"7.3\",\"merchantId\":\"-1\",\"orderDetailNo\":\"LPE201707131374270101\",\"oriPrice\":\"8.03\",\"purchaseType\":\"0\",\"isGift\":0,\"saleSum\":1,\"isCanReturn\":false,\"integral\":0,\"if7Refund\":0,\"allowReNum\":1}", "address": "{\"address\":\"上海市 市辖区 黄浦区 四川南路26号\",\"receiver\":\"怎胖\",\"phone\":\"18679475831\",\"provinceCode\":\"866\",\"cityCode\":\"867\",\"districtCode\":\"868\"}"
    }
    console.log(data)
    this.orderNo = data.orderNo
    this.orderDetail = JSON.parse(data.orderDetail)
    this.address = JSON.parse(data.address)
    console.log(this.address)
    this.checkReturn()
  },
  methods: {
    checkReturn() {
        api.checkRtn({
          orderNo: this.orderNo,
          orderDetailNo: this.orderDetail.orderDetailNo,
          memberId: this.memberId
        }).then(data => {
          this.$loading.close()
          console.log("zpzpzpzpz", data.body.obj)
          if (data.body.obj) {
            let resData = JSON.parse(data.body.obj)
            this.requestData = resData
            this.maxReturnQuantity = resData.maxReturnQuantity
            this.canReturn = resData.canReturn
            this.serType = resData.serviceType
            if (resData.payMethodList) {
              this.payMethodList = resData.payMethodList
            }
            this.getRefundReason()
          } else {
            this.$toast(data.body.msg)
          }
        }, err => {
          console.log(err)
        })
    },
    bank(event) {

    },
    getRefundReason() {
      api.getReason({
        type: 'Customer_reason'
      }).then(data => {
        this.$loading.close()
        console.log("reason", data.body.obj)
        let obj = JSON.parse(data.body.obj)
        let list = []
        for (let item of obj.list) {
          list.push({
            value: item.value,
            label: item.label
          })
        }
        this.list = list
        if (this.maxReturnQuantity == 0 || this.canReturn != 1) {
              this.isCan = false
              return
        }
        for (let i = 0; i < this.serType.length; i++) {
            let index = parseInt(this.serType[i]) - 1
            this.$nextTick(() => {
              $("#serviceType span").eq(index).removeClass("disAble")
            })
        }

        for (let i = 0; i < this.payMethodList.length; i++) {
            let index = parseInt(this.payMethodList[i]) - 1;
            this.$nextTick(() => {
              $("#bank span").eq(index).removeClass("disAble")
              if (index == 1) {
                  $("#bank").find(".bank").slideDown()
              }
            })
          }
      }, err => {
        console.log(err)
      })
    },
    service() {
      // let vip = 0
      // if (this.level == 40) {
      //   vip = 1
      // }
      // let u = navigator.userAgent
      // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      // let isiOS = !!u.match(/\(i[^]+( U)? CPU.+Mac OS X/) // ios终端
      // if (isAndroid) {

      // } else {

      // }
    },
    userService(ev) {
      console.log("#fadfdf", ev.target.innerText)
    },
    goQuestion() {
      // let requestData = {url: "http://m.st.bl.com/h5-web/cms/viewCmsContent.html?pageId=571", title: "退换货说明"};
      // if (window.location.host == 'mh5.bl.com') {
      //     requestData = {url: "http://m.bl.com/h5-web/cms/viewHelpCmsContent.html?pageId=781", title: "退换货说明"};
      // }
      // 需要安卓和ios加方法
    },
    reduce() {
      if (this.maxReturnQuantity == 0) {
        this.$toast('此商品已提交申请售后服务')
      }
      if (this.returnCnt <= 1) {
        this.returnCnt = 1
        this.$toast('数量不可为0')
      }
    },
    add() {
      if (this.maxReturnQuantity == 0) {
        this.$toast('此商品已提交申请售后服务')
      }
      if (this.returnCnt >= this.maxReturnQuantity) {
        this.$toast('该商品限购' + this.maxReturnQuantity + '件')
      }
    },
    seeReason() {
      this.reason = true
    },
    nextStep() {
      if (this.trueList && this.trueList.indexOf('照片') != -1 && this.$refs.upload.upload.length == 0) {
          this.$modal({
            content: '当前退货原因需上传至少一张图片凭证'
          })
          return
      }
      console.log("nextStep", JSON.stringify(this.$refs.upload.upload))
      let picList = this.$refs.upload.upload
      let url = ''
      for (let i = 0; i < picList.length; i++) {
        if (picList.length != 0) {
          url += picList[i].cephUrl + ','
        }
      }
      let req = {
        orderNo: this.orderNo,
        orderDetailNo: this.orderDetail.orderDetailNo,
        memberId: this.memberId,
        returnQuantity: this.returnCnt,
        applyCertificate: this.picked == true ? 0 : 1,
        testReport: this.check == true ? 0 : 1,
        refundMethodCode: "",
        refundMethodName: "",
        accountName: "",
        bankName: "",
        accountNo: "",
        reasonCode: this.defaultValue,
        reasonName: this.trueList,
        reasonDesc: this.question,
        reasonImageList: url,
        reasonImageListCephUrl: url,
        deliveryMethodCode: "",
        deliveryMethodName: "",
        contactPhone: "",
        contactPeople: "",
        state: "",
        city: "",
        district: "",
        detailAddr: "",
        zipCode: "",
        deliveryDate: ""
      }
      this.$router.push({
        name: 'selectReturnMethod',
        params: {
          obj: encodeURIComponent(JSON.stringify(req))
        }
      })
    }
  },
  computed: {
    trueList() {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].value == this.defaultValue) {
          return this.list[i].label
        }
      }
    }
  },
  // 路由取memberId
  beforeRouteEnter (to, from, next) {
    utils.isLogin().then(user => {
      console.log("ppppp", user)
      next()
    })
  }
};
</script>
