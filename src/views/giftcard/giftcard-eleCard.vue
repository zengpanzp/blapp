<style lang="scss" src="./css/giftcard-theme.scss" scoped></style>
<template>
  <div class="fiftcard-theme">
    <div class="card-title">
      <div class="scrollspy">
        <div class="scrollspy-text">切换楼层</div>
      </div>
      <div class="card-inner">
        <bl-navbar class="ovfs hide-scrollbar" v-model="tabsModel">
          <bl-tab-item class="ovfs-item" v-for="(item, index) in aTab" :id="index" @click.native="fnSelect(index)">
            <div class="card-word">{{ item }}</div>
          </bl-tab-item>
        </bl-navbar>
      </div>
      <div class="right-down" @click="con()"></div>
    </div>
    <ele-card v-if="load"></ele-card>
    <div v-show="!load" class="card-wrap">
      <h5 class="cwrap-title">定额卡</h5>
      <bl-card-list :jumpId="161228"></bl-card-list>
    </div>
    <bl-shop-card></bl-shop-card>
  </div>
</template>
<script>
// import api from 'src/api'
export default {

  name: 'giftcard-theme',

  components: {
    'eleCard': () => System.import('./_eleCard'),
    'blShopCard': () => System.import('src/components/iBailianApp/shopCard'),
    'blCardList': () => System.import('./_cardLIst'),
  },

  data () {
    return {
      load: false,
      list: [],
      tabsModel: 0,
      aTab: ['定额卡', '自定义面额卡']
    };
  },
  created() {
  },
  methods: {
    fnSelect(index) {
      if (index) {
        this.load = true
      } else {
        this.load = false
      }
    },
    con: function() {
      $('.right-down').on('click', function() {
        $(this).toggleClass('active');
        $('.card-title').toggleClass('open');
      });
    }
  }
};
</script>
