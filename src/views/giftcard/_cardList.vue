<style lang="scss" src="./css/_cardList.scss" scoped></style>
<template>
  <div class="cwrap-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <ul>
      <li v-for="item in list">
        <div class="cwrap-img">
          <a href="javascript:;" v-go-native-goods-detail="item">
            <div class="lazy-box">
              <img class="lazy" v-lazy="{ url: item.goodsImgPath, loading: require('src/assets/loading-pic.png'), error: require('src/assets/loading-pic.png') }" alt="">
            </div>
            <div class="cwrap-name">{{ item.productName }}</div>
            <div class="cwrap-lowg" v-if="item.isAvailable == 0">无货</div>
          </a>
        </div>
        <div class="cwrap-price">
          <span class="small-rmb">¥</span>{{ item.goodsPrice }}
          <div class="card-shop nogod" v-if="item.isAvailable == 0"></div>
          <div class="card-shop" v-else></div>
        </div>
      </li>
    </ul>
    <div class="infinite-layer" v-if="!busy">
      <div class="infinite-preloader"></div>
      <div>加载中...</div>
    </div>
  </div>
</template>

<script>
import api from 'src/api'
export default {

  name: '_cardList',

  data () {
    return {
      busy: true,
      pageNum: 1,
      list: []
    };
  },
  props: ['jumpId'],
  created() {
    this.loadMore(0)
  },
  methods: {
    loadMore(once) {
      api.getGoods({
        requestData: JSON.stringify({
          channelSid: "1",
          c: "9999" + this.jumpId,
          searchInfo: {
            pageModel: {
              pageNo: this.pageNum ++,
              pageSize: "10"
            }
          }
        })
      }).then(data => {
        let resData = JSON.parse(data.body.obj)
        if (resData.resultInfo.pageModel.rows) {
          this.list = this.list.concat(resData.resultInfo.pageModel.rows)
        }
        this.$nextTick(() => {
          if (resData.resultInfo.pageModel.rows && resData.resultInfo.pageModel.rows.length >= 10) {
            this.busy = false
          } else {
            this.busy = true
            once !== 0 && this.$toast('没有了~')
          }
          this.$loading.close()
        });
      }, err => {
        console.log(err)
      })
    }
  }
};
</script>
