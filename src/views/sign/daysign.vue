<style lang="scss" src="./css/_index.scss" scoped></style>
<!--日签-->
<template>
  <div class="daysign">
    <section class="dheader">
      <div class="tips">
        <div>积分攒着当钱花</div>
        <div>线上线下都可花</div>
      </div>
      <div class="line"></div>
      <div class="tips2">本月已获得2次抽奖 <img src="./i/hbg.jpg" class="dateImg"></div>
      <div class="tips2 other">我的积分 3444 （可抵现34.44元） </div>
      <div class="btnSign">
          签 到
      </div>
      <div class="tips2 other2">没有省不下的钱，只有不坚持的签</div>
      <ul class="menu">
        <li>
          <img src="./i/hbg.jpg">
          <div>游戏中心</div>
        </li>
        <li>
          <img src="./i/hbg.jpg">
          <div>特权汇</div>
        </li>
        <li>
          <img src="./i/hbg.jpg">
          <div>积分商城</div>
        </li>
        <li>
          <img src="./i/hbg.jpg">
          <div>全球购</div>
        </li>
        <li>
          <img src="./i/hbg.jpg">
          <div>免费领</div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
//  import api from 'src/api/index'
//  import utils from 'src/utils'
  export default {
    name: 'daysign',
    data() {
      return {
        isLoading: false,
        // 广告资源位
        banner: [],
        // 送礼对象列表
        sendType: [],
        // 热推商品
        hotType: [],
        // 商品类别
        goodType: [],
        // 商品列表
        goodsList: []
      }
    },
    computed: {
      fillAllSlides() {
        return this.banner
      }
    },
    created() {
      this.$loading.close()
    },
    mounted() {
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

