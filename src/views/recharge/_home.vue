<style lang="scss" src="./css/_home.scss" scoped></style>
<template>
  <div class="order-show-icon">
    <a href="javascript:;" v-for="{type, url, icon, text} in list" @click="nativeGo(type, url)">
      <i :class="icon"></i>
      <p class="order-font">{{ text }}</p>
    </a>
  </div>
</template>
<script>
import utils from 'src/utils'
export default {

  name: '_home',

  data() {
    return {
      list: [{
        url: 'recharge/iphone/0',
        type: '23',
        icon: 'icon-waitpay',
        text: '手机充值'
      }, {
        url: 'recharge/iphone/1',
        type: '34',
        icon: 'icon-waitreceive',
        text: '流量充值'
      }, {
        url: 'recharge/fixedphone',
        type: '10',
        icon: 'icon-waitpick',
        text: '固话/宽带'
      }, {
        url: 'recharge/rates/1',
        type: '',
        icon: 'icon-waitassess',
        text: '水费'
      }, {
        url: 'recharge/rates/2',
        type: '',
        icon: 'icon-electricity',
        text: '电费'
      }, {
        url: 'recharge/rates/3',
        type: '',
        icon: 'icon-gas',
        text: '煤气费'
      }, {
        url: 'recharge/linetv',
        type: '9, 12',
        icon: 'icon-cabletv',
        text: '有线电视'
      }, {
        url: 'recharge/game',
        type: '14, 15',
        icon: 'icon-play',
        text: '游戏'
      }, {
        url: 'recharge/iphone/0?type=petrol',
        type: '35, ',
        icon: 'icon-card',
        text: '加油卡'
      }]
    };
  },
  methods: {
    nativeGo(type, url) {
      utils.isLogin().then(data => {
        if (process.env.NODE_ENV !== 'production') {
          this.$router.push({ path: url })
          return
        }
        window.CTJSBridge && window.CTJSBridge.LoadMethod('BLChargeAndPayment', 'chargeAndPaymentViewController', {
          type: type,
          url: url
        }, {})
      }, () => {})
    }
  }
};
</script>
