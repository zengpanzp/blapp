<style lang="scss" src="src/sass/_flashSales.scss" scoped></style>
<template>
  <div class="flash-sales">
    <bl-scroll :enableRefresh="false" :on-infinite="onInfinite" :enableInfinite="isLoading" id="container" v-scroll-top v-scroll-record>
      <!-- 轮播图 -->
      <bl-slide class="flash-swipe" :slides="allSlides"></bl-slide>
      <!-- end -->
      <!-- 分类 -->
      <div class="navigation">
        <ul class="ovfs flash-ovfs">
          <li class="ovfs-item" :class="{ active: isActive === '1' }" @click="selectCate('1')">
            <p>今日上新</p>
          </li>
          <li class="ovfs-item" :class="{ active: isActive === flashCategories}" v-for="({ flashCategories, flashCategoriesName }, index) in queryCate" @click="selectCate(flashCategories, flashCategories)">
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
        <template v-if="filterGetFlashDetailData.length !== 0">
          <div class="todynew" v-for="item in filterGetFlashDetailData">
            <div class="todynew-img">
              <div class="wumengcen" v-if="item.pictures">
                <div class="small-bg" v-if="picturesType === 90" v-for="{ picturesType, picturesUrl } in item.pictures"><img v-lazy="picturesUrl"></div>
                <router-link :to="{ path: '/flashsaleproductspage/' + item.flashId + '/' + item.start }" v-if="picturesType === 10" v-for="({ picturesType, picturesUrl }, index) in item.pictures">
                  <img v-lazy.container="{ src: picturesUrl, loading: require('src/assets/loading.png') }" alt="">
                  <div class="mengcen-bg" v-if="isActive === '3' || isActive === '2'"></div>
                </router-link>
                <div class="jian juan"><span>{{ item.flashAdvertisement }}</span></div>
              </div>
              <div class="D" v-if="isActive === '2'" v-text="timeCoundDown(item.effectiveEnd)"></div>
              <div class="D" v-else-if="isActive === '3'" v-text="timeCoundNotice(item.effectiveStart)"></div>
              <div class="bottom-todynew">
                <div class="le-fonts"><img v-lazy="item.brandList[0].brandLogo" :alt="item.brandList[0].brandNameCN"></div>
                <div class="dd-fonts">
                  <div class="le2-fonts" v-text="item.flashName"></div>
                  <div class="tian-number" v-if="isActive === '3' || isActive === '2'"></div>
                  <div class="tian-number" v-else v-text="timeCoundDown(item.effectiveEnd)"></div>
                </div>
                <div class="ri-fonts" v-if="item.advType == 0"><span v-text="item.advValue"></span>折起</div>
                <div class="ri-fonts" v-else><span v-text="item.advValue"></span>元起</div>
              </div>
            </div>
          </div>
        </template>
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
  </div>
</template>
<script>
export default {

  name: 'keepFlashSales',

  data() {
    return {
      isLoading: true,
      showNo: false,
      isActive: '1',

      /* 活动列表 */
      pages: 0, // 总页数
      getFlashDetailData: [], // 商品列表数据
      requestData: {
        channelid: 1,
        type: 1,
        pageNum: 1,
        pageSize: 10,
        parameter: 0,
        flashCategories: ''
      }
    }
  },
  created() {
    /* 获取轮播图 */
    window.CTJSBridge.LoadAPI("BLAPPSiteQueryAdDeployAPIManager", {resourceId: 500}, {
      success: res => {
        let resData = window.JSON.parse(res)
        this.allSlides = resData.otherResource[0].advList
      },
      fail: err => console.log(err),
      progress: data => {}
    })
    /* 获取分类 */
    window.CTJSBridge.LoadAPI("BLPromotionQueryFlashCategoryAPIManager", {channelld: 1}, {
      success: res => {
        let resData = window.JSON.parse(res)
        this.queryCate = resData.list
        this.$loading.close()
      },
      fail: err => this.$toast(JSON.parse(err.result)),
      progress: data => {}
    })
    this.getList()
  },
  computed: {
    filterGetFlashDetailData() {
      return this.getFlashDetailData
    }
  },
  methods: {
    /* 滑到底部加载数据 */
    onInfinite(done) {
      if (this.requestData.pageNum >= this.pages) {
        this.$toast({
          position: 'bottom',
          message: '已经是最后一页'
        })
        this.isLoading = false
        done()
      } else {
        this.requestData.pageNum ++
        this.getList(done)
      }
    },
    getList(done) {
      this.showNo = false

      window.CTJSBridge.LoadAPI("BLPromotionQueryFlashListAPIManager", this.requestData, {
        success: (res) => {
          let resData = window.JSON.parse(res)
          /* 没数据了 */
          if (resData.count === 0 || resData.result === 'fail') {
            this.showNo = true
            this.isLoading = false
            return
          }
          this.pages = resData.pages
          for (let i = 0; i < resData.list.length; i++) {
            resData.list[i].start = this.isStart(resData.list[i].effectiveStart)
          }
          this.getFlashDetailData = this.getFlashDetailData.concat(resData.list)

          if (this.getFlashDetailData.length < this.requestData.pageSize) {
            this.isLoading = false
          } else {
            this.isLoading = true
          }
          if (done) {
            done()
          }
        },
        fail: (res) => {
          /* 没数据了 */
          let resData = window.JSON.parse(res)
          if (resData.count === 0 || resData.result === 'fail') {
            this.showNo = true
            this.isLoading = false
            return
          }
          if (done) {
            done()
          }
        },
        progress: (data) => {}
      })
    },
    /* 点击分类加载数据 */
    selectCate(key, index) {
      this.isLoading = true
      this.requestData.flashCategories = parseInt(index)
      this.isActive = key
      if (index === undefined) {
        this.requestData.type = parseInt(key)
      } else {
        this.requestData.type = 1
      }
      this.requestData.pageNum = 1
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
    },
    isStart(start) {
      let startTime = start.replace(/-/g, "/");
      let startDate = new Date(startTime);
      let now = new Date();
      if (now >= startDate) {
        return 1;
      }
      return 0;
    }
  }
}
</script>
