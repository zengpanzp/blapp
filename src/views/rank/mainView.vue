<style lang="scss" src="src/sass/_rankMain.scss"></style>
<template>
  <div class="new" v-scroll-top.window>
    <div class="rank-main">
      <div class="floor-head">
        <bl-navbar class="floor-head-ul flex-c-m" v-model="navTab">
          <bl-tab-item class="floor-head-item" id="0" @click.native="tabScrollTop"><span>今日黑马</span></bl-tab-item>
          <bl-tab-item class="floor-head-item" id="1" @click.native="tabScrollNext"><span>时髦货</span></bl-tab-item>
        </bl-navbar>
      </div>
      <div class="rank-space">
        <img :src="require('src/assets/rank/rank-head.png')">
      </div>
      <bl-list-view :data="aPrd"></bl-list-view>
      <router-link tag="div" :to="{ path: '/rankSortPage/' + rankId, query: { more: 1 } }" class="rank-space">显示全部 ></router-link>
      <div class="rank-space" id="srotView">
        <img :src="require('src/assets/rank/rank-sort.png')">
      </div>
      <div class="rank-sort">
        <ul>
          <router-link tag="li" :to="{ path: '/rankSortPage/' + item.id, query: { sortIndex: index } }" v-if="aSort && aSort.length" v-for="(item, index) in aSort">
            <img class="rank-sort-img" v-lazy="item.imageurl">
            <div class="sort-text">{{ item.rankName }}</div>
          </router-link>
        </ul>
        <router-link tag="div" :to="{ path: '/rankSortPage/' + firstRankId, query: { sortIndex: 0 } }" class="rank-space">显示全部分类商品 ></router-link>
      </div>
    </div>
  </div>
</template>
<script>
import utils from 'src/utils'
import ScrollTo from 'scroll'
export default {

  name: 'keepMainView',

  components: {
    'blListView': () => System.import('./_listView')
  },

  data() {
    return {
      navTab: '0',
      loaded: false,
      firstRankId: '',
      rankId: '',
      aSort: [],
      aPrd: []
    };
  },
  created() {
    /* 分类请求 */
    this.fetchSort('0')
    this.fetchSort('1')
  },
  activated() {
    this.navTab = '0'
    if (this.loaded) {
      this.$loading.close()
    }
  },
  methods: {
    tabScrollTop(e) {
      ScrollTo.top(document.body, 0)
    },
    tabScrollNext(e) {
      let thisScrollTop = document.querySelector('#srotView').offsetTop
      ScrollTo.top(document.body, thisScrollTop)
    },
    /* 商品列表请求 */
    fetchGoods(GoodId) {
      window.CTJSBridge.LoadAPI('BLQueryProductListAPIManager', { fkRankid: GoodId }, {
        success: data => {
          let parseData = JSON.parse(data)
          this.aPrd = parseData.obj
          this.loaded = true
          this.$loading.close()
        },
        fail: err => { console.log(err) },
        progress: data => {}
      })
    },
    fetchSort(id) {
      window.CTJSBridge.LoadAPI('BLQueryRankListAPIManager', { rankType: id }, {
        success: data => {
          let parseData = JSON.parse(data)
          if (id === '0') {
            this.rankId = parseData.obj[0].id
            this.fetchGoods(parseData.obj[0].id)
          } else {
            this.aSort = parseData.obj
            this.firstRankId = parseData.obj[0].id
            utils.dbSet('rankSort', parseData.obj)
          }
        },
        fail: err => { console.log(err) },
        progress: data => {}
      })
    }
  }
};
</script>
