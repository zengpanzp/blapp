<style lang="scss" src="./css/_records.scss" scoped></style>
<!--水电煤缴费-->
<template>
    <div class="rates">
      <div class="content-wrap">
          <ul>
            <li class="title" :class="typeClass">{{typeName}}</li>
            <li @click.prevent="showCategory">条码
              <div class="name"><label>{{queryData.tiaoma}}</label></div>
            </li>
            <!--	</ul>
            </div>-->
            <!--<div class='pay-remind'><img src='images/new_store/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>-->
            <!--<div class='dummy-goods-list line-tv-box'>
                <ul>-->
            <li>缴费账号
              <div class="name"><label>{{queryData.code}}</label></div>
            </li>
            <li>缴费机构
              <div class="name"><label>{{queryData.companyName}}</label></div>
            </li>
          </ul>
          <ul class="paylist">
            <li @click.prevent="showCategory">账期
              <div class="name"><label>{{queryData.date}}</label></div>
            </li>
            <!--	</ul>
            </div>-->
            <!--<div class='pay-remind'><img src='images/new_store/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>-->
            <!--<div class='dummy-goods-list line-tv-box'>
                <ul>-->
            <li>缴费金额
              <div class="name"><label style="color:#e6133c">￥{{queryData.total}}</label></div>
            </li>
          </ul>
        <div class='pay-remind'><img src='./i/iphone/remind-light.png'>如需为3个月前的缴费，请使用扫一扫扫描条形码</div>
        <div class="phoneFixBottom">
          <div class="config-button-contain">
            <button class="edit-config-button middleFont" @click="goPay" :disabled="queryData.canpay!='01'">立即支付：￥{{ queryData.total }}</button>
          </div>
        </div>
      </div>
    </div>
</template>
<style lang="scss" scoped>
  .content-wrap {
    background: transparent;
  }
</style>
<script>
    import api from './api/index'
    import utils from 'src/utils'
    import CONST from 'src/const'
  export default {

    name: 'records',

    data() {
      return {
        currentPay: 0,
        typeName: '', // 缴费类别
        rateType: 1,
        queryData: {},
        typeObj: {
          1: "sf",  // 水费
          2: "dl",  // 电费
          3: "mq",   // 煤气
          4: "ds",
          5: "tt"
        }
      }
    },
    computed: {
    },
    created() {
        // 1位水费 2为电费 3为煤气费
        this.ratesType = this.$route.params["type"];
        let queryData = JSON.parse(localStorage.getItem("BL_QUERY_DATA"));
        this.queryData = queryData;
        console.log(queryData)
        this.fill();
    },
    watch: {
      '$route': 'fill'
    },
//    beforeRouteEnter(to, from, next) {
//        debugger
//      next(vm => {
//        vm.toShow = true;
//        vm.loadGroup = false;
//        vm.loadListView = false;
//      });
//    },
    methods: {
      getOrderTypeCode(type) {
        switch (type) {
          case '01':
            return '20';
          case '02':
            return '21';
          case '03':
            return '22';
          case 'sf':
            return '20';
          case 'dl':
            return '21';
          case 'mq':
            return '22';
          case 'cz':
            return '23';
          case 'ltll':
            return '34';
          case 'ydll':
            return '34';
          case 'dxll':
            return '34';
          case 'yk':
            return '35';
          case 'gh':
            return '10';
          case 'ds':
            return '9';
          case 'tt':
            return '12';
          case 'yx':
            return '14';
          case 'zc':
            return '15';
          default:
            return type;
        }
      },
      // 去支付
      goPay() {
          let current = this
          this.inlineLoading = this.$toast({
            iconClass: 'preloader white',
            message: '加载中',
            duration: 'loading'
          })
          // 生成订单  然后掉native的支付方法
          utils.isLogin().then(user => {
            console.log(user);
            let timestamp = utils.getTimeFormatToday();
            api.recharge.createOrder({
              client_id: CONST.CLIENT_ID,
              client_secret: CONST.CLIENT_SECRET,
              format: "json",
              dkhdh: user.mobile,
              typecode: this.queryData.typecode,
              t_dz: "02",
              code: this.queryData.tiaoma,
              dkhxm: user.member_name,
              dkhzh: user.member_id,
              type: this.typeObj[this.rateType],
              timestamp: timestamp,
              token: user.member_token
            }).then(data => {
                let json = JSON.parse(data.body.obj);
                if (json.Result_code == "200") {
                  let createExpensesOrderRequestData = {
                    outOrderNo: json.orderid,
                    payMoney: parseFloat(this.queryData.total),
                    orderSource: 1,
                    orderTypeCode: this.getOrderTypeCode(this.typeObj[this.rateType]),
                    accountDate: this.queryData.date.replace("-", ""),
                    memberId: user.member_id,
                    accountNo: this.queryData.tiaoma,
                    jigouName: this.queryData.companyName,
                    changeMoney: parseFloat(this.queryData.price),
                    aliasSaleTime: json.orddate,
                    orderPhone: user.mobile,
                    serviceFee: this.queryData.fee ? this.queryData.fee : 0
                  }
                  // 创建账号账单
                  let createPaySubNoData = {
                    paymentType: "0" + current.rateType,
                    jigouName: this.queryData.companyName,
                    jigouCode: this.queryData.typecode,
                    accountName: "APP",
                    groupId: this.queryData.groupId,
                    groupName: this.queryData.groupName,
                    accountNo: this.queryData.code,
                    timestamp: timestamp,
                    member_token: user.member_token
                  }
                  api.recharge.createPaySubNo(createPaySubNoData).then(data => {
                    console.log(data);
                  });
                  api.recharge.createExpensesOrder(createExpensesOrderRequestData).then(data => {
                    console.log('中间件接口 生成费用订单接口返回报文=============<br>' + data.body.obj)
                    let resData = JSON.parse(data.body.obj)
                    let order = {
                      orderNo: resData.orderNo,
                      outOrderNo: resData.outOrderNo,
                      payMoney: resData.payMoney,
                      orderTime: resData.orderTime,
                      orderTypeCode: resData.orderTypeCode,
                      activeTime: resData.activeTime,
                      changeMoney: resData.changeMoney,
                      omsNotifyUrl: resData.omsNotifyUrl,
                      payType: resData.payType,
                      accountNo: resData.accountNo
                    }
                    require.ensure([], function (require) {
                      let Pay = require('src/paymodel').default
                      current.inlineLoading.close()
                      Pay.goPay(order, current.getOrderTypeCode(current.typeObj[current.rateType]), (data) => {
                        // 跳转到paysuccess
                        current.$router.push({path: "/recharge/paysuccess?money=" + data + "&orderNo=" + resData.orderNo + "&type=" + current.getOrderTypeCode(current.typeObj[current.rateType])});
                      }, (data) => {
                        // 跳转到详情
                        current.$router.push({path: "/recharge/orderdetail/" + current.getOrderTypeCode(current.typeObj[current.rateType]) + "/" + resData.orderNo});
                      });
                    }, 'Pay')
                  })
                } else {
                  this.$toast({
                    position: 'bottom',
                    message: json.msg
                  });
                }
            })
          });
      },
      // 监听路由
      fill(to, from) {
        let val = this.$route.params["type"];
        this.rateType = val;  // 缴费类别 1 水费 2电费 3 煤气费
        if (val == 1) {
          this.typeClass = "icon-waitassess";
          this.typeName = "水费";
        } else if (val == 2) {
          this.typeClass = "icon-electricity";
          this.typeName = "电费";
        } else if (val == 3) {
          this.typeClass = "icon-gas";
          this.typeName = "煤气费";
        } else if (val == 4) {
          this.typeClass = "icon-cabletv";
          this.typeName = "有线电视";
        } else if (val == 5) {
          this.typeClass = "icon-tietong";
          this.typeName = "铁通";
        }
        this.$loading.close()
      }
    }
  };
</script>
