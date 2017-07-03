<style lang="scss" src="./css/giftcard-theme.scss" scoped></style>
<template>
  <div class="fiftcard-theme">
    <div class="card-title" :class="{ open: isOpen }">
      <div class="scrollspy">
        <div class="scrollspy-text">切换楼层</div>
      </div>
      <div class="card-inner">
        <bl-navbar class="ovfs hide-scrollbar" v-model="tabsModel">
          <bl-tab-item class="ovfs-item" v-for="(item, index) in aTab" :id="index" @click.native="[fnSelect(index, item), isOpen = false]">
            <div class="card-word">{{ item.categoryName }}</div>
          </bl-tab-item>
        </bl-navbar>
      </div>
      <div class="right-down" :class="{ active: isOpen }" @click="isOpen = !isOpen"></div>
    </div>
    <ele-card class="card-margin" :item="eItem" v-if="load"></ele-card>
    <div v-show="!load" class="card-wrap">
      <h5 class="cwrap-title">{{ cwrapTitle }}</h5>
      <bl-card-list v-if="jumpId" :jumpId="jumpId" @finish="inlineLoading && inlineLoading.close()"></bl-card-list>
    </div>
    <bl-shop-card></bl-shop-card>
  </div>
</template>
<script>
import api from './api'
import utils from 'src/utils'
import ScrollTo from 'scroll'
let fnScroll = (el) => {
  return el.offsetLeft - (document.body.clientWidth / 2 - el.clientWidth / 2)
}
export default {

  name: 'giftcard-theme',

  components: {
    'eleCard': () => System.import('./_eleCard'),
    'blShopCard': () => System.import('src/components/iBailianApp/shopCard'),
    'blCardList': () => System.import('./_cardLIst'),
  },

  data () {
    return {
      inlineLoading: null,
      load: false,
      isOpen: false,

      jumpId: null,
      eItem: null,
      cwrapTitle: '',
      list: [],
      tabsModel: 0,
      aTab: []
    };
  },
  created() {
    let webTitle = decodeURI(this.$route.params.themeName)
    document.title = webTitle
    window.CTJSBridge && window.CTJSBridge._setNativeTitle(webTitle)
    api.queryCategory({
      data: JSON.stringify({
        channelSid: "1",
        parentId: "9999" + this.$route.params.jumpId
      })
    }).then(res => {
      this.$loading.close()
      if (res.body.msg) {
        return this.$toast({
          position: 'bottom',
          message: res.body.msg
        })
      }
      let resData = utils.transData(res.body.obj)
      console.log("zpzpzpzz" + JSON.stringify(resData))
      if (resData) {
        this.aTab = resData.resultInfo.categorys
        this.jumpId = this.aTab[0].categoryId.replace('9999', '')
        this.cwrapTitle = this.aTab[0].categoryName
        // sensor analytics
        try {
          console.log((new Date()).toLocaleString() + 'APP_礼品卡分类' + this.cwrapTitle)
          sa.track('$pageview', {
            pageId: 'APP_礼品卡_' + this.cwrapTitle,
            categoryId: 'APP_Lipinka',
            $title: 'APP_礼品卡_' + this.cwrapTitle
          });
        } catch (err) {
          console.log("sa error => " + err);
        }
      }
    }, err => {
      console.log(err)
    })
  },
  methods: {
    fnSelect(index, item) {
      if (item.categoryName.indexOf('不定额') != -1) {
        this.eItem = item
        this.load = true
        this.cwrapTitle = item.categoryName
      } else {
        this.load = false
        this.jumpId = item.categoryId.replace('9999', '');
        this.cwrapTitle = item.categoryName
      }
      // sensor analytics
      try {
        console.log((new Date()).toLocaleString() + 'APP_礼品卡分类' + this.cwrapTitle)
        sa.track('$pageview', {
          pageId: 'APP_礼品卡_' + this.cwrapTitle,
          categoryId: 'APP_Lipinka',
          $title: 'APP_礼品卡_' + this.cwrapTitle
        });
      } catch (err) {
        console.log("sa error => " + err);
      }
    }
  },
  watch: {
    'tabsModel'(val) {
      this.$nextTick(() => {
        ScrollTo.left($('.ovfs')[0], fnScroll($('.ovfs .ovfs-item').eq(val)[0]))
      });
    }
  }
};
</script>
