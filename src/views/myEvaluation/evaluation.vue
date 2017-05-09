<template>
  <div class="evaluation">
    <!-- 轮播图 -->
    <bl-slide class="evaluation-swipe" :slides="allSlides" :autoPlay="true"></bl-slide>
    <!-- end -->
    <bl-navbar class="collection-tab flex" v-model="tabsModel">
      <bl-tab-item class="flex-item flex-c-m" v-for="(item, index) in filterEleTabs" :id="index" @click.native="changeTab(index)"><span>{{ item.deployName }}({{ item.num }})</span></bl-tab-item>
    </bl-navbar>
    <div class="goods-box">
      <div class="goods-item flex">
        <div class="goods-img lazy-box">
          <img class="lazy" v-lazy="{ src: 'http://placeholder.qiniudn.com/400x400' }">
        </div>
        <div class="goods-des flex-item">
          <div class="goods-title">家安 挂式空调消毒剂 360ml +360ml</div>
          <div class="goods-text">评价+晒单最多可获得30积分</div>
          <div class="goods-btn-group">
            <bl-button type="outlineMain" inline size="small">评价晒单</bl-button>
          </div>
        </div>
      </div>
      <div class="goods-item flex">
        <div class="goods-img lazy-box">
          <img class="lazy" v-lazy="{ src: 'http://placeholder.qiniudn.com/400x400' }">
        </div>
        <div class="goods-des flex-item">
          <div class="goods-title">家安 挂式空调消毒剂 360ml +360ml</div>
          <div class="goods-text">评价+晒单最多可获得30积分</div>
          <div class="goods-btn-group">
            <bl-button type="outlineMain" inline size="small">评价晒单</bl-button>
          </div>
        </div>
      </div>
      <div class="goods-item flex">
        <div class="goods-img lazy-box">
          <img class="lazy" v-lazy="{ src: 'http://placeholder.qiniudn.com/400x400' }">
        </div>
        <div class="goods-des flex-item">
          <div class="goods-title">家安 挂式空调消毒剂 360ml +360ml</div>
          <div class="goods-text">评价+晒单最多可获得30积分</div>
          <div class="goods-btn-group">
            <bl-button type="outlineMain" inline size="small">评价晒单</bl-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'evaluation',

  data () {
    return {
      tabsModel: '0',
      filterEleTabs: [
        {
          deployName: '待评价',
          num: '1'
        },
        {
          deployName: '待晒单',
          num: '1'
        },
        {
          deployName: '晒单完成',
          num: '1'
        }
      ],
      allSlides: []
    };
  },
  mounted() {
    this.$loading.close()
  },
  methods: {
    changeTab(index) {
      this.tabsModel = String(index)
    }
  }
};
</script>

<style lang="scss" src="./css/evaluation.scss" scoped></style>
<style lang="scss">
  @import "src/sass/tobe/function";
  .evaluation-swipe{
    height: rem(200);
  }
</style>
