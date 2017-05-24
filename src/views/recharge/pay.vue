<style lang="scss" src="./css/_records.scss" scoped></style>
<!--水电煤缴费-->
<template>
    <div class="rates">
      <div class="content-wrap">
          <ul>
            <li class="icon-waitassess title" :class="typeClass">{{typeName}}</li>
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
    import api from 'src/api/index'
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
          3: "mq"   // 煤气
        },
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
        utils.isLogin().then(user => {
            console.log(user)
            console.log(api)
        });
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
      // 去支付
      goPay() {
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
                console.log(data);
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
        }
        this.$loading.close()
      }
    }
  };
</script>
