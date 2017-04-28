<style lang="scss" src="./css/_index.scss" scoped></style>
<template>
  <div class="index" id="container">
    <div class="bl-mywallet-hd">
      <a href="javascript:;" class="wallet-hd-cell bill-index-line">
        <img class="hd-cell-icon" src="./i/index/bill-index-icon1.png" alt="">
        <p>扫一扫</p>
      </a>
      <a href="javascript:;" class="wallet-hd-cell">
        <span class="ss-icon">2</span>
        <img class="hd-cell-icon" src="./i/index/bill-index-icon2.png" alt="">
        <p>付账单</p>
      </a>
    </div>
    <div class="order-show">

      <div class="order-show-icon">
        <ul>
          <li>
            <a href="#">
              <i class="icon-waitpay"></i>
              <p class="order-font">手机充值</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="icon-waitreceive"></i>
              <p class="order-font">流量充值</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="icon-waitpick"></i>
              <p class="order-font">固话/ 宽带</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="icon-waitassess"></i>
              <p class="order-font">水费</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="icon-electricity"></i>
              <p class="order-font">电费</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="icon-gas"></i>
              <p class="order-font">煤气费</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="icon-cabletv"></i>
              <p class="order-font">有线电视</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="icon-play"></i>
              <p class="order-font">游戏</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i class="icon-card"></i>
              <p class="order-font">加油卡</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="bill-fonts">可以使用百联会员卡、积分卡缴费哦~</div>
    <div class="topbg" style="display: none">
      <div class="scan scan02"></div>
      <div class="bangding bangding02" style="display:none"></div>
      <div id="know" class="know"></div>
    </div>
  </div>
</template>
<script>
//  import api from 'src/api/index'
//  import utils from 'src/utils'
  export default {

    name: 'index',

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

