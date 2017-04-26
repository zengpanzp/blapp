<template>
  <div class="swiper-container" ref="slide" v-show="show">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-if="slides.length > 1" v-for="item in slides" v-go-native-resource="item">
        <a href="javascript:;"><img :_src="item.mediaUrl" :alt="item.deployName"></a>
      </div>
      <div class="swiper-slide" v-else v-go-native-resource="item">
        <a href="javascript:;"><img :src="item.mediaUrl" :alt="item.deployName"></a>
      </div>
    </div>
    <div class="swiper-pagination" v-if="pagination">
      <ul></ul>
    </div>
  </div>
</template>

<script>
import TouchSlide from './TouchSlide'
export default {

  name: 'Slide',

  data() {
    return {
      show: true
    }
  },

  props: {
    pagination: {
      type: Boolean,
      default: true
    },
    effect: {
      type: String,
      default: 'leftLoop'
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    slides: {
      type: Array,
      default: []
    }
  },
  watch: {
    'slides'(items) {
      if (items.length == 0) {
        this.show = false
      }
      if (items.length > 1) {
        this.reInitPages()
      }
    }
  },
  created() {
    if (this.slides.length > 0) {
      this.reInitPages();
    }
  },
  methods: {
    /* init */
    reInitPages() {
      this.$nextTick(() => {
        TouchSlide({
          slideCell: this.$refs.slide,
          titCell: this.pagination ? ".swiper-pagination ul" : false,
          mainCell: ".swiper-wrapper",
          effect: this.effect,
          autoPlay: this.autoPlay,
          delayTime: 300,
          interTime: 2000,
          autoPage: this.pagination,
          switchLoad: "_src"
        })
      });
    }
  }
}
</script>

<style lang="scss">
  @import "../sass/tobe/function";
  .swiper-container{
    position: relative;
    width: 100%;
    overflow: hidden;
    height: rem(280);
    background: #fff url('../../assets/icon_banner_loading.png') no-repeat center;
    background-size: rem(50);
  }
  .swiper-wrapper{
    height: 100%;
  }
  .swiper-slide{
    // position: relative;
    & + &{
      display: none;
    }
    a{
      display: block;
      // position: absolute;
      // z-index: 1000;
      // left: 50%;
      // top: 50%;
      // @include transform(translate3d(-50%, -50%, 0)!important);
      // width: 100%;
      // font-size: 0;
    }
   }
  .swiper-pagination{
    position: absolute;
    bottom: rem(16);
    left: 50%;
    @include transform(translate3d(-50%, 0, 0));
    li {
        display: inline-block;
        width: rem(14);
        height: rem(14);
        @include border-radius(20px);
        text-indent: -9999px;
        overflow: hidden;
        margin: 0 rem(8);
        background-color: #fff;
        &.on{
          background-color: #ec4b6a;
        }
    }

  }

  /* 闪购首页轮播图 */

  .flash-swipe {
    height: rem(350);
    .swiper-pagination li {
      background-color: rgba(#fff, .5);
      width: rem(12);
      height: rem(12);
      border: 0;
      &.on {
        background-color: #C18800;
      }
    }
  }
  /* 电器城 */
  .electric-swipe{
    height: rem(280);
    .swiper-pagination li {
      background-color: #3b81cb;
      border-color: #3b81cb;
      opacity: .8;
      width: rem(16);
      height: rem(16);
      border: 0;
      &.on {
        background-color: #fff;
      }
    }
  }


</style>
