<style lang="scss" src="./css/afterSaleDetail.scss" scoped></style>
<template>
<div class="new">
        <div class="service-manage-head corner">
            <ul>
                <li>
                    <label>售后编号</label>
                    <div>{{returnOrder.returnNo}}</div>
                </li>
                <li>
                    <label>申请时间</label>
                    <div>{{returnOrder.applyTime}}</div>
                </li>
                <li>
                    <label>售后状态</label>
                    <p class="sercice-status">{{statusName}}</p>
                </li>
                <li class="manage-head-detail">
                    说明：{{returnOrder.statusDesc}}
                </li>
                <li>
                    <label>更新时间</label>
                    <div>{{returnOrder.updateTime}}</div>
                </li>
            </ul>
        </div>
        <div class="sell-service corner" v-if="returnOrder.returnHistory">
            <ul>
                <li>
                <router-link :to="{path: '/returnHistoryPage/' + returnOrder.returnNo + '/' + returnOrder.returnHistory}" class="go">
                  <div>查看售后处理进度
                      <i class="quickhome-adresstele iconfont icon-enter font-color-ash2"></i>
                  </div>
                </router-link>
                </li>
                <li v-if="returnOrder.moneyTime.length > 0 && config[1]">
                    <div>
                        <ul class="back-schedule">
                            <li>
                                <div class="infeed-circle">
                                    <div></div>
                                </div>
                                <div class="schedule-circle-show">
                                    <div class="schedule-line"></div>
                                    <div class="schedule-line need"></div>
                                </div>
                                <div class="schedule-text-show" v-if="wait"><label>待退款</label>
                                    <br>
                                    {{wait.date}}
                                    <br>
                                    {{wait.time}}
                                </div>
                            </li>
                            <li>
                                <div class="infeed-circle">
                                    <div></div>
                                </div>
                                <div class="schedule-circle-show">

                                    <div class="schedule-line need"></div>
                                    <div class="schedule-line need"></div>
                                </div>
                                <div class="schedule-text-show" v-if="time"><label>退款中</label>
                                    <br>
                                    {{midle.date}}
                                    <br>
                                    {{midle.time}}
                                </div>
                            </li>
                            <li>
                                <div class="infeed-circle">
                                    <div></div>
                                </div>
                                <div class="schedule-circle-show">
                                    <div class="schedule-line need"></div>
                                    <div class="schedule-line"></div>
                                </div>
                                <div class="schedule-text-show" v-if="succ"><label>退款成功</label>
                                    <br>
                                    {{succ.date}}
                                    <br>
                                    {{succ.time}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="sell-service corner" v-if="message">
            <ul @click="goGoodsList(returnOrder.items)">
                <li>
                    <div>售后商品<a class="quickhome-adresstele"><span class="font-color-ash2">查看所有商品</span>
                        <i class="iconfont icon-enter font-color-ash2"></i></a></div>

                </li>
                <li class="sell-service-listmiddle">
                    <a>
                        <div class="pic service-goods-money"><img :src="message.goodsImage"/>
                        </div>
                        <div>
                            <div class="manage-goods-num">x{{message.returnQuantity}}</div>
                            <div class="service-manage-goods">{{message.goodsName}}</div>
                        </div>
                        <p class="service-goods-num"><label class="service-goods-money font-color-red">售后原因：{{message.returnReasonName}}
                            </label>
                        </p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="sell-service corner">
            <ul>
                <li class="link-detail">
                    <label class="font-color-ash2">售后类型</label>

                    <div class="font-color-ash1">{{returnOrder.serviceType}}</div>
                </li>
                <li class="link-detail">
                    <label class="font-color-ash2">问题描述</label>

                    <div class="font-color-ash1">{{returnOrder.returnReasonDesc}}</div>
                </li>
                <li class="link-detail">
                    <label class="font-color-ash2">退款方式</label>

                    <div class="font-color-ash1">{{returnOrder.refundMethodName}}</div>
                </li>
                <li class="link-detail back-money">
                    <label class="font-color-ash2 ">退款金额</label>

                    <div class="font-color-black"><span>{{returnOrder.refundAmount}}</span>元</div>
                </li>
            </ul>
        </div>
        <div v-if="returnOrder.statusCode == '2001'||pic.length != 0">
        <div class="columnTitle border return corner-top">图片凭证<span id="edit" style="display: none">编辑</span></div>
        <div class="uploadPic corner-bottom">
            <!-- <dd id="getPhoto" style="display: none"><a><i class="iconfont icon-add"></i></a></dd>
            <p id="tip" style="display: none">最多上传<span>3</span>张，每张不超过<span>5M</span>,支持jpg,BMP,Png</p> -->
            <p class="emptyPic" v-if="pic.length == 0">暂无图片</p>
        </div>
        </div>
        <div class="sell-service corner" id="storeAddress" v-if="returnOrder.deliveryMethod != 2 &&config[2]">
            <ul>
                <li class="link-detail">
                    <label>退回地址</label>
                    <div>{{store.address}}</div>
                </li>
            </ul>
        </div>
        <div class="sell-service corner delivery" v-if="returnOrder.deliveryMethod == 1 &&config[2]">
            <ul>
                <li class="link-detail">
                    <label>物流单号</label>
                    <div v-if="returnOrder.deliveryCompany">
                      {{returnOrder.deliveryCompany}}&nbsp;{{returnOrder.deliveryNo}}
                    </div>
                    <div v-else>
                        尚未有物流单号，请填写<i class="iconfont icon-enter quickhome-adresstele"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="payList return-pickup corner" id="pickup"  v-if="returnOrder.deliveryMethod == 2 &&config[3]">
            <ul v-if="buy">
                <li><p>取件信息</p></li>
                <li><p>取件时间：<span class="fr">{{buy.time}}</span></p></li>
            </ul>
            <div class="addressCon">
                <b class="iconfont icon-address"></b>
                <ul>
                    <li v-if="buy"><span class="fr">{{buy.phone}}</span><label>联系人：</label>{{buy.name}}
                    </li>
                    <li v-if="buy"><label>上门取货地址：</label>
                        <p>{{buy.address}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="payList return-receive corner" v-if="config[4]">
            <ul>
                <li><p>收货地址</p></li>
            </ul>
            <div class="addressCon">
                <b class="iconfont icon-address"></b>
                <ul v-if="buy">
                    <li><span class="fr">{{buy.phone}}</span><label>联系人：</label>{{buy.name}}
                    </li>
                    <li><label>地址：</label>
                        <p>{{buy.address}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sell-service corner" v-if="config[4]">
            <ul>
                <li class="link-detail">
                    <label>物流单号</label>
                    <div>{{store.deliveryCompany}}&nbsp;{{store.deliveryNo}}</div>
                </li>
                .
            </ul>
        </div>
    <div class="btnBox">
        <div class="btnFix">
            <a  class="con" @click="serviceForbl(returnNo)">
              <div class="servicePic"><img src="./i/service.png"/></div>
            联系客服
            </a>
            <a href="#" class="btn-sub" @click="goDel(returnOrder.orderNo)">订单详细</a>
            <a href="tel:4009008800" class="btn-sub" v-if="config[5]">
                致电客服
            </a>
            <a class="btn-1 delivery" @click="getInformation" v-if="config[7]">填写发货信息</a>
            <a @click="cancel(returnNo)" class="btn-sub" v-if="config[6]">取消申请</a>
        </div>
    </div>
</div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'afterSaleDetail',

  data () {
    return {
        returnNo: '',
        statusName: '',
        memberId: '',
        returnOrder: {},
        config: {},
        midle: '',
        wait: '',
        succ: '',
        message: {},
        pic: [],
        store: {},
        buy: {},
        version: '',
        level: '',
        picture: ''
    };
  },
  created() {
    this.memberId = utils.dbGet('userInfo').member_id
    this.level = utils.dbGet('userInfo').memberLevelCode
    if (this.$route.params.returnNo && this.$route.params.statusName) {
        this.returnNo = this.$route.params.returnNo
        this.statusName = decodeURIComponent(this.$route.params.statusName)
    }
    console.log(this.returnNo)
    this.getReturnDetail()
  },
  methods: {
    getReturnDetail() {
      api.getDetail({
        memberId: this.memberId,
        returnNo: this.returnNo
      }).then(data => {
        this.$loading.close()
        console.log("detail", data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          let timeLine = this.getTimeList(obj.refundMonHistory)
          this.returnOrder = {
             orderNo: obj.orderNo,
             returnNo: obj.returnNo,
             returnReasonCode: obj.returnReasonCode,
             returnReasonName: obj.returnReasonName,
             returnReasonDesc: obj.returnReasonDesc,
             picList: obj.returnReasonImage ? obj.returnReasonImage.split(",") : [],
             serviceType: this.getServiceName(obj.applyType),
             applyTime: utils.dateFormat('yyyy-MM-dd hh:mm:ss', obj.applyTime),
             updateTime: (obj.updateTime) ? utils.dateFormat('yyyy-MM-dd hh:mm:ss', obj.updateTime) : "",
             deliveryMethod: obj.deliveryMethod,
             items: obj.items,
             statusCode: obj.statusCode,
             statusName: obj.statusName,
             refundAmount: obj.refundAmount,
             refundMethod: obj.refundMethod,
             refundMethodName: obj.refundMethodName,
             deliveryCompany: obj.deliveryCompany,
             deliveryNo: obj.deliveryNo,
             statusDesc: obj.statusDesc,
             moneyHistory: obj.refundMonHistory ? obj.refundMonHistory : [],
             moneyTime: timeLine,
             lineNum: this.getLineNum(timeLine),
             returnHistory: obj.refundHistory ? this.getReturnHistory(obj.refundHistory) : null,
             buyer: {
                 address: obj.address,
                 name: obj.name,
                 phone: obj.phone,
                 time: obj.pickupFormatTime
             },
             store: {
                 address: obj.returnAddress,
                 postCode: obj.postCode,
                 phone: obj.merchantPhone,
                 deliveryCompany: obj.refundCompanyName,
                 deliveryNo: obj.refundCompanyCode
             }
          }
          this.message = this.returnOrder.items[0]
          this.picture = this.message.goodsImage ? this.message.goodsImage : null
          console.log("namename", JSON.stringify(this.message))
          this.wait = this.returnOrder.moneyTime[0]
          this.midle = this.returnOrder.moneyTime[1]
          this.succ = this.returnOrder.moneyTime[2]
          this.pic = this.returnOrder.picList
          console.log("pic", JSON.stringify(this.pic))
          this.buy = this.returnOrder.buyer
          this.store = this.returnOrder.store
          console.log("hahhahahah", JSON.stringify(this.returnOrder))
          this.getConfig()
        } else {
          this.$toast(data.body.msg)
        }
      }, err => {
        console.log(err)
      })
    },
    getTimeList(list) {
      let timeList = []
      if (list) {
          for (let i = list.length - 1; i >= 0; i--) {
              if (list[i].refundStatus == '3001' || list[i].refundStatus == '3002' || list[i].refundStatus == '3003') {
                  let date = utils.dateFormat('yyyy-MM-dd hh:mm:ss', list[i].dateUpdate)
                  console.log("sjsjsjsjs" + date)
                  timeList.push({
                      date: date.split(" ")[0],
                      time: date.split(" ")[1]
                  });
              }
          }
          if (list[0].refundStatus == '3003' && timeList.length == 2) {
              timeList.splice(1, 0, {date: '', time: ''});
          }
      }
      console.log("&&-------------getTimeList--------" + JSON.stringify(timeList));
      return timeList
    },
    getServiceName(type) {
      switch (parseInt(type)) {
          case 1:
              return "退货"
          case 2:
              return "换货"
          case 3:
              return "维修"
      }
    },
    getLineNum(list) {
        if (!list) {
            return 0
        }
        switch (list.length) {
            case 1:
                return 1
            case 2:
                return 3
            case 3:
                return 4
        }
    },
    getReturnHistory(list) {
      for (let i = 0; i < list.length; i++) {
          list[i].dateUpdate = utils.dateFormat('yyyy-MM-dd hh:mm:ss', list[i].dateUpdate)
      }
      console.log("dfdfadfdfadf ", JSON.stringify(list))
      return encodeURIComponent(JSON.stringify(list))
    },
    getConfig() {
      api.queryConfig({
        "type": "refund_display_flag"
      }).then(data => {
        this.$loading.close()
        console.log("getConfig", data.body.obj)
        let obj = JSON.parse(data.body.obj)
        if (obj && obj.list) {
        for (let i = 0; i < obj.list.length; i++) {
            if (obj.list[i].value.indexOf(this.returnOrder.statusCode) != -1 && obj.list[i].label) {
                this.config[obj.list[i].label] = true;
            }
        }
      }
      }, err => {
        console.log(err)
      })
    },
    goGoodsList(goods) {
      this.$router.push({
        name: 'seeMore',
        params: {
          goods: encodeURIComponent(JSON.stringify(goods))
        }
      })
    },
    goDel(no) {
      let req = {
        orderId: no
      }
      window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
        pageId: 'myorderdetail',
        params: JSON.stringify(req)
      })
    },
    cancel(returnNo) {
      this.$modal({
        title: '提示',
        content: '是否取消退货申请?'
      })
      api.getCancel(JSON.stringify({
        memberId: this.memberId,
        returnNo: returnNo
      })).then(data => {
        this.$loading.close()
        console.log("cancel", data)
        if (data.body.obj) {
          this.$toast("~退货已取消~")
        }
      }, err => {
        console.log(err)
        this.$toast(err)
      })
    },
    serviceForbl(returnNo) {
      let vip = 0
      if (this.level == 40) { // 会员等级
        vip = 1
      }
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      window.CTJSBridge && window.CTJSBridge.LoadMethod('NativeEnv', 'fetchAppInfo', '', {
        success: res => {
          let resData = JSON.parse(res)
          console.log('app版本号:', resData.app_version)
          if (resData) {
            this.version = resData.app_version
          }
        }
      })
      if (isAndroid) {
        window.location.href = `http://chat.bl.com/wechat?skill=2003&vip=${vip}&version=${this.version}&goodsId=${this.message.goodsId}&goodsName=${this.message.goodsName}&goodsPicUrl=${this.picture}&orderNo=${this.returnOrder.orderNo}&memberId=${this.memberId}`
      } else {
        window.location.href = `http://chat.bl.com/wechat/ios.jsp?skill=2003&vip=${vip}&goodsId=${this.message.goodsId}&goodsName=${this.message.goodsName}&goodsPicUrl=${this.picture}&orderNo=${this.returnOrder.orderNo}&memberId=${this.memberId}`
      }
    }
    // getInformation() {
    //   if (this.config[7]) {
    //   }
    // }
  },
  // 路由取memberId
  beforeRouteEnter (to, from, next) {
    utils.isLogin().then(user => {
      next()
    })
  }
};
</script>
