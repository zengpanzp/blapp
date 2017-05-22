<style lang="scss" src="./css/_cardList.scss" scoped></style>
<template>
  <div class="cwrap-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <ul>
      <li v-for="(item, index) in list" :key="item.goodsId">
        <div class="cwrap-img" @click="searchSendor(item, index)">
          <a href="javascript:;" v-go-native-goods-detail="item">
            <div class="lazy-box">
              <img class="lazy" v-lazy="{ src: item.goodsImgPath }" alt="">
            </div>
            <div class="cwrap-name">{{ item.productName }}</div>
            <div class="cwrap-lowg" v-if="item.isAvailable == 0">无货</div>
          </a>
        </div>
        <div class="cwrap-price">
          <span class="small-rmb">¥</span>{{ item.goodsPrice }}
          <div class="card-shop nogod" v-if="item.isAvailable == 0"></div>
          <div class="card-shop" v-else @click="addCard(item.goodsId, item, index)"></div>
        </div>
      </li>
    </ul>
    <div style="text-align: center; margin-top: 45%; font-size: 1.2em;" v-if="noRows">结果为空!</div>
    <div class="infinite-layer" v-if="loading">
      <div class="infinite-preloader"></div>
      <div>加载中...</div>
    </div>
  </div>
</template>

<script>
import api from 'src/api'
import utils from 'src/utils'
export default {

  name: '_cardList',

  data () {
    return {
      loading: true,
      busy: false,
      noRows: false,
      pageNum: 1,
      pageNo: '',
      list: []
    };
  },
  props: ['jumpId', 'searchWord'],
  created() {
    if (!this.jumpId) {
      this.busy = true
      this.loading = false
    }
  },
  methods: {
    loadMore() {
      this.busy = true
      this.noRows = false
      let qData = {}
      if (this.jumpId) {
        qData = {
          channelSid: "1",
          c: "9999" + this.jumpId,
          searchInfo: {
            pageModel: {
              pageNo: this.pageNum ++,
              pageSize: "10"
            }
          }
        }
      } else {
        qData = {
          k: this.searchWord,
          channelSid: "1",
          searchInfo: {
            goodsType: "10",
            pageModel: {
              pageNo: this.pageNum ++,
              pageSize: "8"
            }
          }
        }
      }
      api.getGoods({
        requestData: JSON.stringify(qData)
      }).then(data => {
        if (data.body.obj) {
          let resData = JSON.parse(data.body.obj)
          console.log(resData)
          this.pageNo = resData.resultInfo.pageModel.pageNo
          let resRows = resData.resultInfo.pageModel.rows
          this.$emit('finish')
          if (resRows && resRows.length) {
            this.busy = false
            this.list = this.list.concat(resRows)
            if (resRows.length < 8) {
              this.busy = true
              this.loading = false
              if (qData.searchInfo.pageModel.pageNo > 1) {
                this.$toast({
                  position: 'bottom',
                  message: '没有了~'
                })
              }
            }
          } else {
            this.busy = true
            this.loading = false
            if (qData.searchInfo.pageModel.pageNo > 1) {
              this.$toast({
                position: 'bottom',
                message: '没有了~'
              })
            } else {
              this.noRows = true
            }
          }
        } else {
          this.$toast({
            position: 'bottom',
            message: data.body.msg
          })
        }
      }, err => {
        console.log(err)
      })
    },
    addCard(goodId, item, index) {
      if (this.searchWord) {
        try {
          console.log((new Date()).toLocaleString() + '搜索结果-加入购物车 埋点')
          sa.track('clickStatistics', {
            clickType: "搜索结果页点击加入购物车",
            clickValueR: goodId,
            clickLocationR: this.pageNo,
            clickValueJson: JSON.stringify({
              "P": "1",
              "Y": Number(index + 1)
            })
          });
        } catch (err) {
          console.log("sa clickStatistics error => " + err);
        }
      }
      utils.addCard(goodId, item)
    },
    searchSendor(item, index) {
      if (this.searchWord) {
        try {
          console.log((new Date()).toLocaleString() + '搜索结果-点击商品详情 埋点')
          sa.track('clickStatistics', {
            clickType: "搜索结果页商品点击",
            clickValueR: item.goodsId,
            clickLocationR: this.pageNo,
            clickValueJson: JSON.stringify({
              "P": "1",
              "Y": Number(index + 1)
            })
          });
        } catch (err) {
          console.log("sa clickStatistics error => " + err);
        }
      }
    }
  },
  watch: {
    'jumpId'(val) {
      this.loading = true
      this.pageNum = 1
      this.list = []
      this.loadMore()
    },
    'searchWord'(val) {
      this.loading = true
      this.pageNum = 1
      this.list = []
      this.loadMore()
    }
  }
};
</script>
