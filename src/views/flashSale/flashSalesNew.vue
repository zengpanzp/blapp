<style lang="scss" src="./css/_flashSales.scss" scoped></style>
<template>
  <div>
    <div class="flash-sales" id="container" v-scroll-top v-scroll-record>
      <!-- 轮播图 -->
      <bl-slide class="flash-swipe" :slides="allSlides" :autoPlay="true"></bl-slide>
      <!-- end -->
      <!-- 分类 -->
      <div class="navigation tab-box-sticky">
        <ul class="ovfs hide-scrollbar flash-ovfs">
          <li class="ovfs-item" :class="{ active: isActive == 'j' }" @click="selectCate('j', undefined, '今日上新')">
            <p>今日上新</p>
          </li>
          <li class="ovfs-item" :class="{ active: isActive == item.flashCategories}" v-if="item.flashCategoriesName != '闪购首页'" v-for="(item, index) in queryCate" @click="selectCate(item.flashCategories, item.flashCategories, item.flashCategoriesName, item)">
            <p v-text="item.flashCategoriesName"></p>
          </li>
          <li class="ovfs-item" :class="{ active: isActive == 'z' }" @click="selectCate('z', undefined, '最后疯抢')">
            <p>最后疯抢</p>
          </li>
          <li class="ovfs-item" :class="{ active: isActive == 'p' }" @click="selectCate('p', undefined, 品牌预告)">
            <p>品牌预告</p>
          </li>
        </ul>
      </div>
      <!-- <iframe v-if="miniUrl" :src="miniUrl.replace(/^http:/, '')" id="Iframe" frameborder="0" scrolling="yes" style="border:0px; width:100%;"></iframe> -->
      <!-- end -->
      <!-- 闪购商品列表 -->
      <div class="flash-list" v-infinite-scroll="getList" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <template>
          <div class="todynew" v-for="item in filterGetFlashDetailData">
            <div class="todynew-img">
              <div class="wumengcen" v-if="item.pictures">
                <div class="small-bg flex-c-m" v-if="picturesType === 90" v-for="{ picturesType, picturesUrl } in item.pictures"><img :src="(picturesUrl || '').replace(/^http:/, '')"></div>
                <router-link :to="{ path: '/flashsaleproductspage/' + item.flashId + '/' + isStart(item.effectiveStart) }" v-if="picturesType === 10" v-for="({ picturesType, picturesUrl }, index) in item.pictures">
                  <img v-lazy.container="{ src: (picturesUrl || '').replace(/^http:/, '') }" alt="">
                  <div class="mengcen-bg" v-if="isActive === 'p' || isActive === 'z'"></div>
                </router-link>
                <div class="jian juan"><span>{{ item.flashAdvertisement }}</span></div>
              </div>
              <div class="D" v-if="isActive === 'z'" v-text="timeCoundDown(item.effectiveEnd)"></div>
              <div class="D" v-else-if="isActive === 'p'" v-text="timeCoundNotice(item.effectiveStart)"></div>
              <div class="bottom-todynew">
                <div class="le-fonts"><img :src="(item.brandList[0].brandLogo || '').replace(/^http:/, '')" :alt="item.brandList[0].brandNameCN"></div>
                <div class="dd-fonts">
                  <div class="le2-fonts" v-text="item.flashName"></div>
                  <div class="tian-number" v-if="isActive === 'p' || isActive === 'z'"></div>
                  <div class="tian-number" v-else v-text="timeCoundDown(item.effectiveEnd)"></div>
                </div>
                <div class="ri-fonts" v-if="item.advType == 0"><span v-text="item.advValue"></span>折起</div>
                <div class="ri-fonts" v-else><span v-text="item.advValue"></span>元起</div>
              </div>
            </div>
          </div>
        </template>
        <div class="infinite-layer" v-if="loading">
          <div class="infinite-preloader"></div>
          <div>加载中...</div>
        </div>
        <div class="no-flash-list" v-if="showNo">暂时没有该闪购活动</div>
      </div>
      <!-- end -->
      <!-- bottom -->
      <div class="bot-shangou">
        <div class="title-todynew todynew2">
          <div>
            <span>i百联精品闪购</span>
          </div>
        </div>
        <div class="bot-fonts">每天10点惊喜诞生</div>
      </div>
      <!-- bottom end-->
    </div>
  </div>
</template>
<script>
import urlConfig from 'src/default-urlConfig'
import ScrollTo from 'scroll'
import api from './api'

let fnScroll = (el) => {
  return el.offsetLeft - (document.body.clientWidth / 2 - el.clientWidth / 2)
}
export default {

  name: 'keepFlashSales',

  data() {
    return {
      navTab: 0,
      showNo: false,
      loaded: false,
      isActive: this.$route.query.flashCategories ? String(this.$route.query.flashCategories) : 'j',
      inlineLoading: null,

      /* 活动列表 */
      allSlides: [],
      // pages: 0, // 总页数
      getFlashDetailData: [], // 商品列表数据
      queryCate: [], // 分类
      requestData: {
        channelid: 1,
        type: 1,
        pageNum: 0,
        pageSize: 10,
        parameter: 0,
        flashCategories: parseFloat(this.$route.query.flashCategories).toString() !== "NaN" ? String(this.$route.query.flashCategories) : ''
      },
      miniUrl: '', // CMS页面的URL
      busy: false,
      loading: true
    }
  },
  created() {
    /* 获取轮播图 */
    api.queryAdDeploy({
      otherresource: {
        resourceId: 500
      }
    }).then(res => {
      if (res.body.obj) {
        let resData = JSON.parse(res.body.obj).obj
        this.allSlides = resData.otherResource[0].advList
        this.$nextTick(() => {
          this.scrollFixed()
        });
      } else {
        this.$toast(res.body.msg)
      }
    })
    /* 获取分类 */
    api.queryFlashCategory({
      channelid: '1'
    }).then(res => {
      if (res.body.obj) {
        let resData = JSON.parse(res.body.obj)
        this.$nextTick(() => {
          this.queryCate = resData.list
          if (this.queryCate[0].miniList && this.queryCate[0].miniList.length && this.queryCate[0].miniList[0].miniUrl) {
            setTimeout(() => {
              this.miniUrl = this.queryCate[0].miniList[0].miniUrl
            }, 100)
          }
          this.$loading.close()
        });
        if (this.$route.query.flashCategories && parseFloat(this.$route.query.flashCategories).toString() !== "NaN") {
          setTimeout(() => {
            this.navTab = parseInt(this.$route.query.flashCategories) + 1
          }, 100)
        }
      } else {
        this.$toast(res.body.msg)
      }
    })
    let shareParams = {
      url: urlConfig.H5_FLASH,
      title: '精品闪购',
      content: '更多优惠商品，尽在i百联，赶快来抢购吧!'
    }
    window.commShare = function() {
      window.CTJSBridge.LoadMethod('BLShare', 'H5BLShareParams', shareParams)
    }
  },
  activated() {
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
    getList() {
      this.busy = true
      this.showNo = false
      this.requestData.pageNum ++
      api.queryFlashList(this.requestData).then(res => {
        if (this.inlineLoading) {
          this.inlineLoading.close()
        }
        if (res.body.obj) {
          let resData = JSON.parse(res.body.obj)
          /* 没数据了 */
          if (resData.count === 0 || resData.result === 'fail') {
            this.showNo = true
            this.loading = false
            return
          }
          this.getFlashDetailData.push.apply(this.getFlashDetailData, resData.list)
          if (resData.list && resData.list.length) {
            this.busy = false
          } else {
            this.loading = false
          }
        } else {
          this.$toast(res.body.msg)
        }
      })
    },
    /* 点击分类加载数据 */
    selectCate(key, index, flashname, item) {
      $('#container')[0].scrollTop = 0
      if (item && item.miniList && item.miniList.length) {
        setTimeout(() => {
          this.miniUrl = item.miniList[0].miniUrl
        }, 100)
      } else {
        this.miniUrl = ''
      }
      if (key == 'j' && this.queryCate[0].miniList && this.queryCate[0].miniList.length && this.queryCate[0].miniList[0].miniUrl) {
        this.miniUrl = this.queryCate[0].miniList[0].miniUrl
      }
      this.inlineLoading = this.$toast({
        iconClass: 'preloader white',
        duration: 'loading',
        className: 'loading-bg'
      })
      this.loading = true
      this.requestData.flashCategories = parseInt(index) || ''
      this.isActive = key
      if (index === undefined) {
        if (key === 'z') {
          this.requestData.type = 2
        } else if (key === 'p') {
          this.requestData.type = 3
        } else if (key === 'j') {
          this.requestData.type = 1
        }
      } else {
        this.requestData.type = 1
      }
      this.requestData.pageNum = 0
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
    scrollFixed() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
      if (isAndroid) {
        let nNavTop = $('.navigation')[0].offsetTop
        let nNavHeight = $('.navigation').height()
        $('#container').on('scroll', function(event) {
          let w = $(this)[0].scrollTop
          if (w > nNavTop) {
            $('.navigation').eq(0).css('padding-top', nNavHeight + 'px').children().addClass('fixed')
          } else {
            $('.navigation').eq(0).css('padding-top', '0px').children().removeClass("fixed")
          }
        });
      }
    }
  },
  updated() {
    let self = this
    $('.flash-ovfs .ovfs-item').on('click', function(event) {
      console.log($(this).index())
      self.navTab = $(this).index()
    });
  },
  mounted() {
    this.loaded = true
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
