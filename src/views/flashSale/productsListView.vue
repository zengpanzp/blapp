<style lang="scss" src="src/sass/productsListView.scss"></style>
<template>
  <div class="flash-list new">
    <bl-scroll :enableRefresh="false" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-top v-scroll-record>
      <div class="quickbuy-active">
        <ul>
          <li v-if="picturesType === 11" v-for="({ picturesType, picturesUrl }, index) in flashSalesGoods.pictures">
            <a href="javascript:;">
              <img :src="picturesUrl" alt="">
            </a>
            <div class="quickbuy-active-titles">
              <div class="active-store-logo" v-if="flashSalesGoods.brandList">
                <img v-lazy="flashSalesGoods.brandList[0].brandLogo" :alt="flashSalesGoods.brandList[0].brandNameCN">
              </div>
              <div class="active-title-detail">
                <div class="active-detail-container">
                  <p>{{ flashSalesGoods.flashName }}</p>
                  <p class="discount-store-text">{{ flashSalesGoods.flashAdvertisement }}</p>
                  <p class="discount-num">
                    <label v-if="flashSalesGoods.advType == 0">{{ flashSalesGoods.advValue }}折起</label>
                    <label else>{{ flashSalesGoods.advValue }}元起</label>
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="flashtitle">
        <div class="title-head"></div>
        <div class="countdown">{{ days + hours + minutes + seconds + flag }}</div>
      </div>
      <div id="flashProductsList">
        <ul class="index-productlist">
          <template v-for="item in listGoodsData">
            <li @click="LoadMethod('BLGoodsDetail', 'BLGoodsDetailViewController',{ goodsid: item[0].goodsId, goodsName: item[0].goodsMsg, goodsPrice: item[0].goodsPrice, goodsImageUrl: item[0].goodsImgPath, isGiftGoods: false })">
              <a href="javascript:;" :class="{ 'end': item[0].isAvailable !== '1' }">
                <span class="endmark" v-if="item[0].isAvailable !== '1'">抢光了</span>
                <div class="lazy-box">
                  <img class="lazy" v-lazy="{ src: item[0].goodsImgPath, loading: require('src/assets/loading-pic.png') }" alt="">
                </div>
                <h3>{{ item[0].goodsMsg }}</h3>
                <p><span class="price"><span style="font-size: 12px;">¥</span>{{ item[0].marketPrice }}</span><span class="cost">参考价：¥{{ item[0].goodsPrice }}</span></p>
              </a>
            </li>
          </template>
          <div class="no-goods" v-if="noGoods">当前闪购活动没有商品</div>
        </ul>
      </div>
    </bl-scroll>
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
    <bl-popup v-model="showModel" position="right" class="sxerji">
      <div class="topHeader" ref="topHeader">
        <a class="cancel" @click="showModel = false">取消</a><span>筛选</span><a class="ok" @click="[showModel = false, sureFilter()]"><svg class="icon"><use xlink:href="#icon-check"></use></svg>确认</a>
      </div>
      <div class="serviceWrap">
        <div class="priceSelect">
          <ul id="flashSale_brand">
            <li v-for="item in flashSalesGoods.brandList">
              <input class="filter-input" type="checkbox" :value="item.brandSid" v-model="brandSid">
              <a>{{ item.brandNameCN }}<svg class="icon"><use xlink:href="#icon-check"></use></svg></a>
            </li>
          </ul>
          <div class="chongzhi" ref="resetBtn">
            <button type="button" data-role="none" class="resetIcon" @click="brandSid = []">重置选项</button>
          </div>
        </div>
      </div>
    </bl-popup>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import routeData from 'src/vue-bluer/route-data'
export default {

  name: 'productsListView',

  mixins: [routeData],

  routeData() {
    return {
      setTime: null,
      loading: null,
      isLoading: true,
      showModel: false,
      isSelect: 1,
      /* false 价格上， true 价格下， 默认价格上 */
      isDown: false,
      /* 有无货 */
      isFilter: '0',
      brandHandle: false,
      brandSid: [],
      indexData: false,
      noGoods: false,

      /* 请求参数 */
      sorCol: '',
      sorTye: '',
      pageNum: 1,
      pageSize: 10,

      /* 倒计时用的变量 */
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      flag: ''
    };
  },
  data() {
    return {
      listGoodsData: []
    }
  },
  computed: {
    ...mapGetters([
      'flashSalesGoods', // 活动闪购活动商品
      'flashSalesListGoods', // 活动闪购活动商品列表
      'listPages'
    ])
  },
  mounted() {
    this.LoadMethod = window.LoadMethod
    this.loading = this.$toast({
      iconClass: 'preloader white',
      message: '加载中',
      duration: 'loading',
      className: 'white-bg'
    })
    /* 获取活动商品 */
    this.$store.dispatch('flashSalesGoods', {
      channelid: 1,
      flashId: this.$route.params.flashId
    }).then(() => {
      setTimeout(() => {
        if (window.isiOS) {
          window._setNativeTitle(this.flashSalesGoods.flashName)
        }
      }, 300)
      this.loading.close()
      /* 倒计时 */
      this.countdown(this.flashSalesGoods.effectiveStart, this.flashSalesGoods.effectiveEnd)
      /* 获取商品列表 */
      this.getListGoods()
    })
  },
  destroyed() {
    setTimeout(() => {
      if (window.isiOS) {
        window._setNativeTitle('精品闪购')
      }
    }, 300)
  },
  methods: {
    /* 滑到底部加载数据 */
    onInfinite(done) {
      this.pageNum ++
      if (this.pageNum >= this.listPages) {
        this.$toast({
          position: 'bottom',
          message: '亲，没有更多数据了'
        })
        this.isLoading = false
        done()
      } else {
        this.getListGoods(done)
      }
    },
    selected(index) {
      this.isSelect = index
      /* 参数调整 */
      this.pageNum = 1
      this.sorCol = ''
      this.sorTye = ''
      /* 清空商品列表 */
      this.listGoodsData = []
      /* 默认 */
      if (index === 1) {
        this.getListGoods()
        return
      }
      /* 价格 */
      if (index === 2) {
        this.sorCol = 'pri'
        if (this.isDown) {
          this.sorTye = 1
        } else {
          this.sorTye = 0
        }
      }
      /* 显示有货 */
      if (index === 3) {
        this.isFilter = '1'
      }
      this.getListGoods()
    },
    /* 确定 */
    sureFilter() {
      /* 参数调整 */
      this.pageNum = 1
      /* 清空商品列表 */
      this.listGoodsData = []
      this.getListGoods()
    },
    countdown(startTime, endTime) {
      let startDate = new Date(startTime.replace(/-/g, "/"))
      let endDate = new Date(endTime.replace(/-/g, "/"))
      let countDate
      let now = new Date();
      if (now >= startDate) {
        countDate = endDate;
        this.flag = "后结束"
      } else {
        countDate = startDate;
        this.flag = "后开售"
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

      this.days = days >= 1 ? days + '天' : ''
      this.hours = (hours < 10 ? '0' + hours : hours) + '小时'
      this.minutes = (minutes < 10 ? '0' + minutes : minutes) + '分钟'
      this.seconds = (seconds < 10 ? '0' + seconds : seconds) + '秒'
      this.setTime = setTimeout(() => {
        if (minutes === 0 && seconds === 0) {
          this.setTime = null
        }
        this.countdown(startTime, endTime)
      }, 1000)
    },
    getListGoods(done) {
      this.noGoods = false
      this.isLoading = true
      this.$store.dispatch('flashSalesListGoods', {
        actCode: this.flashSalesGoods.flashCode,
        sorCol: this.sorCol,
        sorTye: this.sorTye,
        pageSize: this.pageSize,
        pageNo: this.pageNum,
        isava: this.isFilter,
        brandSid: this.brandSid.length !== 0 ? this.brandSid.toString() : undefined
      }).then(() => {
        this.listGoodsData = this.listGoodsData.concat(this.flashSalesListGoods.rows)
        if (this.listGoodsData.length < this.pageSize) {
          this.isLoading = false
        }
        done()
      }, () => {
        if (this.listGoodsData.length === 0) {
          this.noGoods = true
          this.isLoading = false
        }
        done()
      })
    }
  }
};
</script>
