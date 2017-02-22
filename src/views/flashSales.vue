<template>
  <bl-scroll :enableRefresh="false" :on-infinite="onInfinite" :enableInfinite="isLoading">
    <!-- 轮播图 -->
    <bl-slide class="flash-swipe">
      <template v-for="({jumpId, mediaUrl}, index) in slides">
        <bl-slide-item>
          <a href="javascript:;" :data-id="jumpId"><img :_src="mediaUrl" alt=""></a>
        </bl-slide-item>
      </template>
    </bl-slide>
    <!-- end -->
    <!-- 分类 -->
    <div class="navigation">
      <ul class="ovfs flash-ovfs">
        <li class="ovfs-item active">
          <p>今日上新</p>
        </li>
        <li class="ovfs-item">
          <p>最后疯抢</p>
        </li>
        <li class="ovfs-item">
          <p>品牌预告</p>
        </li>
      </ul>
    </div>
    <!-- end -->
    <!-- 闪购商品列表 -->
    <div class="flash-list">
      <div class="todynew">
        <div class="title-todynew">
          <div>
            <span>今日上新</span>
          </div>
        </div>
        <div class="todynew-img">
          <div class="wumengcen">
            <a href="javascript:;"><img src="http://placeholder.qiniudn.com/750x320" alt=""></a>
            <!-- <div class="small-bg"><img src="images/flashSales/shangoubg.png" alt=""></div> -->
            <div class="jian juan"><span>全场满99元减30元</span><i class="jj"><img src="../assets/flashSales/coupon.png" alt=""></i></div>
          </div>
          <div class="bottom-todynew">1
            <!-- <div class="le-fonts"><img src="images/flashSales/flashSales-logo.png" alt=""></div> -->
            <div class="dd-fonts">
              <div class="le2-fonts">霉霉闺蜜天团美物集合</div>
              <div class="tian-number">仅剩3天</div>
            </div>
            <div class="ri-fonts"><span>5.9</span>折起</div>
          </div>
        </div>
      </div>
      <div class="todynew">
        <div class="title-todynew">
          <div>
            <span>最后疯抢</span>
          </div>
        </div>
        <div class="todynew-img">
          <div class="mengcen">
            <a href="javascript:;"><img src="http://placeholder.qiniudn.com/750x320" alt=""></a>
            <div class="mengcen-bg"></div>
            <div class="jian"><span>全场满99元减30元</span></div>
          </div>
          <div class="D"><span>仅剩1天</span></div>
          <div class="bottom-todynew">
            <!-- <div class="le-fonts"><img src="images/flashSales/flashSales-logo.png" alt=""></div> -->
            <div class="le2-fonts">霉霉闺蜜天团美物集合</div>
            <div class="ri-fonts"><span>5.9</span>折起</div>
          </div>
        </div>
      </div>
      <div class="todynew">
        <div class="title-todynew">
          <div>
            <span>品牌预告</span>
          </div>
        </div>
        <div class="todynew-img">
          <div class="mengcen">
            <a href="javascript:;"><img src="http://placeholder.qiniudn.com/750x320" alt=""></a>
            <div class="mengcen-bg"></div>
            <div class="jian"><span>全场满99元减30元</span></div>
          </div>
          <div class="D"><span>8月8日 10:00开抢</span></div>
          <div class="bottom-todynew">
            <!-- <div class="le-fonts"><img src="images/flashSales/flashSales-logo.png" alt=""></div> -->
            <div class="le2-fonts">霉霉闺蜜天团美物集合</div>
            <div class="ri-fonts"><span>5.9</span>折起</div>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <!-- bottom -->
    <div class="bot-shangou">
      <div class="title-todynew todynew2">
        <div>
          <span>i百联 精品闪购</span>
        </div>
      </div>
      <div class="bot-fonts">每天10点惊喜诞生</div>
    </div>
    <!-- bottom end-->
  </bl-scroll>
</template>
<script>
import { mapGetters } from 'vuex'
export default {

  name: 'flashSales',

  components: {},
  data() {
    return {
      isLoading: true
    }
  },
  created() {
    this.$store.dispatch('getFlashSlides', {
      resourceId: 500
    })
  },
  computed: {
    ...mapGetters({
      slides: 'allSlides'
    })
  },
  mounted() {
    console.log(this.slides)
  },
  methods: {
    onRefresh(done) {
      console.log('refresh')
      setTimeout(() => {
        done();
      }, 2000)
    },
    onInfinite(done) {
      console.log('infinite')
      setTimeout(() => {
        this.isLoading = false
      }, 2000)
    }
  }
}
</script>
