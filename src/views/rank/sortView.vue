<style lang="scss" src="./css/_rankSortMain.scss" scoped></style>
<template>
  <div class="main">
    <div class="floor-head" v-if="!$route.query.more" v-scroll-top.window>
      <bl-navbar class="floor-head-ul ovfs" v-model="navTab" ref="oNav">
        <bl-tab-item class="floor-head-item ovfs-item" :id="index" v-for="(item, index) in aSort" @click.native="fetchGoods(item.id)"><span>{{ item.rankName }}</span></bl-tab-item>
      </bl-navbar>
    </div>
    <div class="rank-space">
      <img :src="require('./i/rank-head.png')">
    </div>
    <bl-list-view :data="aPrd"></bl-list-view>
    <div class="rank-space" v-if="showToggle">已经看完啦～</div>
  </div>
</template>

<script>
import utils from 'src/utils'
import ScrollTo from 'scroll'
export default {

  name: 'sortView',

  data () {
    return {
      inlineLoading: null,
      showToggle: false,
      navTab: 0,
      aSort: [],
      aPrd: []
    };
  },
  components: {
    'blListView': () => System.import('./_listView')
  },
  created() {
    this.$loading.close()
    let sTitle = this.$route.query.more ? '今日黑马' : '时髦货'
    document.title = sTitle
    setTimeout(() => {
      window.CTJSBridge._setNativeTitle(sTitle)
    }, 400)
    if (utils.dbGet('rankSort')) {
      this.aSort = JSON.parse(utils.dbGet('rankSort'))
    } else {
      window.CTJSBridge.LoadAPI('BLQueryRankListAPIManager', { rankType: '1' }, {
        success: data => {
          let parseData = JSON.parse(data)
          this.aSort = parseData.obj
          utils.dbSet('rankSort', parseData.obj)
        },
        fail: err => { console.log(err) },
        progress: data => {}
      })
    }
    this.navTab = this.$route.query.sortIndex
    this.fetchGoods(this.$route.params.blackId)
  },
  methods: {
    /* 商品列表请求 */
    fetchGoods(rankId) {
      this.inlineLoading = this.$toast({
        iconClass: 'preloader white',
        message: '加载中',
        duration: 'loading'
      })
      this.showToggle = false
      document.body.scrollTop = 0
      window.CTJSBridge.LoadAPI('BLQueryProductListAPIManager', { fkRankid: rankId }, {
        success: data => {
          let parseData = JSON.parse(data)
          this.aPrd = parseData.obj
          this.showToggle = true
          this.inlineLoading.close()
        },
        fail: err => { console.log(err) },
        progress: data => {}
      })
    },
  },
  watch: {
    'navTab'(val) {
      if (!this.$route.query.more) {
        let oTabItem = document.querySelectorAll('.floor-head-ul .floor-head-item')
        let fnScroll = (el) => {
          return el.offsetLeft - (document.body.clientWidth / 2 - el.clientWidth / 2)
        }
        ScrollTo.left(document.querySelector('.floor-head-ul'), fnScroll(oTabItem[val]))
      }
    }
  }
};
</script>
