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
        <div class="infinite-layer" v-if="loading">
          <div class="infinite-preloader"></div>
          <div>加载中...</div>
        </div>
      </bl-tab-container-item>
      <bl-tab-container-item id="1">
        <div class="shop-box" v-if="tabsModel == '1'" v-infinite-scroll="loadStores" infinite-scroll-disabled="busyStore" infinite-scroll-distance="10">
          <div class="shop-main">
            <div class="shop-item flex-c-m"  v-for="item in storeList">
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
      busy: false,
      busyStore: false,
      tempArr: [],
      loading: true,
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
  // created() {
      // this.busy = true
      // this.busyStore = true
      // utils.isLogin().then(data => {
      //   let memberToken = data.member_token;
      //   this.memberToken = memberToken
      // })
      // this.busy = false
      // this.busyStore = false
  // },
  mounted() {
    // alert(this.$route.query.deployName)
    this.deployName = this.$route.params.deployName;
  },
  methods: {
    changeTab(index) {
      this.tabsModel = String(index)
      if (index == 1) {
        this.loadStores()
      }
    },
    loadGoods() {
      this.busy = true
      let temp = []
      utils.isLogin().then(data => {
        let memberToken = data.member_token
        api.queryFavorites({
          member_token: memberToken,
          currentPage: Number(this.pageNum ++)
        }).then(data => {
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
            api.searchProductByIds({
              clientIp: "0:0:0:0:0:0:0:1",
              clientRequestTime: "1435222994244",
              requestData: JSON.stringify(request),
              systemNo: "11111111"
            }).then(data => {
              // console.log(JSON.parse(data.body.obj))
              let resData = JSON.parse(data.body.obj)
              let rows = resData.resultInfo.rows
              console.log(rows)
              if (rows) {
                this.list = this.list.concat(rows)
                this.busy = false
              } else {
                this.loading = false
              }
              this.$loading.close()
              console.log("######rows########" + rows)
              // console.log('######resultInfo######' + JSON.stringify(rows.resultInfo))
            })
          } else {
            this.loading = false
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
        api.queryShopFavorites({
        member_token: memberToken}).then(data => {
          this.$loading.close()
        console.log(data)
        let storeList = JSON.parse(data.body.obj).list
        this.storeList = storeList
       })
        this.$loading.close()
      })
    }
  },
  };
</script>

<style lang="scss" src="./css/collection.scss" scoped></style>
