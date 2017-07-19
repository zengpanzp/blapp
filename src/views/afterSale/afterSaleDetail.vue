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
        <div class="sell-service corner">
            <ul>
                <li>
                <router-link :to="{path: '/returnHistoryPage/' + returnOrder.returnNo + '/' + returnOrder.returnHistory}" class="go">
                  <div>查看售后处理进度
                      <i class="quickhome-adresstele iconfont icon-enter font-color-ash2"></i>
                  </div>
                </router-link>
                </li>
                <li>
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
                                <div class="schedule-text-show"><label>待退款</label>
                                    <br>
                                    <br>
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
                                <div class="schedule-text-show"><label>退款中</label>
                                    <br>
                                    <br>
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
                                <div class="schedule-text-show"><label>退款成功</label>
                                    <br>
                                    <br>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <div class="sell-service corner">
            <ul id="goGoodsList">
                <li>
                    <div>售后商品<a class="quickhome-adresstele"><span class="font-color-ash2">查看所有商品</span>
                        <i class="iconfont icon-enter font-color-ash2"></i></a></div>

                </li>
                <li class="sell-service-listmiddle">
                    <a>
                        <div class="pic service-goods-money"><img src=""/>
                        </div>
                        <div>
                            <div class="manage-goods-num">x</div>
                            <div class="service-manage-goods"></div>
                        </div>
                        <p class="service-goods-num"><label class="service-goods-money font-color-red">售后原因：
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

                    <div class="font-color-ash1"></div>
                </li>
                <li class="link-detail">
                    <label class="font-color-ash2">问题描述</label>

                    <div class="font-color-ash1"></div>
                </li>
                <li class="link-detail">
                    <label class="font-color-ash2">退款方式</label>

                    <div class="font-color-ash1"></div>
                </li>
                <li class="link-detail back-money">
                    <label class="font-color-ash2 ">退款金额</label>

                    <div class="font-color-black"><span></span>元</div>
                </li>
            </ul>
        </div>
        <div class="columnTitle border return corner-top">图片凭证<span id="edit" style="display: none">编辑</span></div>
        <div class="uploadPic corner-bottom">
            <dd id="getPhoto" style="display: none"><a><i class="iconfont icon-add"></i></a></dd>
            <p id="tip" style="display: none">最多上传<span>3</span>张，每张不超过<span>5M</span>,支持jpg,BMP,Png</p>
            <p class="emptyPic">暂无图片</p>
        </div>
        <div class="sell-service corner" id="storeAddress">
            <ul>
                <li class="link-detail">
                    <label>退回地址</label>

                    <div></div>
                </li>
            </ul>
        </div>
        <div class="sell-service corner delivery">
            <ul>
                <li class="link-detail">
                    <label>物流单号</label>

                    <div>
                        尚未有物流单号，请填写<i class="iconfont icon-enter quickhome-adresstele"></i>
                    </div>
                </li>
            </ul>
        </div>
        <div class="payList return-pickup corner" id="pickup">
            <ul>
                <li><p>取件信息</p></li>
                <li><p>取件时间：<span class="fr"></span></p></li>
            </ul>
            <div class="addressCon">
                <b class="iconfont icon-address"></b>
                <ul>
                    <li><span class="fr"></span><label>联系人：</label>
                    </li>
                    <li><label>上门取货地址：</label>

                        <p></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="payList return-receive corner">
            <ul>
                <li><p>收货地址</p></li>
            </ul>
            <div class="addressCon">
                <b class="iconfont icon-address"></b>
                <ul>
                    <li><span class="fr"></span><label>联系人：</label>
                    </li>
                    <li><label>地址：</label>

                        <p></p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sell-service corner">
            <ul>
                <li class="link-detail">
                    <label>物流单号</label>

                    <div>&nbsp;</div>
                </li>
            </ul>
        </div>
    <footer>
        <div class="fixedMainbtn orderbtn orderbtnSize return">
            <a href="#" class="btn-sub">订单详细</a>
            <a href="tel:4009008800" class="btn-sub">
                致电客服
            </a>
            <a class="btn-1 delivery">填写发货信息</a>
            <a id="cancel" class="btn-sub">取消申请</a>
        </div>
    </footer>
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
        config: {}
    };
  },
  created() {
    this.memberId = utils.dbGet('userInfo').member_id
    if (this.$route.params.returnNo && this.$route.params.statusName) {
        this.returnNo = this.$route.params.returnNo
        this.statusName = decodeURIComponent(this.$route.params.statusName)
    }
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
      return encodeURIComponent(JSON.stringify(list));
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
    }
  },
  // 路由取memberId
  beforeRouteEnter (to, from, next) {
    utils.isLogin().then(user => {
      next()
    })
  }
};
</script>

<style lang="css" scoped>
</style>
