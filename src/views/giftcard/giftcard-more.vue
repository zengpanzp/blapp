<template>
  <div class="mar-con">
    <form v-on:submit.prevent="search" v-if="$route.query.search">
      <div class="head-search">
        <div class="search-contain">
          <div class="search-logo"></div>
          <input type="search" placeholder="礼品卡" v-model="searchText" ref="searchText" v-focus>
        </div>
      </div>
    </form>
    <bl-card-list style="margin-top: 0.25rem" :jumpId="$route.query.jumpId" :searchWord="searchWord"></bl-card-list>
    <bl-shop-card></bl-shop-card>
  </div>
</template>

<script>
  export default {
    name: 'giftcard-more',
    data() {
      return {
        searchText: '',
        searchWord: ''
      }
    },
    directives: {
      focus: {
        inserted(el) {
          el.focus()
        }
      }
    },
    components: {
      'blCardList': () => System.import('./_cardLIst'),
      'blShopCard': () => System.import('src/components/iBailianApp/shopCard'),
    },
    created() {
      document.title = decodeURI(this.$route.query.themeName)
      window.CTJSBridge && window.CTJSBridge._setNativeTitle(decodeURI(this.$route.query.themeName))
    },
    methods: {
      search() {
        if (this.searchText !== '') {
          console.log('search')
          this.searchWord = this.searchText
          // this.$route.query.search && this.$refs.searchText.blur()
        } else {
          this.$toast({
            message: '~请输入关键字~',
            position: 'bottom'
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .head-search {
    padding: rem(12) rem(30);
    background: #FFFFFF;
    .search-contain {
      background: #F6F6F6;
      padding-left: rem(68);
      position: relative;
      border-radius: rem(8);
      .search-logo {
        width: rem(68);
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        background: no-repeat url("./i/search.png") center center;
        background-size: rem(28);
      }
    }
    input {
      height: rem(60);
      width: 100%;
      border: none;
      outline: none;
      background: transparent;
    }
  }
</style>
