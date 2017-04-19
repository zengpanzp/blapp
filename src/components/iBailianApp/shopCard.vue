<template>
  <div class="shop-card flex-c-m" :class="{ 'circle-red': showRed }" @click="goShopCar">
    <svg class="icon"><use xlink:href="#icon-gouwuche"></use></svg>
  </div>
</template>

<script>
import utils from 'src/utils'
export default {

  name: 'shopCard',

  props: {
    showRed: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {

    };
  },
  methods: {
    goShopCar() {
      let memberId = utils.ssdbGet('member_id')
      let memberToken = utils.ssdbGet('member_token')
      if (!memberId && !memberToken) {
        utils.goLogin()
      } else {
        console.log('已经登录')
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
          pageId: 'shoppingcart2'
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .shop-card{
    position: fixed;
    left: rem(20);
    bottom: rem(16);
    width: rem(88);
    height: rem(88);
    border-radius: rem(6);
    background-color: #fff;
    border: 1px solid #ccc;
    z-index: 100;
    &.circle-red{
      &:after{
        content: '';
        position: absolute;
        right: rem(18);
        bottom: rem(20);
        width: rem(10);
        height: rem(10);
        background-color: #eb5e7a;
        border-radius: 50%;
      }
    }
    .icon{
      font-size: rem(58);
      font-weight: bold;
      color: #a1a1a1;
    }
  }
</style>
