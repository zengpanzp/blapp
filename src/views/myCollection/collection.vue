<template>
  <div class="collection">
    <bl-navbar class="collection-tab flex" v-model="tabsModel">
      <bl-tab-item class="flex-item flex-c-m" v-for="({ jumpId, deployName }, index) in filterEleTabs" :id="index" @click.native="changeTab(index)"><span>{{ deployName }}</span></bl-tab-item>
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
                <svg class="icon"><use xlink:href="#icon-aixin2"></use></svg>
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
import api from 'src/api'
import utils from 'src/utils'
export default {

  name: 'collection',

  data () {
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
      deployName: null,
      filterEleTabs: [
        {
          deployName: '我收藏的商品',
        },
        {
          deployName: '我收藏的门店',
        }
      ],
      list: [],
      storeList: []
    };
  },
  mounted() {
    // alert(this.$route.query.deployName)
    console.log(this.$route)
    this.deployName = this.$route.query.deployName;
    let deployName = this.$route.query.deployName
    if (deployName) {
      debugger
      if (deployName == 'goods') {
        this.tabsModel = '0'
      } else if (deployName == 'stores') {
        this.tabsModel = '1'
      } else {
        this.tabsModel = '0'
      }
    }
    this.changeTab(this.tabsModel)
  },
  methods: {
    changeTab(index) {
      this.busy = true
      this.busyStore = true
      this.tabsModel = String(index)
      if (index == '0') {
        this.loadGoods()
      }
      if (index == '1') {
        this.loadStores()
      }
    },
    loadGoods() {
      this.busy = true
      let temp = []
      utils.isLogin().then(data => {
        let memberToken = data.member_token
        api.userCenter.queryFavorites({
          member_token: memberToken,
          currentPage: Number(this.pageNum ++)
        }).then(data => {
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
                 isFilterCommons: "true"
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
                console.log(check)
                if (rows) {
                  this.list = this.list.concat(rows)
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
            this.$loading.close()
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
        let currentPage = Number(this.storePage ++)
        api.userCenter.queryShopFavorites({
        member_token: memberToken,
        currentPage: currentPage
      }).then(data => {
        this.$loading.close()
        console.log(data)
        this.currentPage = currentPage
        let storeList = JSON.parse(data.body.obj).list
        let totalPageNum = JSON.parse(data.body.obj).pages
        console.log(storeList)
        // alert('totalPageNum:' + totalPageNum + 'currentPage:' + this.currentPage)
        if (currentPage <= totalPageNum) {
           if (storeList && storeList.length) {
          this.storeList = this.storeList.concat(storeList)
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
       })
      })
    },
    storesDtail(message, storeType) {
      let params = JSON.stringify({message: message, storeType: storeType})
      window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
          pageId: 'orselet',
          params: params})
    }
  },
  };
</script>

<style lang="scss" src="./css/collection.scss" scoped></style>
