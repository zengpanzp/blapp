<style lang="scss" src="./css/_index.scss" scoped></style>
<template>
  <div class="index">
    <div class="bl-mywallet-hd">
      <a href="javascript:;" class="wallet-hd-cell bill-index-line" @click="scanner">
        <img class="hd-cell-icon" src="./i/index/bill-index-icon1.png" alt="">
        <p>扫一扫</p>
      </a>
      <router-link :to="{ path: 'recharge/bill' }" class="wallet-hd-cell">
        <span class="ss-icon">2</span>
        <img class="hd-cell-icon" src="./i/index/bill-index-icon2.png" alt="">
        <p>付账单</p>
      </router-link>
    </div>
    <!--通用菜单-->
    <bl-home-menu></bl-home-menu>
    <div class="bill-fonts">可以使用百联会员卡、积分卡缴费哦~</div>
    <div class="topbg" style="display: none">
      <div class="scan"></div>
      <div id="know" class="know"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'index',
  components: {
    'blHomeMenu': () => System.import('./_home')
  },
  data() {
    return {
    }
  },
  mounted() {
    this.$loading.close()
  },
  methods: {
    scanner() {
      window.CTJSBridge && window.CTJSBridge.LoadMethod('BLBarScanner', 'presentH5BLBarScanner', '', {
        success: data => {
          console.log(data)
        },
        fail: data => {
          console.log(data)
        }
      })
    }
  }
};
</script>
