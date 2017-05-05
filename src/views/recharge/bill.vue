<!--<style lang="scss" src="./css/_index.scss" scoped></style>-->
<style lang="scss" src="./css/_recharge.scss" scoped></style>
<template>
  <div class=" new">
    <div class="product-filter blue-bill-top">
      <a href="javascript:;" class="more bill-class-add">+</a>
      <div class="itemauto">
        <ul>
          <li class="bill-select"><a href="javascript:;">我家</a></li>
          <li><a href="javascript:;">我家</a></li>
          <li><a href="javascript:;">我家</a></li>
          <li><a href="javascript:;">我家</a></li>
          <li><a href="javascript:;">我家</a></li>
          <li><a href="javascript:;">我家</a></li>
          <li><a href="javascript:;">我家</a></li>
          <li><a href="javascript:;">我家</a></li>
          <li><a href="javascript:;">我家</a></li>
          <li><a href="javascript:;">我家</a></li>
        </ul>
      </div>
    </div>
    <div class='cbill-account list-block'>
      <ul>
        <li class="swipeout">

          <div class="icon-waitassess swipeout-content">
            <div class='bill-pay-name'>水费
            </div>
            <div class='bill-pay-stadius-see'>
              <span class="bill-account">查看账单</span>
              <img class="more" src="./i/iphone/more.png" />
            </div>

          </div>
        </li>
        <li class="swipeout">
          <div class="icon-electricity swipeout-content">
            <div class='bill-pay-name'>电费</div>
            <div class='bill-pay-stadius-go gray'><span class="bill-account">我要缴费</span><img class="more" src="./i/iphone/more.png" /></div>
          </div>

        </li>
        <li class="swipeout">
          <div class="icon-gas swipeout-content">
            <div class='bill-pay-name'>燃气费</div>
            <div class='bill-pay-stadius-go gray'><span class="bill-account">我要缴费</span><img class="more" src="./i/iphone/more.png" /></div>
          </div>

        </li>
      </ul>
    </div>
    <div class='pay-more-button'>更多缴费</div>
    <!--通用导航菜单-->
    <bl-home-menu style="display: none"></bl-home-menu>
    <!--遮罩-->
    <!--<div class="plusMarkImg">-->
      <!--<div class="imgMark billPayMark"><div class="iKnow"></div></div>-->
    <!--</div>-->
  </div>
</template>
<script>
//  import api from 'src/api/index'
//  import utils from 'src/utils'
  export default {

    name: 'iphone',
    components: {
      'blHomeMenu': () => System.import('./_home')
    },
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
    methods: {
      onRefresh(done) {
        setTimeout(() => {
          done()
        }, 2000)
      }
    }
  };
</script>

