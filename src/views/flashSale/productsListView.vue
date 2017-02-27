<template>
  <div class="flash-list">
    <bl-popup v-model="showModel" position="right" class="sxerji">
      <div class="topHeader">
        <a class="cancel" @click="showModel = false">取消</a><span>筛选</span><a class="ok" @click="showModel = false"><svg class="icon"><use xlink:href="#icon-check"></use></svg>确认</a>
      </div>
      <div class="serviceWrap">
        <div class="priceSelect">
          <ul id="flashSale_brand">
            <li :class="[ brandHandle === index ? 'select': '' ]" @click="brandHandle = index" v-for="(item, index) in flashSalesGoods.brandList"><a>{{ item.brandNameCN }}<svg class="icon"><use xlink:href="#icon-check"></use></svg></a></li>
          </ul>
          <div class="chongzhi">
            <button type="button" data-role="none" class="resetIcon">重置选项</button>
          </div>
        </div>
      </div>
    </bl-popup>
    <bl-scroll :enableRefresh="false" :on-infinite="onInfinite" :enableInfinite="isLoading" v-scroll-top>
      <div class="new">
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
        <div class="quickbuy-active">
          <ul>
            <li v-if="picturesType === 11" v-for="({ picturesType, picturesUrl }, index) in flashSalesGoods.pictures">
              <a href="javascript:;">
                <img v-lazy="picturesUrl" alt="">
              </a>
              <div class="quickbuy-active-titles">
                <div class="active-store-logo" v-if="flashSalesGoods.brandList">
                  <img :src="flashSalesGoods.brandList[0].brandLogo" :alt="flashSalesGoods.brandList[0].brandNameCN">
                </div>
                <div class="active-title-detail">
                  <div class="active-detail-container">
                    <p>{{ flashSalesGoods.flashName }}</p>
                    <p class="discount-store-text">{{ flashSalesGoods.flashAdvertisement }}</p>
                    <p class="discount-num">
                      <label>{{ flashSalesGoods.advValue }}</label>元起
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
                <a href="javascript:;">
                  <div class="lazy-box">
                    <img class="lazy" :src="item[0].goodsImgPath" alt="">
                  </div>
                  <h3>{{ item[0].goodsMsg }}</h3>
                  <p><span class="price">¥{{ item[0].marketPrice }}</span><span class="cost">参考价：¥{{ item[0].goodsPrice }}</span></p>
                </a>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </bl-scroll>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {

  name: 'productsListView',

  data() {
    return {
      setTime: null,
      loading: null,
      isLoading: true,
      showModel: false,
      isSelect: 1,
      isDown: '',
      isStart: null,
      brandHandle: '',

      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      flag: '',

      pageNum: 1,
      pageSize: 10,
      totalPage: 0,
      listGoodsData: []
    };
  },
  computed: {
    ...mapGetters([
      'flashSalesGoods', // 活动闪购活动商品
      'flashSalesListGoods' // 活动闪购活动商品列表
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
      this.loading.close()
      let start = this.flashSalesGoods.effectiveStart
      let end = this.flashSalesGoods.effectiveEnd
      /* 倒计时 */
      this.countdown(start, end)
      /* 获取商品列表 */
      this.getListGoods()
    })
  },
  methods: {
    /* 滑到底部加载数据 */
    onInfinite(done) {
      if (this.pageNum >= this.totalPage) {
        this.$toast({
          position: 'bottom',
          message: '亲，没有更多数据了'
        })
        this.isLoading = false
      }
      this.pageNum ++
      this.getListGoods(done)
    },
    selected(index) {
      this.isSelect = index
    },
    countdown(startTime, endTime) {
      let startDate = new Date(startTime)
      let endDate = new Date(endTime)
      let countDate = ''
      let now = new Date();
      if (now >= startDate) {
        this.isStart = 1;
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
        if (minutes === 0) {
          this.setTime = null
        }
        this.countdown(startTime, endTime)
      }, 1000)
    },
    getListGoods(done) {
      this.$store.dispatch('flashSalesListGoods', {
        actCode: this.flashSalesGoods.flashCode,
        sorCol: '',
        sorTye: '',
        pageSize: this.pageSize,
        pageNo: this.pageNum
      }).then(() => {
        this.totalPage = this.flashSalesListGoods.totalPage
        this.listGoodsData = this.listGoodsData.concat(this.flashSalesListGoods.rows)
        if (this.pageNum >= this.totalPage) {
          this.isLoading = false
        }
        done()
      })
    }
  }
};
</script>
