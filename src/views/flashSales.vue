<template>
  <bl-scroll :enableRefresh="false" :on-infinite="onInfinite" :enableInfinite="isLoading">
    <!-- 轮播图 -->
    <bl-slide class="flash-swipe" v-model="isSwipeLoading">
        <bl-slide-item v-for="({jumpId, mediaUrl, deployName}, index) in allSlides">
          <a href="javascript:;" :data-jump-id="jumpId || ''"><img :_src="mediaUrl" :alt="deployName"></a>
        </bl-slide-item>
    </bl-slide>
    <!-- end -->
    <!-- 分类 -->
    <div class="navigation">
      <ul class="ovfs flash-ovfs">
        <li class="ovfs-item" :class="{ active: isActive === 'j' }" @click="selectCate('j')">
          <p>今日上新</p>
        </li>
        <li class="ovfs-item" :class="{ active: isActive === flashCategories}" v-for="({ flashCategories, flashCategoriesName }, index) in queryCate" @click="selectCate(flashCategories)">
          <p v-text="flashCategoriesName"></p>
        </li>
        <li class="ovfs-item" :class="{ active: isActive === 'z' }" @click="selectCate('z')">
          <p>最后疯抢</p>
        </li>
        <li class="ovfs-item" :class="{ active: isActive === 'p' }" @click="selectCate('p')">
          <p>品牌预告</p>
        </li>
      </ul>
    </div>
    <!-- end -->
    <!-- <div class="title-todynew">
      <div>
        <span>今日上新</span>
      </div>
    </div> -->
    <!-- 闪购商品列表 -->
    <div class="flash-list">
      <div class="todynew" v-for="(item, index) in getFlashDetail">
        <div class="todynew-img">
          <div class="wumengcen">
            <a href="javascript:;"><img :src="item.pictures[3].picturesUrl" alt=""></a>
            <div class="small-bg" style="display: none;"><img src="" alt=""></div>
            <div class="jian juan"><span v-text="item.flashAdvertisement"></span><!-- <i class="jj"><img src="../assets/flashSales/coupon.png" alt=""></i> --></div>
          </div>
          <div class="bottom-todynew">
            <div class="le-fonts"><img :src="item.brandList[0].brandLogo" :alt="item.brandList[0].brandNameCN"></div>
            <div class="dd-fonts">
              <div class="le2-fonts" v-text="item.flashName"></div>
              <div class="tian-number">仅剩3天</div>
            </div>
            <div class="ri-fonts"><span v-text="item.advValue"></span>折起</div>
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
      loading: null,
      isLoading: true,
      isSwipeLoading: true,
      isActive: 'j',

      /* 活动列表 */
      type: 1,
      pageNum: 1,
      pageSize: 10,
      flashCategories: ''
    }
  },
  created() {
    this.loading = this.$toast({
      iconClass: 'preloader white',
      message: '加载中',
      duration: 'loading'
    })
    /* 获取轮播图 */
    this.$store.dispatch('allSlides', {
      resourceId: 500
    }).then(() => {
      this.isSwipeLoading = false
      /* 获取分类 */
      this.$store.dispatch('queryCate', {
        channelld: 1
      }).then(() => {
        this.getList()
      })
    })
  },
  computed: {
    ...mapGetters([
      'allSlides',
      'queryCate',
      'getFlashDetail',
      'pages'
    ])
  },
  mounted() {
    console.log(this.pageNum)
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
      if (this.pageNum >= this.pages) {
        this.$toast({
          position: 'bottom',
          message: '已经是最后一页'
        })
        this.isLoading = false
      } else {
        this.pageNum = this.pageNum + 1
        /* 获取活动列表 */
        this.$store.dispatch('getFlashDetail', {
          channelid: 1,
          type: this.type,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          parameter: 0,
          flashCategories: (this.flashCategories === '') ? undefined : parseInt(this.flashCategories),
        }).then(() => {
          this.loading.close()
        })
        console.log(this.pages)
      }
    },
    selectCate(key) {
      this.isActive = key
    }
  }
}
</script>
