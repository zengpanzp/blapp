<style lang="scss" src="./css/_orderdetail.scss" scoped></style>
<template>
  <div class="bill-orderdetail">
    <!--<header class="subH">-->
    <!--<div class="subHeader fixedHeader">-->
    <!--<a class="aback iconfont icon-back"></a>-->

    <!--<h2><%-order.typeName%>账单</h2>-->
    <!--</div>-->
    <!--</header>-->
    <ul>
      <li>
        订单编号: {{orderDetail.orderNo}}
        <div class="billstatus">{{orderDetail.orderStatusDesc}}</div>
      </li>
      <li class="bill-tips">
        <div class="spe">{{orderDetail.displayStatus}}</div>
        <div class="spe">{{orderDetail.orderTime}}</div>

      </li>
    </ul>
    <ul>
      <li class="pay-bill">
        <label>￥</label><span>{{orderDetail.orderStatus =="1001"?orderDetail.changeMoney:orderDetail.needMoney}}</span>
        <p v-show="orderDetail.serviceFee>0">(含￥{{orderDetail.serviceFee}}服务费)</p>
        <div v-if="orderDetail.payMetSid==1">在线支付</div>
        <div v-if="orderDetail.payMetSid==2">货到付款</div>
      </li>
      <li class="bill-company">
        <img v-bind:src="iconImage"> {{orderDetail.jigouName}}
      </li>
    </ul>
    <ul class="bill-bottom">
      <li>
        缴费类型&nbsp;&nbsp;&nbsp;&nbsp;{{orderDetail.jigouName}}
      </li>
      <li>
        缴费条码&nbsp;&nbsp;&nbsp;&nbsp;{{orderDetail.accountNo}}
      </li>
      <li>
        创建时间&nbsp;&nbsp;&nbsp;&nbsp;{{orderDetail.accountDate}}
      </li>
    </ul>
    <div class="bill-to-pay lefttime" v-if="orderDetail.orderStatus == '1001'">
      <div>剩余支付时间:{{leftTime}}</div>
      <button type="blueBtn next selected" @click="goPay" :disabled="disable" v-show="toShow">去支付</button>
    </div>
    <div class="bill-to-pay" v-if="orderDetail.orderStatus == '1007' || orderDetail.orderStatus == '1029' || orderDetail.orderStatus == '3003'">
      <bl-button type="blueBtn next selected" @click="goHome">再次缴费</bl-button>
    </div>
  </div>
</template>
<script>
  import api from 'src/api/index'
  import utils from 'src/utils'
  export default {

    name: 'orderdetail',

    data() {
      return {
        orderDetail: {},
        type: "sf",
        leftTime: "",
        toShow: true,
        disable: false,
        typeObj: {
          20: "sf",  // 水费
          21: "dl",  // 电费
          22: "mq",  // 煤气
          9: "ds",   // 电视
          12: "tt"   // 铁通
        },
        imgs: {
          "sf": require("./i/icons/icon-water.png"),     // 水费图片
          "dl": require("./i/icons/icon-electric.png"),  // 电费
          "mq": require("./i/icons/icon-coal.png"),      // 煤气
          "ds": require("./i/icons/icon-linetv.png"),    // 电视
          "tt": require("./i/icons/icon-linetv.png")     // 铁通
        }
      }
    },
    beforeRouteLeave (to, from, next) {
      clearInterval(window._PAY_SETINTERVAL_ID);
      next()
    },
    created() {
      let orderNo = this.$route.params.orderNo;
      this.type = this.$route.params.type;
      let current = this;
      utils.isLogin().then(user => {
        console.log(user)
        api.recharge.getNewOrderDetail({
          memberId: user.member_id,
          orderNo: orderNo
        }).then(data => {
          console.log(data)
          let json = JSON.parse(data.body.obj);
          console.log(json)
          this.orderDetail = json;
          this.iconImage = this.imgs[this.typeObj[this.orderDetail.orderTypeCode]];
          this.$loading.close();
          window._PAY_SETINTERVAL_ID = setInterval(function() {
            if (current.orderDetail.orderStatus == '1001') {
              var remain = current.getTime(current.getLimit(current.orderDetail), 24);
              current.leftTime = remain;
              if (remain.indexOf('剩00:00:00') != -1) {
                  // 不可以支付
                  this.disable = true;
                  clearInterval(window._PAY_SETINTERVAL_ID);
              } else if (remain.indexOf("超过订单期限") != -1) {
                  this.disable = true;
                  clearInterval(window._PAY_SETINTERVAL_ID);
              }
            }
          }, 1000)
        })
      });
    },
    methods: {
      getLimit: function (obj) {
        var lM = parseInt(obj.orderTime.split(' ')[0].split('-')[1]);
        var ld = parseInt(obj.orderTime.split(' ')[0].split('-')[2]);
        var lh = parseInt(obj.orderTime.split(' ')[1].split(':')[0]);
        var lm = parseInt(obj.orderTime.split(' ')[1].split(':')[1]);
        var ls = parseInt(obj.orderTime.split(' ')[1].split(':')[2]);
//        var period = parseInt(obj.activeTime);
//        console.log("&&----------" + ld + "------------" + lh + "----" + lm + "--------" + ls + "--------" + period);
        return {
          lM: lM,
          ld: ld,
          lh: lh,
          lm: lm,
          ls: ls
        };
      },
      getTime: function (limit, max) {
        if (!max) {
          max = 2;
        }
        var now = new Date();
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        sec = sec - limit.ls;
        min = min - limit.lm;
        hour = hour - limit.lh;
        date = date - limit.ld;
        month = month - limit.lM;
        if (month > 0) {
          return "超过订单期限";
        }
        if (date > 0) {
          return "超过订单期限";
        }
        if (hour >= max) {
          return "超过订单期限";
        } else {
          if (sec < 0) {
            sec = sec + 60;
            min--;
          }
          if (min < 0) {
            min = min + 60;
            hour--;
          }
          sec = 0 - sec;
          min = 0 - min;
          hour = max - hour;
          if (sec < 0) {
            sec = sec + 60;
            min--;
          }
          if (min < 0) {
            min = min + 60;
            hour--;
          }
        }
        if (hour < 10) {
          hour = '0' + hour;
        }
        if (min < 10) {
          min = '0' + min;
        }
        if (sec < 10) {
          sec = '0' + sec;
        }
        var remainTime = '';
        if (date > 0) {
          remainTime = "剩" + date + "天" + hour + ":" + min + ":" + sec + "";
        } else {
          if (parseInt(hour) > 0) {
            remainTime = "剩" + hour + ":" + min + ":" + sec + "";
          } else {
            if (parseInt(min) > 0) {
              remainTime = "剩00:" + min + ":" + sec + "";
            } else {
              remainTime = "剩00:00:" + sec + "";
            }
          }
        }
        return remainTime;
      },
      getRemainTime: function (limit) {
        var now = new Date();
        var date = now.getDate();
        var hour = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        sec = limit.ls - sec;
        min = limit.lm - min;
        hour = limit.lh - hour;
        date = limit.ld - date;
        if (sec < 0) {
          sec = sec + 60;
          min--;
        }
        if (min < 0) {
          min = min + 60;
          hour--;
        }
        if (hour < 0) {
          hour = hour + 24;
          date--;
        }
        var remainTime = '';
        if (date > 0) {
          remainTime = "剩" + date + "天" + hour + ":" + min + ":" + sec + "";
        } else {
          if (hour > 0) {
            remainTime = "剩" + hour + ":" + min + ":" + sec + "";
          } else {
            if (min > 0) {
              remainTime = "剩" + min + ":" + sec + "";
            } else {
              remainTime = "剩" + sec + "";
            }
          }
        }
        return remainTime;
      },
      goHome() {
        this.$router.push({path: "/recharge/"});
      },
      goPay() {
        this.inlineLoading = this.$toast({
          iconClass: 'preloader white',
          message: '加载中',
          duration: 'loading'
        })
        let resData = this.orderDetail;
        let order = {
          orderNo: resData.accountNo,
          outOrderNo: resData.aliasOrderNo,
          payMoney: resData.needMoney,
          orderTime: resData.orderTime,
          orderTypeCode: resData.orderTypeCode,
          activeTime: resData.activeTime,
          changeMoney: resData.changeMoney,
          omsNotifyUrl: resData.omsNotifyUrl,
          payType: resData.payType,
          accountNo: resData.orderPhone
        }
        console.log("order", order);
        let current = this;
        require.ensure([], function(require) {
          let Pay = require('src/paymodel').default
          current.inlineLoading.close()
          Pay.goPay(order, current.type, (data) => {
            console.log(data);
          }, (data) => {
            // 跳转到详情
            current.$router.push({path: "/recharge/orderdetail/" + current.type + "/" + resData.orderNo});
          });
        }, 'Pay')
      }
    }
  };
</script>
