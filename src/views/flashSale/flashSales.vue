<style lang="scss" src="src/sass/_flashSales.scss" scoped></style>
<template>
  <div class="flash-sales">
    <bl-scroll :enableRefresh="false" :on-infinite="onInfinite" :enableInfinite="isLoading" id="container" v-scroll-top v-scroll-record v-scroll-fixed>
      <!-- 轮播图 -->
      <bl-slide class="flash-swipe" v-show="allSlides && allSlides.length" :slides="allSlides" :autoPlay="true"></bl-slide>
      <!-- end -->
      <!-- 分类 -->
      <div class="navigation">
        <ul class="ovfs hide-scrollbar flash-ovfs">
          <li class="ovfs-item" :class="{ active: isActive === '1' }" @click="selectCate('1', undefined, '今日上新')">
            <p>今日上新</p>
          </li>
          <li class="ovfs-item" :class="{ active: isActive === flashCategories}" v-if="flashCategoriesName != '闪购首页'" v-for="({ flashCategories, flashCategoriesName }, index) in queryCate" @click="selectCate(flashCategories, flashCategories, flashCategoriesName)">
            <p v-text="flashCategoriesName"></p>
          </li>
          <li class="ovfs-item" :class="{ active: isActive === '2' }" @click="selectCate('2', undefined, '最后疯抢')">
            <p>最后疯抢</p>
          </li>
          <li class="ovfs-item" :class="{ active: isActive === '3' }" @click="selectCate('3', undefined, 品牌预告)">
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
                <router-link @click.native="sensorAnalytics(item.flashId)" :to="{ path: '/flashsaleproductspage/' + item.flashId + '/' + item.start }" v-if="picturesType === 10" v-for="({ picturesType, picturesUrl }, index) in item.pictures">
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
import urlConfig from 'src/default-urlConfig'
import ScrollTo from 'scroll'

let fnScroll = (el) => {
  return el.offsetLeft - (document.body.clientWidth / 2 - el.clientWidth / 2)
}
export default {

  name: 'keepFlashSales',

  data() {
    return {
      navTab: 0,
      isLoading: true,
      showNo: false,
      loaded: false,
      isActive: '1',
      inlineLoading: null,

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
        this.loaded = true
        this.$loading.close()
      },
      fail: err => this.$toast(JSON.parse(err.result)),
      progress: data => {}
    })
    this.getList()
  },
  activated() {
    if (this.loaded) {
      this.$loading.close()
    }
    let shareParams = {
      url: urlConfig.H5_FLASH,
      title: '精品闪购',
      content: '更多优惠商品，尽在i百联，赶快来抢购吧!'
    }
    window.commShare = function() {
      window.CTJSBridge.LoadMethod('BLShare', 'H5BLShareParams', shareParams)
    }
    // sensor analytics
    try {
      console.log((new Date()).toLocaleString())
      window.sa.track('$pageview', {
        pageId: 'APP_闪购首页',
        categoryId: 'APP_SpecificZone',
        $title: '精品闪购'
      });
    } catch (err) {
      console.log("sa error => " + err);
    }
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
          if (this.inlineLoading) {
            this.inlineLoading.close()
          }
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
          if (this.inlineLoading) {
            this.inlineLoading.close()
          }
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
    selectCate(key, index, flashname) {
      this.inlineLoading = this.$toast({
        iconClass: 'preloader white',
        message: '加载中',
        duration: 'loading'
      })
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
      // sensor analytics
      try {
        console.log('点击分类' + (new Date()).toLocaleString())
        window.sa.track('$pageview', {
          pageId: 'APP_闪购_' + flashname,
          categoryId: 'APP_SpecificZone',
          $title: 'APP_闪购_' + flashname
        });
      } catch (err) {
        console.log("sa error => " + err);
      }
    },
    /* 倒计时 */
    timeCoundDown(val) {
      let endDate = new Date(val.replace(/-/g, "/"));
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
    },
    // 埋点
    sensorAnalytics(flashId) {
      // sensor analytics
      try {
        console.log((new Date()).toLocaleString())
        window.sa.track('$pageview', {
          pageId: 'APP_闪购_' + flashId,
          categoryId: 'APP_SpecificZone',
          $title: 'APP_闪购_' + flashId,
          flagType: '卖场id',
          flagValue: String(flashId)
        })
      } catch (err) {
        console.log("sa error => " + err);
      }
    }
  },
  updated() {
    let nNavTop = $('.navigation')[0].offsetTop
    let nNavHeight = $('.navigation').height()
    let self = this
    $('#container').on('scroll', function(event) {
      if ($('#container')[0].scrollTop > nNavTop) {
        $('.navigation').eq(0).css('padding-top', nNavHeight + 'px').children().addClass('fixed')
      } else {
        $('.navigation').eq(0).css('padding-top', '0px').children().removeClass("fixed")
      }
    });

    $('.flash-ovfs .ovfs-item').on('click', function(event) {
      self.navTab = $(this).index()
    });
  },
  watch: {
    'navTab'(val) {
      this.$nextTick(() => {
        ScrollTo.left($('.flash-ovfs')[0], fnScroll($('.flash-ovfs .ovfs-item').eq(val)[0]))
      });
    }
  }
}
</script>
