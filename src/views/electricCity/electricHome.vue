<style lang="scss" src="./css/_electricHome.scss" scoped></style>
<template>
  <div class="new" v-scroll-top.window>
    <form id="searchForm" v-on:submit.prevent="search">
      <div class="nav-app">
        <div class="nav-search col">
          <input type="search" class="nav-search-input" name="" placeholder="空调" v-model="searchText">
        </div>
      </div>
    </form>
    <!-- 轮播图 -->
    <bl-slide class="electric-swipe" :slides="filterAllSlides" :autoPlay="true"></bl-slide>
    <!-- end -->
    <div class="row-list">
      <a href="javascript:;" class="list-item col" v-for="{ imgUrl, text, id } in listHead" @click="goNative(id)">
        <div class="item-hd"><img :src="imgUrl" alt=""></div>
        <div class="item-bd">{{ text }}</div>
      </a>
    </div>
    <div class="row-box hot-pro">
      <div class="pro-hd">
        <div class="popularity-img"></div>
      </div>
      <div class="pro-hd-list js-proscroll">
        <ul id="content">
          <li v-for="item in filterListRows">
            <a href="javascript:;" v-go-native-goods-detail="item">
              <div class="col-img col lazy-box"><img class="lazy" v-lazy.content="{ src: item.goodsImgPath, loading: require('src/assets/loading-pic.png') }" alt=""></div>
              <div class="pro-text">{{ item.productName }}</div>
              <div class="pro-price red"><span class="small-price">￥</span>{{ item.goodsPrice }}</div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="three-minor">
      <div class="aside-left col" v-if="hotTwoBrands && hotTwoBrands.mediaUrl">
        <a href="javascript:;" v-go-native-resource="hotTwoBrands">
          <img class="lazyload" v-lazy="hotTwoBrands.mediaUrl" :alt="hotTwoBrands.deployName" />
        </a>
      </div>
      <div class="aside-right col">
        <div class="aside-section hairline-top" v-if="asideTwo && asideTwo.mediaUrl">
          <a href="javascript:;" v-go-native-resource="asideTwo">
            <img class="lazyload" v-lazy="asideTwo.mediaUrl" :alt="asideTwo.deployName" />
          </a>
        </div>
        <div class="aside-section" v-if="asideOne && asideOne.mediaUrl">
          <a href="javascript:;" v-go-native-resource="asideOne">
            <img class="lazyload" v-lazy="asideOne.mediaUrl" :alt="asideOne.deployName" />
          </a>
        </div>
      </div>
    </div>
    <div class="sales-promotion row-box">
      <div class="pro-hd">
        <div class="promotion-img"></div>
      </div>
      <div class="pro-hd-list">
        <ul>
          <li v-for="item in filterPromotion" v-go-native-resource="item">
            <a href="javascript:;">
              <div class="sub-title">{{ item.deployName }}</div>
              <div class="col-img"><img class="lazyload" v-lazy="item.mediaUrl" :alt="item.deployName"></div>
            </a>
            <div class="sup-con">{{ item.picDesc1 }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="row-box hot-pro">
      <div class="pro-hd">
        <div class="hotbrand-img"></div>
      </div>
      <div class="hot-bd">
        <div class="bd-1of3 col" v-if="hotBrands && hotBrands.mediaUrl">
          <a :href="hotBrands.jumpUrl">
            <img class="lazyload" v-lazy="hotBrands.mediaUrl" :alt="hotBrands.deployName" />
          </a>
        </div>
        <div class="bd-2of3 col">
          <div class="clearfix">
            <div class="bd-in-1of2" v-for="item in filterBrands" v-go-native-resource="item">
              <a href="javascript:;"><img class="pp-title lazyload" v-lazy="item.mediaUrl"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="appliance-tab">
      <div class="tab-hairs">
        <div class="tab-title js-proscroll">
          <bl-navbar class="js-sctab" v-model="tabsModel">
            <bl-tab-item class="el-tab-item" v-for="({ jumpId, deployName }, index) in filterEleTabs" :id="index" @click.native="elTabItem(jumpId)"><span>{{ deployName }}</span></bl-tab-item>
          </bl-navbar>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-c-item">
          <a class="item-href" href="javascript:;" v-for="item in filterTabRows" :key="item.goodsId" v-go-native-goods-detail="item">
            <div class="col c-item-img"><img v-lazy="{ src: item.goodsImgPath, loading: require('src/assets/loading-pic.png') }" alt=""></div>
            <div class="col c-item-text">
              <div class="item-text1">{{ item.productName }}</div>
              <div class="item-text2">{{ item.goodsMsg }}</div>
              <div class="red item-text3"><span class="middle-price">￥</span>{{ item.goodsPrice }}</div>
            </div>
          </a>
        </div>
        <div class="tab-end">
          - END -
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from 'src/utils'
export default {

  name: 'keepElectricHome',

  data() {
    return {
      searchText: '',
      tabsModel: 0,
      inlineLoading: null,
      loaded: false,
      listHead: [
        {
          imgUrl: require('./i/phone-communication.png'),
          text: '手机通讯',
          id: '268220'
        },
        {
          imgUrl: require('./i/computer-digital.png'),
          text: '电脑数码',
          id: '268237'
        },
        {
          imgUrl: require('./i/household-electric-appliances.png'),
          text: '家用电器',
          id: '268238'
        },
        {
          imgUrl: require('./i/tide-discovery.png'),
          text: '潮发现',
          id: 'fashion'
        }
      ],
      hotBrands: {}, // 热门品牌下面资源位
      hotTwoBrands: {}, // 人气爆款下面资源位
      asideOne: {}, // 人气爆款下面资源位
      asideTwo: {}, // 人气爆款下面资源位
      promotion: [], // 促销活动
      allSlides: [], // 轮播图
      brands: [], // 品牌
      eleTabs: [], // 四个选项卡
      listRows: [], // 人气爆款商品
      tabRows: [], // 选项卡对应的商品

      /* 参数 */
      cateId: '',
      curPageNo: 0
    };
  },
  computed: {
    filterPromotion() {
      return this.promotion
    },
    filterAllSlides() {
      return this.allSlides
    },
    filterBrands() {
      return this.brands
    },
    filterEleTabs() {
      return this.eleTabs
    },
    filterListRows() {
      return this.listRows
    },
    filterTabRows() {
      return this.tabRows
    }
  },
  created() {
    let self = this
    window.CTJSBridge.LoadAPI("BLAPPSiteQueryAdDeployAPIManager", {
      resourceId: "237300,237301,237302,237304,237306,237307,237310,237311,237320"
    }, {
      success: function(res) {
        // let resData = window.JSON.parse(res).otherResource
        let resData = utils.transData(res).otherResource
        self.hotBrands = resData[1].advList[0]
        self.allSlides = resData[2].advList
        self.hotTwoBrands = resData[3].advList[0]
        self.asideOne = resData[4].advList[0]
        self.promotion = resData[5].advList
        self.asideTwo = resData[6].advList[0]
        self.brands = resData[7].advList
        self.eleTabs = resData[8].advList
        self.cateId = resData[8].advList[0].jumpId
        self.$nextTick(() => {
          self.getGoods(null, 0)
          self.loaded = true
          self.$loading.close()
        });
      },
      fail: function(data) { console.log(data) },
      progress: function(data) {}
    })
    self.getGoods('268862', 0)
  },
  activated() {
    if (this.loaded) {
      this.$loading.close()
    }
  },
  methods: {
    goNative(id) {
      if (id === 'fashion') {
        window.location.href = "http://promotion.bl.com/nc/1_3020_21855_30298.html"
      } else {
        window.CTJSBridge.LoadMethod('BLCategory', 'BLCategoryViewController', { categoryId: '9999' + id })
      }
    },
    elTabItem(jumpId) {
      this.cateId = jumpId
      this.inlineLoading = this.$toast({
        iconClass: 'preloader white',
        message: '加载中',
        duration: 'loading'
      })
      this.getGoods(null, 0)
    },
    getGoods(cateId, No) {
      let self = this
      let thatId = cateId || this.cateId
      let thatNo = No || this.curPageNo
      let resquestData = {
        "channelSid": "1",
        "c": "9999" + thatId,
        "searchInfo": {
          "sorCol": "defSort",
          "sorTye": "1",
          "pageModel": {
            "pageNo": String(thatNo + 1),
            "pageSize": "10"
          }
        }
      }
      /* 获取商品 */
      window.CTJSBridge.LoadAPI("BLSearchByKeyWordAPIManager", resquestData, {
        success: function(res) {
          // let resData = window.JSON.parse(res)
          let resData = utils.transData(res)
          if (cateId === '268862') {
            if (resData.resultInfo.pageModel.rows) {
              self.listRows = resData.resultInfo.pageModel.rows
            }
          } else {
            if (resData.resultInfo.pageModel.rows) {
              self.tabRows = resData.resultInfo.pageModel.rows
            }
          }
          if (self.inlineLoading) {
            self.inlineLoading.close()
          }
        },
        fail: function(data) { console.log(data) },
        progress: function(data) {}
      })
    },
    search() {
      event.preventDefault()
      if (this.searchText !== '') {
        window.CTJSBridge.LoadMethod('SearchList', 'SearchList', {
          searchkey: this.searchText
        })
      } else {
        this.$toast({
          message: '~请输入关键字~',
          position: 'bottom'
        })
      }
    }
  }
};
</script>
