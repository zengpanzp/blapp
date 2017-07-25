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
                            <p
                             v-if="item.goodsColor||item.goodsStan">
                                <div v-if="item.goodsColor">颜色：<label>{{item.goodsColor}}</label></div>
                                <div v-if="item.goodsStan">规格：<label>{{item.goodsStan}}</label></div>
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
        <div class="proColor proColorPadding proColorBg corner-bottom return" id="serviceType" @click="userService">
            <span class="disAble"><a>退货</a></span>
            <span class="disAble"><a>换货</a></span>
            <span class="disAble"><a>维修</a></span>

            <div class="agreement" @click="goQuestion"><a>什么情况下不可以申请退换货？<i class="iconfont icon-enter"></i></a>
            </div>
        </div>

        <div class="columnTitle border corner-top">申请数量<label class="colorRed">*</label></div>
        <div class="proColor proColorPadding proColorBg corner-bottom return">
            <div class="proNum proNumMar">
                <a class="proAdd iconfont icon-minus" id="reduce"></a>
                <input type="number" class="proNumInput" value="1" id="returnCnt">
                <a class="proAdd iconfont icon-add" id="add"></a>
            </div>
            <label class="max">最大可提交数量为<b>{{returnData.maxNum}}</b>个</label>
        </div>
        <div class="columnTitle border corner-top">申请凭证<label class="colorRed">*</label></div>
        <div class="proColor proColorPadding proColorBg corner-bottom return" id="evidence">
            <div class="service-miner-box">
                <label class="cartCheckbox cartCheckboxOn"><svg class="icon"><use xlink:href="#icon-check"></use></svg></label>

                <div class="check-text">无发票</div>
                <label class="cartCheckbox"></label>

                <div class="check-text">有发票</div>
            </div>
        </div>
        <div class="columnTitle border corner-top">检测报告<label class="font-color-ash2">（无检测报告会影响售后进度）</label>
        </div>
        <div class="proColor proColorPadding proColorBg corner-bottom return" id="report">
            <div class="service-miner-box">
                <label class="cartCheckbox cartCheckboxOn"><svg class="icon"><use xlink:href="#icon-check"></use></svg></label>

                <div class="check-text">尚无检测报告</div>
                <label class="cartCheckbox"><i class="iconfont icon-selected"></i></label>

                <div class="check-text">已有监测报告</div>
            </div>
        </div>
        <div class="columnTitle border corner-top">退款方式<label class="colorRed">*</label></div>
        <div class="proColor proColorPadding proColorBg corner-bottom return bank" id="bank">
            <span class="disAble"><a>原支付返回</a></span>
            <span class="disAble"><a>其他银行卡</a></span>

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
            <ul id="reason">
                <li><a><label>请点击选择退货原因
                    <i class="iconfont icon-enter"></i></label>退货原因<span class="colorRed">*</span></a>
                </li>
            </ul>
        </div>

        <div class="columnTitle border corner-top">问题描述<label>(非必填)</label></div>
        <div class="ipt-b common-box r-case corner-bottom border1 return">
            <div class="return-desc corner">
                        <textarea class="fl textareaCon corner"
                                  placeholder="请描述您遇到的具体问题，将有助于客服人员更快的处理您的申请，最多140个字！"></textarea>
                <span>140</span>
            </div>
        </div>
        <div class="columnTitle border corner-top">上传图片凭证</div>
        <div class="uploadPic corner-bottom">
            <dd id="getPhoto"><a><i class="iconfont icon-add"></i></a></dd>
            <span id="inform" class="cue">
                如果上传商品为大家电，请上传序列号照片
            </span>

            <p>最多上传<span>3</span>张，每张不超过<span>5M</span>,支持jpg,BMP,Png</p>
        </div>
    </div>
    <div class="priceSelectCon">
        <div class="topHeader corner">
            <a class="cancel">取消</a>选择退货原因
        </div>
        <div class="priceSelect">
            <ul style="margin-top: 3rem">
                <li id="">
                    <a><i class="iconfont"></i></a>
                </li>
            </ul>
        </div>
        <div class="return"><a class="btn-1" id="priceOk">确认</a></div>
    </div>
    <footer>
        <div class="fixedMainbtn orderbtn orderbtnSize return">
            <a id="service" class="btn-sub">在线客服</a>
            <button type="submit" class="btn-1" id="nextStep" data-role="none" disabled>下一步</button>
        </div>
    </footer>
    <div class="plusMark" style="display: none"></div>
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
    	orderDetail: '',
    	orderNo: '',
      level: '',
    	address: '',
      returnData: {},
      list: []
    };
  },
  created() {
    this.memberId = utils.dbGet('userInfo').member_id
    this.level = utils.dbGet('userInfo').memberLevelCode
    console.log(this.level)
    let obj = {
    "orderNo": "LAE20170721138260",
    "orderDetail": "{\"tax\":\"0.17\",\"bgCateSid\":\"104230\",\"discountAmount\":\"0\",\"goodsCode\":\"333087\",\"goodsDetSid\":\"0789100001\",\"goodsName\":\"湾仔码头多菜多益玉米彩椒猪肉水饺\",\"goodsSid\":\"735022\",\"goodsType\":\"1\",\"goodsWeight\":\"0\",\"tariffRate\":\"0\",\"tariff\":\"0\",\"shopSid\":\"-1\",\"salePrice\":\"35.4\",\"merchantId\":\"-1\",\"orderDetailNo\":\"LAE201707211382600101\",\"oriPrice\":\"0\",\"picUrl\":\"http://img.st.iblimg.com/photo-1/2000/561581810_200x200.jpg\",\"purchaseType\":\"13\",\"isGift\":0,\"saleSum\":1,\"isCanReturn\":false,\"integral\":0,\"if7Refund\":0,\"allowReNum\":1}",
    "address": "{\"address\":\"上海市 市辖区 黄浦区 想考试考试考试就觉得\",\"receiver\":\"地级市\",\"phone\":\"13764318078\",\"provinceCode\":\"866\",\"cityCode\":\"867\",\"districtCode\":\"868\"}"
    }
		this.orderNo = obj.orderNo
		this.orderDetail = JSON.parse(obj.orderDetail)
		this.address = JSON.parse(obj.address)
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
          let obj = JSON.parse(data.body.obj)
          this.returnData.maxNum = obj.maxReturnQuantity
          this.returnData.payMethodList = obj.refundMethodList
          this.returnData.deliveryMethodList = obj.deliveryMethodList
          this.returnData.canReturn = obj.canReturn
          this.returnData.serviceTypeList = obj.serviceType ? obj.serviceType : []
          this.returnData.hasFreight = parseInt(obj.hasFreight)
          this.getRefundReason()
        }, err => {
          console.log(err)
        })
    },
    getRefundReason() {
      api.getReason({
        type: 'Customer_reason'
      }).then(data => {
        this.$loading.close()
        console.log("reason", data.body.obj)
        let obj = JSON.parse(data.body.obj)
        this.list = obj.list
      }, err => {
        console.log(err)
      })
    },
    userService() {
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
    goQuestion() {
      // let requestData = {url: "http://m.st.bl.com/h5-web/cms/viewCmsContent.html?pageId=571", title: "退换货说明"};
      // if (window.location.host == 'mh5.bl.com') {
      //     requestData = {url: "http://m.bl.com/h5-web/cms/viewHelpCmsContent.html?pageId=781", title: "退换货说明"};
      // }
      // 需要安卓和ios加方法
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
