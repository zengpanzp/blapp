<style lang="scss" src="./css/_productsListView.scss" scoped></style>
<template>
  <div class="flash-list new">
    <div class="product-filter">
      <ul class="flex">
        <li :class="{ selected: isSelect === 1 }" @click="selected(1)"><div class="flex-c-m">默认</div></li>
        <li :class="{ selected: isSelect === 2 }" @click="[selected(2), isDown = !isDown]">
          <div class="flex-c-m" :class="[ isDown ? 'seldown' : 'selup' ]">
            <div>价格</div>
            <div class="dropup">
              <svg class="icon"><use xlink:href="#icon-dropup"></use></svg>
              <svg class="icon"><use xlink:href="#icon-dropdown"></use></svg>
            </div>
          </div>
        </li>
        <li :class="{ selected: isSelect === 3 }" @click="selected(3)"><div class="flex-c-m">仅显示有货</div></li>
        <li @click="showModel = true"><div class="flex-c-m">筛选</div></li>
      </ul>
    </div>
    <bl-slide-bar
      :showModal="showModel"
      @modalChange="showModel = $event"
      :list="brandList"
      :value="brandSid"
      @input="[brandSid = $event, sureFilter()]"
      :isMutil="true"
      :showReset="true">
    </bl-slide-bar>
    <div class="page-view" id="container" v-infinite-scroll="getListGoods" infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-scroll-top>
      <div class="quickbuy-active">
        <ul>
          <li v-if="picturesType === 11" v-for="({ picturesType, picturesUrl }, index) in flashSalesGoods.pictures">
            <a href="javascript:;">
              <img :src="(picturesUrl || '').replace(/^http:/, '')" alt="">
            </a>
            <div class="quickbuy-active-titles">
              <div class="active-store-logo" v-if="flashSalesGoods.brandList">
                <img :src="(flashSalesGoods.brandList[0].brandLogo || '').replace(/^http:/, '')" :alt="flashSalesGoods.brandList[0].brandNameCN">
              </div>
              <div class="active-title-detail">
                <div class="active-detail-container">
                  <p>{{ flashSalesGoods.flashName }}</p>
                  <p class="discount-store-text">{{ flashSalesGoods.flashAdvertisement }}</p>
                  <p class="discount-num">
                    <label v-if="flashSalesGoods.advType == 0">{{ flashSalesGoods.advValue }}折起</label>
                    <label v-else>{{ flashSalesGoods.advValue }}元起</label>
                  </p>
                </div>
              </div>
            </div>
            <div class="quickbuy-log" v-if="picturesType === 16" v-for="({ picturesType, picturesUrl }, index) in flashSalesGoods.pictures">
              <img :src="(picturesUrl || '').replace(/^http:/, '')">
            </div>
          </li>
        </ul>
      </div>
      <div class="flashtitle">
        <div class="title-head"></div>
        <div class="countdown" id="countdown"></div>
      </div>
      <div id="flashProductsList">
        <ul class="index-productlist">
          <template v-for="item in filterlistGoodsData">
            <li v-go-native-goods-detail="item[0]" :disabled="$route.params.isStart == 0" @click="sensorGoods(item[0], $route.params.isStart)">
              <a href="javascript:;" :class="{ 'end': item[0].isAvailable !== '1' }">
                <span class="endmark" v-if="item[0].isAvailable !== '1'">抢光了</span>
                <div class="lazy-box">
                  <img class="square-lazy" v-lazy.container="{ src: (item[0].goodsImgPath || '').replace(/^http:/, ''), loading: require('src/assets/square_banner_loading.png'), error: require('src/assets/square_banner_loading.png') }" alt="">
                </div>
                <h3>{{ item[0].goodsMsg }}</h3>
                <p><span class="price"><span>¥</span>{{ $route.params.isStart == 0 ? '???' : item[0].marketPrice }}</span><span class="cost">参考价：¥{{ item[0].goodsPrice }}</span></p>
              </a>
            </li>
          </template>
        </ul>
        <div class="infinite-layer" v-if="loading">
          <div class="infinite-preloader"></div>
          <div>加载中...</div>
        </div>
        <div class="no-goods" v-if="noGoods">当前闪购活动没有商品</div>
      </div>
    </div>
  </div>
</template>
<script>
import urlConfig from 'src/default-urlConfig'
import api from './api'
export default {
  name: 'productsListView',
  data() {
    return {
      setTime: null,
      isLoading: true,
      showModel: false,
      isSelect: 1,
      /* false 价格上， true 价格下， 默认价格上 */
      isDown: false,
      brandSid: [],
      noGoods: false,

      /* 商品数据 */
      listGoodsData: [], // 闪购活动商品列表
      flashSalesGoods: {}, // 闪购商品
      requestData: {
        searchInfo: {
          sorCol: '',
          sorTye: '',
          pageModel: {
            pageSize: 10,
            pageNo: 0
          },
          isava: '0',
          props: {}
        },
        isColl: 1,
        channelSid: '1',
        actCode: ''
      },
      busy: true,
      loading: true
    };
  },
  created() {
    /* 获取活动商品 */
    api.queryFlashGoods({
      channelid: 1,
      flashId: this.$route.params.flashId
    }).then(res => {
      if (res.body.obj) {
        let resData = JSON.parse(res.body.obj)
        if (resData.resCode === '00100000') {
          this.$modal({
            content: '找不到该闪购商品',
            buttons: [{
              text: '确定',
              onClick: () => {
                this.$router.replace({ path: '/flashSales' })
              }
            }]
          })
          return
        }
        this.flashSalesGoods = resData
        window.CTJSBridge._setNativeTitle(this.flashSalesGoods.flashName)
        document.title = this.flashSalesGoods.flashName
        this.$loading.close()
        this.requestData.actCode = this.flashSalesGoods.flashCode
        this.$nextTick(() => {
          /* 倒计时 */
          this.countdown(this.flashSalesGoods.effectiveStart, this.flashSalesGoods.effectiveEnd)
          /* 获取商品列表 */
          this.getListGoods(true)
        });

        let shareParams = {
          url: urlConfig.H_FLASHSHOP + 'flashId=' + this.$route.params.flashId,
          title: this.flashSalesGoods.flashName ? this.flashSalesGoods.flashName : '' + '&nbsp;' + this.flashSalesGoods.flashAdvertisement ? this.flashSalesGoods.flashAdvertisement : '',
          content: '更多优惠商品，尽在i百联，赶快来抢购吧!'
        }
        window.commShare = function() {
          window.CTJSBridge.LoadMethod('BLShare', 'H5BLShareParams', shareParams)
        }
      } else {
        this.$toast(res.body.msg)
      }
    })
  },
  mounted() {
    this.sensorAnalytics(this.$route.params.flashId)
  },
  computed: {
    filterlistGoodsData() {
      return this.listGoodsData
    },
    brandList() {
      let tempList = []
      let trueList = this.flashSalesGoods.brandList
      if (trueList && trueList.length) {
        for (let i = 0; i < trueList.length; i++) {
          tempList.push({
            value: trueList[i].brandSid,
            label: trueList[i].brandNameCN
          })
        }
      }
      return tempList
    }
  },
  destroyed() {
    clearTimeout(this.setTime)
    this.$loading.close()
  },
  methods: {
    selected(index) {
      this.loading = true
      this.isSelect = index
      /* 参数调整 */
      this.requestData.searchInfo.pageModel.pageNo = 0
      this.requestData.searchInfo.sorCol = ''
      this.requestData.searchInfo.sorTye = ''
      this.requestData.searchInfo.isava = '0'
      /* 清空商品列表 */
      this.listGoodsData = []
      /* 默认 */
      if (index === 1) {
        this.getListGoods(true)
        return
      }
      /* 价格 */
      if (index === 2) {
        this.requestData.searchInfo.sorCol = 'pri'
        if (this.isDown) {
          this.requestData.searchInfo.sorTye = 1
        } else {
          this.requestData.searchInfo.sorTye = 0
        }
      }
      /* 显示有货 */
      if (index === 3) {
        this.requestData.searchInfo.isava = '1'
      }
      this.getListGoods(true)
    },
    /* 确定 */
    sureFilter() {
      this.loading = true
      /* 参数调整 */
      this.requestData.searchInfo.pageModel.pageNo = 0
      if (this.brandSid.length !== 0) {
        this.requestData.searchInfo.props.brandSid = this.brandSid.toString()
      } else {
        this.requestData.searchInfo.props.brandSid = undefined
      }
      /* 清空商品列表 */
      this.listGoodsData = []
      this.getListGoods(true)
    },
    countdown(startTime, endTime) {
      let startDate = new Date(startTime.replace(/-/g, "/"))
      let endDate = new Date(endTime.replace(/-/g, "/"))
      let countDate
      let flag
      let now = new Date();
      if (now >= startDate) {
        countDate = endDate;
        flag = "后结束"
      } else {
        countDate = startDate;
        flag = "后开售"
      }
      let date3 = countDate.getTime() - now.getTime();
      // 计算天数
      let days = Math.floor(date3 / (24 * 3600 * 1000));
      // 计算出小时数
      let leave1 = date3 % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
      let hours = Math.floor(leave1 / (3600 * 1000));
      // 计算相差分钟数
      let leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
      let minutes = Math.floor(leave2 / (60 * 1000));
      let level3 = leave2 % (60 * 1000);
      let seconds = Math.floor(level3 / 1000);

      $('#countdown').text((days >= 1 ? days + '天' : '') + ((hours < 10 ? '0' + hours : hours) + '小时') + ((minutes < 10 ? '0' + minutes : minutes) + '分钟') + ((seconds < 10 ? '0' + seconds : seconds) + '秒') + flag)
      this.setTime = setTimeout(() => {
        if (minutes === 0 && seconds === 0) {
          clearTimeout(this.setTime)
        }
        this.countdown(startTime, endTime)
      }, 1000)
    },
    getListGoods(once = false) {
      this.noGoods = false
      this.busy = true
      this.requestData.searchInfo.pageModel.pageNo ++
      api.activitySearchGood({
        requestData: JSON.stringify(this.requestData)
      }).then(res => {
        if (res.body.obj) {
          let resData = JSON.parse(res.body.obj)
          if (resData.resultInfo && resData.resultInfo.pageModel && resData.resultInfo.pageModel.rows) {
            let rows = resData.resultInfo.pageModel.rows
            this.listGoodsData.push.apply(this.listGoodsData, rows)
            if (rows && rows.length) {
              this.busy = false
            } else {
              this.loading = false
            }
          } else {
            once && (this.noGoods = true)
            this.loading = false
          }
        }
      })
    },
    sensorGoods(item, isStart) {
      if (isStart != 0) {
        // sensor analytics商品详情埋点
        try {
          console.log((new Date()).toLocaleString() + ' 闪购商品详情埋点')
          sa.track('$pageview', {
            pageId: 'APP_闪购商品详情页_' + item.goodsId,
            categoryId: 'APP_SpecificZone',
            flagType: '商品id',
            flagValue: String(item.goodsId)
          })
        } catch (err) {
          console.log("sa error => " + err);
        }
      }
    },
    // 埋点
    sensorAnalytics(flashId) {
      // sensor analytics
      try {
        console.log((new Date()).toLocaleString() + '闪购卖场埋点')
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
  }
}
</script>
