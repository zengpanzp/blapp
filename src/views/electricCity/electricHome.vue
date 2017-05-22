<style lang="scss" src="./css/_electricHome.scss" scoped></style>
<template>
  <div class="main" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
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
                <div class="col-img col lazy-box"><img class="lazy" v-lazy.content="{ src: item.goodsImgPath }" alt=""></div>
                <div class="pro-text">{{ item.productName }}</div>
                <div class="pro-price red"><span class="small-price">￥</span>{{ item.goodsPrice }}</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="three-minor">
        <div class="aside-left col" v-if="hotTwoBrands && hotTwoBrands.mediaUrl">
          <a href="javascript:;" class="lazyload" v-go-native-resource="hotTwoBrands">
            <img v-lazy="{ src: hotTwoBrands.mediaUrl }" :alt="hotTwoBrands.deployName" />
          </a>
        </div>
        <div class="aside-right col">
          <div class="aside-section hairline-top lazyload" v-if="asideTwo && asideTwo.mediaUrl">
            <a href="javascript:;" v-go-native-resource="asideTwo">
              <img v-lazy="{ src: asideTwo.mediaUrl }" :alt="asideTwo.deployName" />
            </a>
          </div>
          <div class="aside-section lazyload" v-if="asideOne && asideOne.mediaUrl">
            <a href="javascript:;" v-go-native-resource="asideOne">
              <img v-lazy="{ src: asideOne.mediaUrl }" :alt="asideOne.deployName" />
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
            <li class="lazyload" v-for="item in filterPromotion" v-go-native-resource="item">
              <a href="javascript:;">
                <div class="sub-title">{{ item.deployName }}</div>
                <div class="col-img"><img v-lazy="{ src: item.mediaUrl }" :alt="item.deployName"></div>
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
          <div class="bd-1of3 col lazyload" v-if="hotBrands && hotBrands.mediaUrl">
            <a :href="hotBrands.jumpUrl">
              <img v-lazy="{ src: hotBrands.mediaUrl }" :alt="hotBrands.deployName" />
            </a>
          </div>
          <div class="bd-2of3 col">
            <div class="clearfix">
              <div class="bd-in-1of2" v-for="item in filterBrands" v-go-native-resource="item">
                <a href="javascript:;" class="lazyload"><img class="pp-title" v-lazy="{ src: item.mediaUrl }"></a>
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
              <div class="col c-item-img lazy-box"><img class="lazy" v-lazy="{ src: item.goodsImgPath }" alt=""></div>
              <div class="col c-item-text">
                <div class="item-text1">{{ item.productName }}</div>
                <div class="item-text2">{{ item.goodsMsg }}</div>
                <div class="red item-text3"><span class="middle-price">￥</span>{{ item.goodsPrice }}</div>
              </div>
            </a>
          </div>
          <div class="infinite-layer" v-if="loading">
            <div class="infinite-preloader"></div>
            <div>加载中...</div>
          </div>
          <div class="tab-end" v-else>
            - END -
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from 'src/utils'
import api from 'src/api'
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
      curPageNo: 1,

      busy: true,
      loading: true
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
    api.queryAdDeploy({
      otherresource: {
        resourceId: '237300,237301,237302,237304,237306,237307,237310,237311,237320'
      }
    }).then(res => {
      let resData = JSON.parse(res.body.obj).obj.otherResource
      this.hotBrands = resData[1].advList[0] || []
      this.allSlides = resData[2].advList || []
      this.hotTwoBrands = resData[3].advList[0] || []
      this.asideOne = resData[4].advList[0] || []
      this.promotion = resData[5].advList || []
      this.asideTwo = resData[6].advList[0] || []
      this.brands = resData[7].advList || []
      this.eleTabs = resData[8].advList || []
      if (resData[8].advList[0]) {
        this.cateId = resData[8].advList[0].jumpId
      }
      this.$nextTick(() => {
        this.busy = false
        this.loaded = true
        this.$loading.close()
      });
    })
    this.getOnceGoods()
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
      this.inlineLoading = this.$toast({
        iconClass: 'preloader white',
        message: '加载中',
        duration: 'loading'
      })
      this.loading = true
      this.cateId = jumpId
      this.curPageNo = 1
      this.loadMore(true)
    },
    getOnceGoods() {
      let resquestData = {
        "channelSid": "1",
        "c": "9999268862",
        "searchInfo": {
          "sorCol": "defSort",
          "sorTye": "1",
          "pageModel": {
            "pageNo": '1',
            "pageSize": "10"
          }
        }
      }
      api.getGoods({
        requestData: JSON.stringify(resquestData)
      }).then(res => {
        let resData = utils.transData(res.body.obj).resultInfo.pageModel.rows
        if (resData) {
          this.listRows = resData
        }
      })
    },
    loadMore(isTab = false) {
      this.busy = true
      let thatId = this.cateId
      let resquestData = {
        channelSid: "1",
        c: "9999" + thatId,
        searchInfo: {
          sorCol: "defSort",
          sorTye: "1",
          pageModel: {
            pageNo: String(this.curPageNo ++),
            pageSize: "10"
          }
        }
      }
      /* 获取商品 */
      api.getGoods({
        requestData: JSON.stringify(resquestData)
      }).then(res => {
        if (isTab) {
          this.tabRows = []
        }
        let resData = window.JSON.parse(res.body.obj).resultInfo.pageModel.rows
        if (resData && resData.length) {
          this.tabRows = this.tabRows.concat(resData)
          this.busy = false
        } else {
          this.loading = false
        }
        if (this.inlineLoading) {
          this.inlineLoading.close()
        }
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
