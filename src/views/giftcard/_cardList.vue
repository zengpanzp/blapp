<style lang="scss" src="./css/_cardList.scss" scoped></style>
<template>
  <div class="cwrap-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <ul>
      <li v-for="item in list" :key="item.goodsId">
        <div class="cwrap-img">
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
          <div class="card-shop" v-else @click="addCard(item.goodsId)"></div>
        </div>
      </li>
    </ul>
    <div style="text-align: center; margin-top: 45%; font-size: 1.2em;" v-if="noRows">结果为空!</div>
    <div class="infinite-layer" v-if="!busy">
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
      busy: true,
      noRows: false,
      pageNum: 1,
      list: [],
      memberId: '',
      member_token: ''
    };
  },
  props: ['jumpId', 'searchWord'],
  created() {
    if (this.jumpId) {
      this.loadMore(0)
    } else {
      this.$loading.close()
    }
  },
  methods: {
    loadMore(once) {
      let qData = {}
      if (this.jumpId) {
        qData = {
          channelSid: "1",
          c: "9999" + this.jumpId,
          searchInfo: {
            pageModel: {
              pageNo: this.pageNum,
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
              pageNo: this.pageNum,
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
          if (resData.resultInfo.pageModel.rows) {
            this.list = this.list.concat(resData.resultInfo.pageModel.rows)
            this.pageNum ++
          }
          this.$nextTick(() => {
            this.$emit('finish')
            if (!resData.resultInfo.pageModel.rows && once == 0) {
              this.noRows = true
            } else {
              this.noRows = false
            }
            if (resData.resultInfo.pageModel.rows && resData.resultInfo.pageModel.rows.length >= 10) {
              this.busy = false
            } else {
              this.busy = true
              once !== 0 && this.$toast({
                position: 'bottom',
                message: '没有了~'
              })
            }
            this.$loading.close()
          });
        } else {
          this.$loading.close()
          this.$toast({
            position: 'bottom',
            message: data.body.msg
          })
        }
      }, err => {
        console.log(err)
      })
    },
    addCard(goodId) {
      utils.addCard(goodId)
    }
  },
  watch: {
    'jumpId'(val) {
      this.pageNum = 1
      this.list = []
      this.loadMore(0)
    },
    'searchWord'(val) {
      this.pageNum = 1
      this.list = []
      this.loadMore(0)
    }
  }
};
</script>
