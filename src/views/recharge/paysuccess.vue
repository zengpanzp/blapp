<style lang="scss" src="./css/_paysuccess.scss" scoped></style>
<!--水电煤缴费成功-->
<template>
  <div class="pay_success">
    <div class='success-pay'>
      <p class='success-pay-first'>
        <img class='success-pay-select' src='./i/icons/payok.png'>
        支付成功
      </p>
      <p class='success-pay-second'>
        缴费金额：<label class='font-color-yellow'>￥58.00</label>
      </p>
      <p class='success-pay-third'>实际到账时间已销账机构处理为准</p>
    </div>
    <div class='success-pay-button'>
      <button type='button' class='corner'> 查看订单</button>
      <button type='button' disabled='disabled' class='corner'> 返回缴费中心</button>
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
      }
    },
    computed: {
    },
    created() {
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
    }
  }
</script>
