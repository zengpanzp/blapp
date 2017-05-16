<template>
  <div class="collection">
    <bl-navbar class="collection-tab flex" v-model="tabsModel">
      <bl-tab-item class="flex-item flex-c-m" v-for="({ jumpId, deployName }, index) in filterEleTabs" :id="index" @click.native="changeTab(index)"><span>{{ deployName }}</span></bl-tab-item>
    </bl-navbar>
    <bl-tab-container v-model="tabsModel">
      <bl-tab-container-item id="0">
        <div class="goods-box" >
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
      </bl-tab-container-item>
      <bl-tab-container-item id="1">
        <div class="shop-box">
          <div class="shop-main">
            <div class="shop-item flex-c-m">
              <div class="shop-item-icon flex-c-m">
                <svg class="icon"><use xlink:href="#icon-aixin2"></use></svg>
              </div>
              <div class="flex-item">
                <div class="shop-title">华阳超市罗阳店</div>
                <div class="shop-address">莲花南路438号</div>
              </div>
            </div>
            <div class="shop-item flex-c-m">
              <div class="shop-item-icon flex-c-m">
                <svg class="icon"><use xlink:href="#icon-aixin2"></use></svg>
              </div>
              <div class="flex-item">
                <div class="shop-title">华阳超市罗阳店</div>
                <div class="shop-address">莲花南路438号</div>
              </div>
            </div>
            <div class="shop-item flex-c-m">
              <div class="shop-item-icon flex-c-m">
                <svg class="icon"><use xlink:href="#icon-aixin2"></use></svg>
              </div>
              <div class="flex-item">
                <div class="shop-title">华阳超市罗阳店</div>
                <div class="shop-address">莲花南路438号</div>
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
      list: []
    };
  },
  created() {
    let temp = []
    utils.isLogin().then(data => {
      let memberToken = data.member_token
      api.queryFavorites({
        member_token: memberToken
      }).then(data => {
        // console.log("gjgjgjjg" + JSON.stringify(data.body))
        let resData = JSON.parse(data.body.obj)
        let aloha = resData.list
        console.log("hhahahhaha" + aloha)
        for (let item of aloha) {
          temp.push(item.productId)
        }
        var request = {
           productIds: temp.join(','),
           channel: "1",
           pageNo: "1",
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
          let rows = JSON.parse(data.body.obj)
          this.list = rows.resultInfo.rows
          this.$loading.close()
          console.log("hahahahhaha" + rows)
          // console.log('######resultInfo######' + JSON.stringify(rows.resultInfo))
        })
    })
    })
  },
  mounted() {
    // alert(this.$route.query.deployName)
    this.deployName = this.$route.params.deployName;
  },
  methods: {
    changeTab(index) {
      this.tabsModel = String(index)
    }
  }
};
</script>

<style lang="scss" src="./css/collection.scss" scoped></style>
