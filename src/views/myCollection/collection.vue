<template>
  <div class="collection">
    <bl-navbar class="collection-tab flex" v-model="tabsModel">
      <bl-tab-item class="flex-item flex-c-m" v-for="({ jumpId, deployName }, index) in filterEleTabs" :id="index" @click.native="changeTab(index, deployName)"><span>{{ deployName }}</span></bl-tab-item>
    </bl-navbar>
    <bl-tab-container v-model="tabsModel">
      <bl-tab-container-item id="0">
        <div class="goods-box" v-infinite-scroll="loadGoods" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
          <div class="goods-item flex" v-for="item in list" v-go-native-goods-detail="item">
            <div class="goods-img lazy-box">
              <img class="lazy" v-lazy="{ src: item.goodsImgPath }">
            </div>
            <div class="goods-des flex-item">
              <div class="goods-title">{{ item.goodsMsg }}</div>
              <div class="goods-price"><span>¥</span>{{ item.goodsPrice ? item.goodsPrice : '暂无价格' }}</div>
            </div>
          </div>
        </div>
        <div class="infinite-layer" v-if="goodsLoading">
          <div class="infinite-preloader"></div>
          <div>加载中...</div>
        </div>
      </bl-tab-container-item>
      <bl-tab-container-item id="1">
        <div :class="{'shop-box': storeList && storeList.length}" v-infinite-scroll="loadStores" infinite-scroll-disabled="busyStore" infinite-scroll-distance="10">
          <div class="shop-main">
            <div class="shop-item flex-c-m" v-for="item in storeList" @click="storesDtail(item.shopId, item.issueOrgId)">
              <div class="shop-item-icon flex-c-m">
                <svg class="icon">
                  <use xlink:href="#icon-aixin2"></use>
                </svg>
              </div>
              <div class="flex-item">
                <div class="shop-title">{{ item.shopName }}</div>
                <div class="shop-address">{{ item.addr }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="infinite-layer" v-if="storesLoading">
          <div class="infinite-preloader"></div>
          <div>加载中...</div>
        </div>
      </bl-tab-container-item>
    </bl-tab-container>
  </div>
</template>
<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'collection',

  data() {
    return {
      memberToken: null,
      pageNum: 1,
      storePage: 1,
      busy: true,
      busyStore: true,
      tempArr: [],
      goodsLoading: true,
      storesLoading: true,
      tabsModel: '0',
      filterEleTabs: [{
        deployName: '我收藏的商品',
        saName: '商品',
        jumpId: 'goods'
      }, {
        deployName: '我收藏的门店',
        saName: '门店',
        jumpId: 'stores'
      }],
      list: [],
      storeList: []
    };
  },
  mounted() {
    let deployName = this.$route.query.deployName
    switch (deployName) {
      case 'goods':
        this.tabsModel = '0'
        break;
      case 'stores':
        this.tabsModel = '1'
        break;
      default:
        this.tabsModel = '1'
    }
    this.changeTab(this.tabsModel, this.filterEleTabs[this.tabsModel].deployName)
    window.currentPageReload = this.currentPageReload
  },
  methods: {
    currentPageReload() {
      let deployName = this.$route.query.deployName
      switch (deployName) {
        case 'goods':
          this.tabsModel = '0'
          break;
        case 'stores':
          this.tabsModel = '1'
          break;
        default:
          this.tabsModel = '1'
      }
      this.changeTab(this.tabsModel, this.filterEleTabs[this.tabsModel].deployName)
    },
    changeTab(index, deployName) {
      let saName = this.filterEleTabs[this.tabsModel].deployName
      // sensor analytics商品详情埋点
      try {
        // console.log((new Date()).toLocaleString() + deployName)
        sa.track('$pageview', {
          pageId: 'APP_我的收藏_' + saName,
          categoryId: 'APP_User',
          $title: 'APP_我的收藏_' + saName
        })
      } catch (err) {
        console.log("sa error => " + err);
      }
      this.tabsModel = String(index)
      this.goodsLoading = true
      this.storesLoading = true
      this.list = []
      this.storeList = []
      this.pageNum = 1
      this.storePage = 1
      if (index == '0') {
        this.loadGoods()
        this.$router.replace({
          path: '/myCollection',
          query: {
            deployName: 'goods'
          }
        })
      }
      if (index == '1') {
        this.loadStores()
        this.$router.replace({
          path: '/myCollection',
          query: {
            deployName: 'stores'
          }
        })
      }
    },
    loadGoods() {
      console.log('goods')
      this.busy = true
      let temp = []
      utils.isLogin().then(data => {
        let memberToken = data.member_token
        api.userCenter.queryFavorites({
          member_token: memberToken,
          currentPage: Number(this.pageNum++)
        }).then(data => {
          console.log(data)
          if (data.body.obj) {
            let resData = JSON.parse(data.body.obj)
            console.log(resData)
            let obj = resData.list
            console.log("#######aloha########" + obj)
            if (obj && obj.length) {
              for (let item of obj) {
                temp.push(item.productId)
              }
              let request = {
                productIds: temp.join(','),
                channel: "1",
                pageNo: 1,
                pageSize: "10",
                isFilterCommons: "false"
              }
              api.userCenter.searchProductByIds({
                clientIp: "0:0:0:0:0:0:0:1",
                clientRequestTime: "1435222994244",
                requestData: JSON.stringify(request),
                systemNo: "11111111"
              }).then(data => {
                let resData = JSON.parse(data.body.obj)
                let rows = resData.resultInfo.rows
                let check = JSON.stringify(rows)
                console.log(check + '============')
                if (rows) {
                  // this.list = this.list.concat(rows)
                  this.list.push.apply(this.list, rows)
                  this.busy = false
                } else {
                  this.goodsLoading = false
                }
                this.$loading.close()
              })
            } else {
              this.$loading.close()
              this.goodsLoading = false
                // this.$toast('没有收藏的商品')
            }
          } else {
            this.goodsLoading = false
            this.$loading.close()
            this.$toast(data.body.msg)
          }
        }).then(err => {
          console.log(err)
        })
      })
    },
    loadStores() {
      this.busyStore = true
      utils.isLogin().then(data => {
        let memberToken = data.member_token
        let currentPage = Number(this.storePage++)
        api.userCenter.queryShopFavorites({
          member_token: memberToken,
          currentPage: currentPage
        }).then(data => {
          if (data.body.obj) {
            this.$loading.close()
            console.log(data)
            this.currentPage = currentPage
            let storeList = JSON.parse(data.body.obj).list
            let totalPageNum = JSON.parse(data.body.obj).pages
            console.log(storeList)
              // alert('totalPageNum:' + totalPageNum + 'currentPage:' + this.currentPage)
            if (currentPage <= totalPageNum) {
              if (storeList && storeList.length) {
                // this.storeList = this.storeList.concat(storeList)
                this.storeList.push.apply(this.storeList, storeList)
                this.busyStore = false
              } else {
                this.busyStore = true
                this.storesLoading = false
              }
            } else {
              this.storesLoading = false
              this.$loading.close()
                // this.$toast('没有收藏的门店')
            }
          } else {
            this.$toast(data.body.msg)
          }
        }).then(err => {
          console.log(err)
        })
      })
    },
    storesDtail(message, storeType) {
      let params = JSON.stringify({
        message: message,
        storeType: storeType
      })
      console.log('######storeType:########' + storeType)
      if (storeType == 1010 || storeType == 1020) {
        // 1010:百货  1020:购物中心
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
          pageId: 'shoppingCenter',
          params: params
        })
      }
      if (storeType == 1030) {
        // 1030:奥特莱斯
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
          pageId: 'orselet',
          params: params
        })
      }
      if (storeType == 2010 || storeType == 2020) {
        // 2010:大卖场 2020:标超
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
          pageId: 'standardSuperMarket',
          params: params
        })
      } else if (storeType == 2030) {
        // 2030:便利店
        window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
          pageId: 'convenienceStores',
          params: params
        })
      }
    }
  },
};
</script>
<style lang="scss" src="./css/collection.scss" scoped></style>
