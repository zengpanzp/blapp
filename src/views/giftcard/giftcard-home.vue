<style lang="scss" src="./css/giftcard-home.scss" scoped></style>
<template>
  <div id="giftcard" v-scroll-top.window v-scroll-record.window>
    <router-link tag="div" :to="{ path: '/giftCardMore', query: { search: 1, themeName: encodeURI('礼品卡') } }" class="head-search">
      <div class="search-contain">
        <div class="search-logo"></div>
        <input type="search" disabled="disabled">
      </div>
    </router-link>
    <bl-slide class="giftcard-swipe" :slides="allSlides" :autoPlay="true"></bl-slide>

    <div class="giftcard-class">
      <div class="class-container flex">
        <router-link :to="{ path: '/giftCardTheme/' + item.jumpId + '/' + encodeURI(item.jumpUrl.replace(item.jumpId, '')) }" class="class-detail" v-for="(item, index) in themeIcon">
          <div :class="'class-img' + index"></div>
          <p>{{ (item.jumpUrl).replace(item.jumpId, "") }}</p>
        </router-link>
      </div>
    </div>
    <template v-if="item.rows.length" v-for="item in filterAllCards">
      <div class="list-head">
        <img src="./i/cardlogo1.png" class="left-logo">
        <div class="head-text">{{ item.themeName }}</div>
        <img src="./i/cardlogo-r1.png" class="right-logo">
      </div>
      <div class="scroll-list" ref="container">
        <div class="scroll-ul">
          <div class="list-contain" v-for="row in item.rows">
            <div class="list-img lazy-box" v-go-native-goods-detail="row[0]">
              <img class="lazy" v-lazy.container="{ src: row[0].goodsImgPath.replace(/^http:/, '') }" />
              <div class="no-pro" v-if="row[0].isAvailable == 0">无&nbsp;&nbsp;&nbsp;货</div>
            </div>
            <div class="list-text" v-go-native-goods-detail="row[0]">{{ row[0].productName }}</div>
            <div class="list-pay">
              <div class="paynum"><span>¥</span>{{ row[0].marketPrice }}</div>
              <div class="pay-log-no" v-if="row.isAvailable == 0"></div>
              <div class="pay-log" v-else @click="addCard(row[0].goodsId, row[0])"></div>
            </div>
          </div>
          <router-link tag="div" :to="{ path: '/giftCardMore', query: { jumpId: item.jumpId, themeName: encodeURI(item.themeName) } }" class="get-more">
            <div class="get-more-e">MORE</div>
            <div class="get-more-c">查看更多</div>
          </router-link>
        </div>
      </div>
    </template>

    <div class="arrive-bottom"><div>·</div>到底啦<div>·</div></div>
    <bl-shop-card></bl-shop-card>
  </div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'keepgiftcard-home',

  components: {
    'blShopCard': () => System.import('src/components/iBailianApp/shopCard')
  },

  data () {
    return {
      loaded: false,

      searchText: '',
      allSlides: [], // 轮播图
      themeIcon: [], // 主题icon
      cardTheme: [], // 卡主题
      allCards: [] // 所有卡
    };
  },
  created() {
    api.queryAdDeploy({
      otherresource: {
        resourceId: "3040031,3040032,3040033"
      }
    }).then(data => {
      let resData = JSON.parse(data.body.obj)
      for (let item of resData.obj.otherResource) {
        if (item.resourceId === 3040031) {
          this.allSlides = item.advList
        }
        if (item.resourceId === 3040032) {
          this.themeIcon = item.advList
        }
        if (item.resourceId === 3040033) {
          this.cardTheme = item.advList
        }
      }
      for (let item of this.cardTheme) {
        let requestData = {
          "requestData": JSON.stringify({
            channelSid: "1",
            c: "9999" + item.jumpId,
            searchInfo: {
              pageModel: {
                pageNo: "1",
                pageSize: "5"
              }
            },
            isava: 0,
            isColl: "1"
          })
        }
        api.getGoods(requestData).then(res => {
          let resData = JSON.parse(res.body.obj)
          let resRows = resData.resultInfo.pageModel.rows
          if (resRows) {
            this.allCards.push({
              themeName: item.jumpUrl.replace(item.jumpId, ""),
              jumpId: item.jumpId,
              rows: resRows.splice(0, 5),
              priority: item.priority
            })
          }
          this.$nextTick(() => {
            this.$loading.close()
          })
        }, err => {
          console.log(err)
        })
      }
      this.loaded = true
    }, err => {
      console.log(err)
    })
  },
  activated() {
    if (this.loaded) {
      this.$loading.close()
    }
    // sensor analytics
    try {
      console.log((new Date()).toLocaleString() + 'APP_礼品卡首页')
      sa.track('$pageview', {
        pageId: 'APP_礼品卡首页',
        categoryId: 'APP_Lipinka',
        $title: '礼品卡首页'
      });
    } catch (err) {
      console.log("sa error => " + err);
    }
  },
  methods: {
    addCard(goodId, item) {
      utils.addCard(goodId, item)
    }
  },
  computed: {
    filterAllCards() {
      return utils.orderBy(this.allCards, 'priority')
    }
  }
};
</script>
