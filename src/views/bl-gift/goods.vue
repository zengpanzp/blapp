<style lang="scss" src="./css/_goods.scss" scoped></style>
<template>
  <div class="blgift-goods" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <div class="pic-list">
      <ul>
        <li v-for="item in goodsList">
          <div class="list-bg">
            <a href="javascript:;" title="">
              <div class="lazy-box">
                <img class="lazy" :src="item[0].goodsImgPath" alt="">
                <div class="sale-out"></div>
              </div>
              <div class="cwrap-name">{{item[0].productName}}</div>
            </a>
          </div>
          <div class="cwrap-price">
            <div class="cmar-left"><span class="small-rmb">¥</span>{{item[0].marketPrice}}</div>
            <a href="javascript:;" class="card-shop"></a>
          </div>
        </li>
      </ul>
    </div>
    <!-- content end -->
    <div class="fixed-cart-wrap">
      <div class="fixed-item">
        <a href="javascript:;"><i class="iconfont phome"></i></a>
      </div>
      <div class="fixed-item">
        <a href="javascript:;"><i class="iconfont pgift"></i></a>
        <span class="deget">26</span>
      </div>
      <div class="fixed-item">
        <a href="javascript:;"><i class="iconfont pbook"></i></a>
      </div>
    </div>
  </div>
</template>
<script>
import api from 'src/api/index'
import utils from 'src/utils'
export default {

  name: 'giftgoods',

  data() {
    return {
      busy: true,
      pageIndex: 1,
      pageSize: 6,
      // 商品列表
      goodsList: []
    }
  },
  computed: {
  },
  created() {
    this.jumpId = this.$route.params.jumpId;
    // 根据jumpId获得商品列表
    this.loadMore(0);
  },
  methods: {
    // 加载更多数据
    loadMore(once) {
      api.getGoods({
        "clientIp": "127.0.0.1",
        "clientRequestTime": utils.dateFormat("yyyyMMddhhmm"),
        "requestData": JSON.stringify({
          "c": "9999" + this.jumpId,
          "channelSid": "1",
          "isColl": "1",
          "searchInfo": {
              "isava": "",
              "sorCol": "",
              "yunType": "",
              "ifPickup": "",
              "sorTye": "",
              "props": {},
              "pageModel": {
                  "pageNo": this.pageIndex,
                  "pageSize": this.pageSize
              }
          }
      }),
      "systemNo": "06"
    }).then(data => {
        let resData = JSON.parse(data.body.obj)
        // 结果数据
        let rows = resData.resultInfo.pageModel.rows;
        if (rows) {
          this.goodsList = this.goodsList.concat(rows)
          this.pageIndex ++
        }
        this.$nextTick(() => {
          this.$emit('finish')
          if (rows && rows.length >= this.pageSize) {
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
      }, err => {
        console.log(err)
      })
    }
  }
};
</script>
