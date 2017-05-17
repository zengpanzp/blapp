<style lang="scss" src="./css/_home.scss" scoped></style>
<template>
  <div class="order-show-icon">
    <a href="javascript:;" v-for="{url, icon, text} in list" @click="isLogin(url)">
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
        url: 'recharge/iphone/1',
        icon: 'icon-waitpay',
        text: '手机充值'
      }, {
        url: 'recharge/iphone/2',
        icon: 'icon-waitreceive',
        text: '流量充值'
      }, {
        url: 'recharge/fixedphone',
        icon: 'icon-waitpick',
        text: '固话/宽带'
      }, {
        url: 'recharge/rates/1',
        icon: 'icon-waitassess',
        text: '水费'
      }, {
        url: 'recharge/rates/2',
        icon: 'icon-electricity',
        text: '电费'
      }, {
        url: 'recharge/rates/3',
        icon: 'icon-gas',
        text: '煤气费'
      }, {
        url: 'recharge/linetv',
        icon: 'icon-cabletv',
        text: '有线电视'
      }, {
        url: 'recharge/game',
        icon: 'icon-play',
        text: '游戏'
      }, {
        url: 'recharge/petrol',
        icon: 'icon-card',
        text: '加油卡'
      }]
    };
  },
  methods: {
    isLogin(url) {
      if (process.env.NODE_ENV !== 'production') {
        this.$router.push({ path: url })
      } else {
        utils.isLogin().then(data => {
        this.$router.push({ path: url })
      }, () => {})
      }
    }
  }
};
</script>
