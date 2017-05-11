<style lang="scss" src="./css/_index.scss" scoped></style>
<!--日签-->
<template>

  <div class="daysign">
    <div class="overlay" v-show="showOverlay"></div>
    <section class="dheader">
      <div class="tips">
        <div>积分攒着当钱花</div>
        <div>线上线下都可花</div>
      </div>
      <div class="line"></div>
      <div class="tips2">本月已获得2次抽奖 <img src="./i/date.png" class="dateImg"></div>
      <div class="tips2 other">我的积分 3444 （可抵现34.44元） </div>
      <div class="btnSign">
          签 到<img src="./i/signed.png">
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
    <!--四个资源位-->
    <ul class="top-menu">
      <li>
        <div class="name">经理经理的说法</div>
        <div class="desc">df的说法</div>
        <img src="./i/hbg.jpg">
      </li>
      <li class="spe">
        <div class="name">经理经理的说法</div>
        <div class="desc">df的说法</div>
        <img src="./i/hbg.jpg">
      </li>
      <li class="fir">
        <div class="name">经理经理的说法</div>
        <div class="desc">df的说法</div>
        <img src="./i/hbg.jpg">
      </li>
      <li class="spe fir">
        <div class="name">经理经理的说法</div>
        <div class="desc">df的说法</div>
        <img src="./i/hbg.jpg">
      </li>
      <div class="clearfix"></div>
    </ul>
    <!--推荐的商品-->
    <ul class="recommend">
      <li>
        <img src="./i/hbg.jpg" class="dateImg">
      </li>
      <li>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
      </li>
    </ul>
    <!--推荐的商品-->
    <ul class="recommend">
      <li>
        <img src="./i/hbg.jpg" class="dateImg">
      </li>
      <li>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
      </li>
    </ul>
    <!--推荐的商品-->
    <ul class="recommend">
      <li>
        <img src="./i/hbg.jpg" class="dateImg">
      </li>
      <li>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
        <div class="goods">
          <img src="./i/hbg.jpg" class="dateImg">
          <div class="name">完成任意1次消费即可获得签到资格</div>
          <div class="name money"><label>￥</label>280</div>
        </div>
      </li>
    </ul>
    <div class="guess">猜你喜欢</div>
    <div class="line"></div>
    <ul class="goodsList">
      <li>
        <div class="pic"><img src="./i/hbg.jpg" class="dateImg"></div>
        <div class="name">完成任意1次消费即可获得签到资格</div>
        <div class="name money"><label>￥</label>280</div>
      </li>
      <li class="spe">
        <div class="pic"><img src="./i/hbg.jpg" class="dateImg"></div>
        <div class="name">完成任意1次消费即可获得签到资格</div>
        <div class="name money"><label>￥</label>280</div>
      </li>
      <li>
        <div class="pic"><img src="./i/hbg.jpg" class="dateImg"></div>
        <div class="name">完成任意1次消费即可获得签到资格</div>
        <div class="name money"><label>￥</label>280</div>
      </li>
      <li class="spe">
        <div class="pic"><img src="./i/hbg.jpg" class="dateImg"></div>
        <div class="name">完成任意1次消费即可获得签到资格</div>
        <div class="name money"><label>￥</label>280</div>
      </li>
    </ul>
    <div class="end" style="text-align: center">
      <img  :src="require('src/assets/icon_end.png')">
    </div>
    <section class="fixed"  v-show="showOverlay">
      <img src="./i/close.png" class="close" @click="close">
      <div class="title">
        <div>只差一步</div>
        <div class="tip">完成任意1次消费即可获得签到资格!</div>
      </div>
      <div class="gobuy">去买买买</div>
      <div class="buytips">积分攒着当钱花，线上线下都可花</div>
      <ul class="top-menu bottom">
        <li>
          <div class="name">经理经理的说法</div>
          <div class="desc">df的说法</div>
          <div class="pic"><img src="./i/hbg.jpg"></div>
        </li>
        <li class="spe">
          <div class="name">经理经理的说法</div>
          <div class="desc">df的说法</div>
          <div class="pic"><img src="./i/hbg.jpg"></div>
        </li>
        <li class="fir">
          <div class="name">经理经理的说法</div>
          <div class="desc">df的说法</div>
          <div class="pic"><img src="./i/hbg.jpg"></div>
        </li>
        <li class="spe fir">
          <div class="name">经理经理的说法</div>
          <div class="desc">df的说法</div>
          <div class="pic"><img src="./i/hbg.jpg"></div>
        </li>
        <div class="clearfix"></div>
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
          showOverlay: true
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
      close() {
        this.showOverlay = false;
      }
    }
  };
</script>

