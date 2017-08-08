<template>
  <div class="evaluation">
    <div class="fix-box" ref="fixBox">
      <!-- 轮播图 -->
      <bl-slide class="evaluation-swipe" :slides="allSlides" :autoPlay="true"></bl-slide>
      <!-- end -->
      <bl-navbar class="collection-tab flex" v-model="tabsModel" v-show="!$route.query.orderNo">
        <bl-tab-item class="flex-item flex-c-m" v-for="(item, index) in filterEleTabs" :id="index" @click.native="changeTab(index, item)"><span>{{ item.deployName }}({{ item.num }})</span></bl-tab-item>
      </bl-navbar>
    </div>
    <div class="fix-height" :class="{ 'no-slides': allSlides.length > 0 }" v-show="!$route.query.orderNo"></div>
    <div class="goods-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="goods-item flex" v-for="item in list">
        <div class="goods-img lazy-box">
          <img class="square-lazy" v-lazy="{ src: item.productPic, loading: require('src/assets/square_banner_loading.png'), error: require('src/assets/square_banner_loading.png') }">
        </div>
        <div class="goods-des flex-item">
          <div class="goods-title">{{item.productName}}</div>
          <div class="goods-text" v-if="type == '00' || item.isvalid == -1">评价+晒单最多可获得30积分</div>
          <div class="goods-text" v-else-if="type == '05' || item.isvalid != -1 && item.ispic == '00'">评价+晒单最多可获得20积分</div>
          <div class="goods-btn-group">
            <bl-button type="outlineMain" inline size="small" @click="routerReturn('/addComment', item)" v-if="type == '00' || item.isvalid == -1">评价晒单</bl-button>
            <bl-button type="outlineMain" inline size="small" @click="routerReturn('/commentAfter', item)" v-else-if="type == '05' || item.isvalid != -1 && item.ispic == '00'">追加晒单</bl-button>
            <bl-button type="outlineMain" inline size="small" @click="routerReturn('/seeComment', item)" :class="{ 'disabled-color': item.isCanZP != '01' }" v-else-if="item.isCanZP != '01' || item.commentAgain">查看评价</bl-button>
            <bl-button type="outlineMain" inline size="small" @click="routerReturn('/addCommentAgain', item)" v-else>追加评价</bl-button>
          </div>
        </div>
      </div>
      <div class="infinite-layer" v-if="loading">
        <div class="infinite-preloader"></div>
        <div>加载中...</div>
      </div>
    </div>
    <div class="goods-no" v-if="noRows">
      <div class="no-text">评价晒单最多可获得30积分,积分可抵现哦!</div>
      <div class="no-des">可以去看看哪些想看的</div>
      <bl-button type="outlineMain" @click="goHome" inline size="small">去逛逛</bl-button>
    </div>
  </div>
</template>
<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'evaluation',

  data() {
    return {
      memberId: '',
      noRows: false,
      loading: true,
      tabsModel: 0,
      filterEleTabs: [{
        deployName: '待评价',
        num: 0,
        type: '00',
        tab: '0'
      }, {
        deployName: '待晒单',
        num: 0,
        type: '05',
        tab: '1'
      }, {
        deployName: '晒单完成',
        num: 0,
        type: '01',
        tab: '2'
      }],
      type: '00',
      allSlides: [],
      busy: true,
      pageNum: 1,
      list: []
    };
  },
  created() {
    // 评价埋点
    try {
      console.log((new Date()).toLocaleString() + 'APP_我的评价')
      sa.track('$pageview', {
        pageId: 'APP_我的评价',
        categoryId: 'APP_User',
        $title: '我的评价'
      });
    } catch (err) {
      console.log("sa error => " + err);
    }
    this.memberId = utils.dbGet('userInfo').member_id
    if (this.$route.query.orderNo) {
      window.CTJSBridge && window.CTJSBridge._setNativeTitle("商品列表")
      this.type = -1
      this.filterEleTabs = []
      this.loadMore(true)
      return
    }
    api.queryAdDeploy({
      otherresource: {
        resourceId: "1223,1225"
      },
      activity: []
    }).then(data => {
      console.log("-------pic----" + data.body.obj)
      // this.$loading.close()
      if (data.body.obj) {
        let resData = JSON.parse(data.body.obj)
        if (resData && resData.obj.otherResource) {
          for (let item of resData.obj.otherResource) {
            if (item.resourceId == 1223) {
              this.allSlides = item.advList
            }
            if (item.resourceId == 1225) {
              item.advList[0] && window.CTJSBridge.LoadMethod('BLMyComment', 'setPopDownInfo', item.advList[0])
            }
          }
        }
      }
    }, err => {
      console.log(err)
    })
    this.tabsModel = this.$route.query.tab || this.filterEleTabs[0].tab
    this.type = this.filterEleTabs[this.tabsModel].type
    this.queryCount()
    this.loadMore(true)
  },
  mounted() {
    window.currentPageReload = this.currentPageReload
  },
  methods: {
    goHome() {
      window.CTJSBridge.LoadMethod('BLPageManager', 'pagemanagerNavigateToHome', {
        pageId: ''
      })
    },
    // 刷新
    currentPageReload() {
      if (!this.$route.query.orderNo) {
        this.queryCount()
      }
      this.loadMore(true)
    },
    // 查询tab评价数量
    queryCount() {
      api.queryCount({
        memberId: this.memberId,
        channelId: 1
      }).then(data => {
        // this.$loading.close()
        if (data.body.obj) {
          let resData = JSON.parse(data.body.obj)
          if (resData && resData.resultInfo) {
            this.filterEleTabs[0].num = resData.resultInfo.neceCount
            this.filterEleTabs[1].num = resData.resultInfo.necePicCount
            this.filterEleTabs[2].num = resData.resultInfo.finishCount
          }
        } else {
          this.$toast(data.body.msg)
        }
      }, err => {
        console.log(err)
      })
    },
    // 切换tab
    changeTab(index, item) {
      this.$router.replace({
        path: '/myEvaluation',
        query: {
          tab: item.tab
        }
      })
      this.pageNum = 1
      this.type = item.type
      this.loadMore(true)
    },
    thenFn(data, once) {
      this.$loading.close()
      if (data.body.obj) {
        let obj = data.body.obj.replace(/http:\/\//g, "https://")
        let resData = JSON.parse(obj)
        console.log(resData)
        let resRow = []
        if (resData.resultInfo && resData.resultInfo.rows) {
          resRow = resData.resultInfo.rows
        } else if (resData.resultInfo && resData.resultInfo.length > 0) {
          resRow = resData.resultInfo
        }
        if (resRow && resRow.length) {
          this.loading = true
          this.busy = false
          this.list = this.list.concat(resRow)
        } else if (once) {
          this.loading = false
          this.noRows = true
        } else {
          this.loading = false
        }
        if (resRow.length < 10) {
          this.loading = false
          this.busy = true
        }
      }
    },
    // 根据类型查询评论信息
    loadMore(once = false) {
      if (once) {
        this.list = []
      }
      this.busy = true
      this.noRows = false
      let orderNo = this.$route.query.orderNo
      if (orderNo) {
        api.queryComnentByorder({
          orderNo: orderNo
        }).then(data => {
          this.thenFn(data, once)
        })
      } else {
        api.queryCommentBytype({
          memberId: this.memberId,
          channelId: 1,
          type: this.type,
          pageSize: 10,
          pageNo: this.pageNum++
        }).then(data => {
          this.thenFn(data, once)
        })
      }
    },
    // 统一跳转方法
    routerReturn(path, item) {
      this.$router.push({
        path: path,
        query: {
          data: encodeURIComponent(JSON.stringify(item))
        }
      })
    }
  },
  // 控制路由跳转
  beforeRouteEnter(to, from, next) {
    utils.isLogin().then(user => {
      next()
    })
  }
}
</script>
<style lang="scss" src="./css/evaluation.scss" scoped></style>
<style lang="scss">
@import "src/sass/tobe/function";
.swiper-container.evaluation-swipe {
  height: rem(200);
}
</style>
