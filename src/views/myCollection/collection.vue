<template>
  <div class="collection">
    <bl-navbar class="collection-tab flex" v-model="tabsModel">
      <bl-tab-item class="flex-item flex-c-m" v-for="({ jumpId, deployName }, index) in filterEleTabs" :id="index" @click.native="changeTab(index)"><span>{{ deployName }}</span></bl-tab-item>
    </bl-navbar>
    <bl-tab-container v-model="tabsModel">
      <bl-tab-container-item id="0">
        <div class="goods-box">
          <div class="goods-item flex">
            <div class="goods-img lazy-box">
              <img class="lazy" v-lazy="{ src: 'http://placeholder.qiniudn.com/400x400' }">
            </div>
            <div class="goods-des flex-item">
              <div class="goods-title">家安 挂式空调消毒剂 360ml +360ml</div>
              <div class="goods-price"><span>¥</span>132.00</div>
            </div>
          </div>
          <div class="goods-item flex">
            <div class="goods-img lazy-box">
              <img class="lazy" v-lazy="{ src: 'http://placeholder.qiniudn.com/400x400' }">
            </div>
            <div class="goods-des flex-item">
              <div class="goods-title">家安 挂式空调消毒剂 360ml +360ml</div>
              <div class="goods-price"><span>¥</span>132.00</div>
            </div>
          </div>
          <div class="goods-item flex">
            <div class="goods-img lazy-box">
              <img class="lazy" v-lazy="{ src: 'http://placeholder.qiniudn.com/400x400' }">
            </div>
            <div class="goods-des flex-item">
              <div class="goods-title">家安 挂式空调消毒剂 360ml +360ml</div>
              <div class="goods-price"><span>¥</span>132.00</div>
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
export default {

  name: 'collection',

  data () {
    return {
      tabsModel: '0',
      filterEleTabs: [
        {
          deployName: '我收藏的商品',
          jumpId: 12123
        },
        {
          deployName: '我收藏的门店',
          jumpId: 12124
        }
      ]
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

<style lang="scss" src="./css/collection.scss" scoped></style>
