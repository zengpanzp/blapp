<style lang="scss" src="./css/_billempty.scss" scoped></style>
<template>
  <div class="billList-wrap">
    <div class="product-filter blue-bill-top">
      <div class="shadow-bg"></div>
      <a href="javascript:;" class="more bill-class-add">+</a>
      <div class="itemauto">
        <ul>
          <li class="bill-select"><a href="javascript:;">我家</a></li>
          <li><a href="javascript:;">父母家</a></li>
          <li><a href="javascript:;">朋友家</a></li>
          <li><a href="javascript:;">父母家</a></li>
          <li><a href="javascript:;">父母家</a></li>
          <li><a href="javascript:;">父母家</a></li>
          <li><a href="javascript:;">父母家</a></li>
        </ul>
      </div>
    </div>
    <div class="blue-bill-center">
      <img src="./i/billempty/bill-img.png">
      <div class="fonts">暂无支付账单</div>
    </div>
    <div class="morder-pay-cost"><a href="#">更多缴费</a></div>
  </div>
</template>
<script>
//  import api from 'src/api/index'
//  import utils from 'src/utils'
  export default {

    name: 'billempty',

    data() {
      return {
      }
    },
    computed: {
    },
    created() {
      this.$loading.close()
    },
    methods: {
      onRefresh(done) {
        setTimeout(() => {
          done()
        }, 2000)
      }
    }
  };
</script>
