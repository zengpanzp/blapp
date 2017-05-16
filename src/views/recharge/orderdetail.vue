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
        订单编号: BAE77787878989879S
        <div class="billstatus">缴费中</div>
      </li>
      <li class="bill-tips">
        <div class="spe">你的订单已生成，等待付款</div>
        <div class="spe">2019-09-09 11:07:07</div>
      </li>
    </ul>
    <ul>
      <li class="pay-bill">
        <label>￥</label><span>100.50</span>
        <p>(含￥1.0服务费)</p>
        <div>在线支付</div>
      </li>
      <li class="bill-company">
        <img src="./i/icons/icon-play.png"> 上海水务城投有线公司
      </li>
    </ul>
    <ul class="bill-bottom">
      <li>
        缴费类型&nbsp;&nbsp;&nbsp;&nbsp;BAE77787878989879S
      </li>
      <li>
        缴费条码&nbsp;&nbsp;&nbsp;&nbsp;BAE77787878989879S
      </li>
      <li>
        创建时间&nbsp;&nbsp;&nbsp;&nbsp;BAE77787878989879S
      </li>
    </ul>
    <div class="bill-to-pay">
      <bl-button type="blueBtn next selected">去支付</bl-button>
    </div>
  </div>
</template>
<script>
//  import api from 'src/api/index'
//  import utils from 'src/utils'
  export default {

    name: 'orderdetail',

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
