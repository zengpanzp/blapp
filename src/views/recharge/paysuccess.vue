<style lang="scss" src="./css/_paysuccess.scss" scoped></style>
<!--水电煤缴费成功-->
<template>
  <div class="pay_success">
    <div class="success-container margin-config">
      <div class="head">
        <div class="success-logo"></div>
        <div>交易成功</div>
      </div>
      <div class="order-info">
        <div>充值订单：</div>
        <div>{{orderNo}}</div>
      </div>
      <div class="order-info">
        <div>支付金额：</div>
        <div>¥{{money}}</div>
      </div>
      <div class="remind">充值成功后预计能快速到账，请注意查收短信，遇系统繁忙等情况可能会延时到账。</div>
      <div class="button-box">
        <div class="left-button" @click="recharge"><a>继续充值</a></div>
        <div class="right-button" @click="goOrderDetail"><a>查看订单</a></div>
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
//    import api from 'src/api/index'
//    import utils from 'src/utils'
//    import CONST from 'src/const'
export default {

  name: 'paysuccess',

  data() {
    return {
      money: 0,
      orderNo: "",
      type: "sf"
    }
  },
  created() {
    window.CTJSBridge && window.CTJSBridge._setNativeTitle("支付成功");
    this.money = this.$route.query.money
    this.orderNo = this.$route.query.orderNo
    this.type = this.$route.query.type
    sa.track('$pageview', {
      pageId: 'App_虚拟支付成功页',
      categoryId: 'APP_Fees',
      $title: "App_虚拟支付成功页"
    });
    this.$loading.close();
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
    recharge() {
      this.$router.push({
        path: "/recharge"
      });
    },
    goOrderDetail() {
      if (this.$route.query.jumpType == '1') {
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
          pageId: 'expensesorderdetail',
          params: JSON.stringify({
            order: this.$route.query.orderNo
          })
        })
      } else {
        this.$router.push({
          path: "/recharge/orderdetail/" + this.type + "/" + this.orderNo
        });
      }
    }
  }
}
</script>
