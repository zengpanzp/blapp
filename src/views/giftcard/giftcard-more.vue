<template>
  <div class="mar-con" style="margin-top: 0.26667rem">
    <bl-card-list :jumpId="$route.params.jumpId"></bl-card-list>
    <bl-shop-card></bl-shop-card>
  </div>
</template>

<script>
  export default {
    name: 'giftcard-more',
    components: {
      'blCardList': () => System.import('./_cardLIst'),
      'blShopCard': () => System.import('src/components/iBailianApp/shopCard'),
    },
    created() {
      document.title = this.$route.params.themeName
      window.CTJSBridge && window.CTJSBridge._setNativeTitle(decodeURI(this.$route.params.themeName))
    }
  }
</script>
