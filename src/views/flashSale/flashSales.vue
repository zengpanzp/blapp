<template>
  <bl-scroll :enableRefresh="false" :on-infinite="onInfinite" :enableInfinite="isLoading" id="container" v-scroll-top>
    <!-- 轮播图 -->
    <bl-slide class="flash-swipe" v-model="isSwipeLoading">
      <bl-slide-item v-for="({jumpId, mediaUrl, deployName}, index) in allSlides">
        <router-link :to="{ path: '/flashsaleproductspage/' + jumpId + '/1' }"><img :_src="mediaUrl" :alt="deployName"></a>
      </bl-slide-item>
    </bl-slide>
    <!-- end -->
    <!-- 分类 -->
    <div class="navigation">
      <ul class="ovfs flash-ovfs">
        <li class="ovfs-item" :class="{ active: isActive === '1' }" @click="selectCate('1')">
          <p>今日上新</p>
        </li>
        <li class="ovfs-item" :class="{ active: isActive === flashCategories}" v-for="({ flashCategories, flashCategoriesName }, index) in queryCate" @click="selectCate(flashCategories, index)">
          <p v-text="flashCategoriesName"></p>
        </li>
        <li class="ovfs-item" :class="{ active: isActive === '2' }" @click="selectCate('2')">
          <p>最后疯抢</p>
        </li>
        <li class="ovfs-item" :class="{ active: isActive === '3' }" @click="selectCate('3')">
          <p>品牌预告</p>
        </li>
      </ul>
    </div>
    <!-- end -->
    <!-- 闪购商品列表 -->
    <div class="flash-list">
      <div class="todynew" v-for="(item, index) in getFlashDetailData">
        <div class="todynew-img">
          <div class="wumengcen" v-if="item.pictures">
            <router-link :to="{ path: '/flashsaleproductspage/' + item.flashId + '/1' }" v-if="picturesType === 10" v-for="({ picturesType, picturesUrl }, index) in item.pictures">
              <img v-lazy.container="{ src: picturesUrl, loading: require('./loading.png') }" alt="">
              <div class="mengcen-bg" v-if="isActive === '3'"></div>
              <div class="mengcen-bg" v-else-if="isActive === '2'"></div>
            </router-link>
            <div class="jian juan"><span>{{ item.flashAdvertisement }}</span></div>
          </div>
          <div class="D" v-if="isActive === '2'" v-text="timeCoundDown(item.effectiveEnd)"></div>
          <div class="D" v-else-if="isActive === '3'" v-text="timeCoundNotice(item.effectiveStart)"></div>
          <div class="bottom-todynew">
            <div class="le-fonts"><img :src="item.brandList[0].brandLogo" :alt="item.brandList[0].brandNameCN"></div>
            <div class="dd-fonts">
              <div class="le2-fonts" v-text="item.flashName"></div>
              <div class="tian-number" v-if="isActive === '3'"></div>
              <div class="tian-number" v-else-if="isActive === '2'"></div>
              <div class="tian-number" v-else v-text="timeCoundDown(item.effectiveEnd)"></div>
            </div>
            <div class="ri-fonts"><span v-text="item.advValue"></span>折起</div>
          </div>
        </div>
      </div>
      <div class="no-flash-list" v-if="showNo">暂时没有该闪购活动</div>
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
      showNo: false,
      isActive: '1',

      /* 活动列表 */
      type: 1,
      pageNum: 1,
      pageSize: 10,
      flashCategories: '',
      getFlashDetailData: []
    }
  },
  mounted() {
    this.loading = this.$toast({
      iconClass: 'preloader white',
      message: '加载中',
      duration: 'loading',
      className: 'white-bg'
    })
    /* 获取轮播图 */
    this.$store.dispatch('allSlides', {
      resourceId: 500
    }).then(() => {
      this.isSwipeLoading = false
    })
    /* 获取分类 */
    this.$store.dispatch('queryCate', {
      channelld: 1
    }).then(() => {
      this.loading.close()
    })
    this.getList()
  },
  computed: {
    ...mapGetters([
      'allSlides', // 轮播图数据
      'queryCate', // 分类数据
      'getFlashDetail', // 活动列表数据
      'pages' // 总页数数据
    ])
  },
  methods: {
    /* 滑到底部加载数据 */
    onInfinite(done) {
      if (this.getFlashDetail.length < this.pageSize) {
        this.$toast({
          position: 'bottom',
          message: '已经是最后一页'
        })
        this.isLoading = false
      }
      this.pageNum ++
      this.getList(done)
    },
    getList(done) {
      /* 获取活动列表 */
      this.$store.dispatch('getFlashDetail', {
        channelid: 1,
        type: this.type,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        parameter: 0,
        flashCategories: (this.flashCategories === '') ? undefined : parseInt(this.flashCategories),
      }).then(() => {
        this.getFlashDetailData = this.getFlashDetailData.concat(this.getFlashDetail)
        if (this.getFlashDetailData.length === 0) {
          this.showNo = true
          this.isLoading = false
        }
        done()
      })
    },
    /* 点击分类加载数据 */
    selectCate(key, index) {
      this.showNo = false
      this.isLoading = true
      this.flashCategories = index + 1
      this.isActive = key
      if (index === undefined) {
        this.type = parseInt(key)
      } else {
        this.type = 1
      }
      this.pageNum = 1
      this.getFlashDetailData = []
      this.getList()
    },
    /* 倒计时 */
    timeCoundDown(val) {
      let endDate = new Date(val);
      let now = new Date();
      let date3 = endDate.getTime() - now.getTime();
      // 计算天数
      let days = Math.floor(date3 / (24 * 3600 * 1000));
      if (days > 1) {
        return ('仅剩' + days + '天')
      } else {
        return ('仅剩1天')
      }
    },
    /* 预告 */
    timeCoundNotice(val) {
      let month = val.substring(5, 7);
      let day = val.substring(8, 10);
      let time = val.substring(10, 16);
      return month + '月' + day + '日' + ' ' + time + '开抢'
    }
  }
}
</script>
