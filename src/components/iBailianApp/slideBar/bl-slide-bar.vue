<template>
  <bl-popup v-model="showModal" position="right" class="sxerji">
    <div class="topHeader">
      <a class="cancel" @click="cancel">取消</a>
      <span>{{ title }}</span>
      <a class="ok" @click="[confirmHandle(), cancel()]">
        <svg class="icon"><use xlink:href="#icon-check"></use></svg>确认
      </a>
    </div>
    <div class="serviceWrap">
      <div class="priceSelect">
        <ul id="flashSale_brand">
          <li v-for="item in list">
            <input class="filter-input" type="checkbox" :value="item.value" name="filter" v-model="value" v-if="isMutil">
            <input class="filter-input" type="radio" :value="item.value" name="filter" v-model="value" v-else>
            <a href="javascript:;">{{ item.label }}<svg class="icon"><use xlink:href="#icon-check"></use></svg></a>
          </li>
        </ul>
      </div>
    </div>
  </bl-popup>
</template>

<script>
export default {

  name: 'bl-slide-bar',

  data () {
    return {

    };
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    list: Array,
    value: {
      type: null
    },
    isMutil: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '筛选'
    }
  },
  methods: {
    cancel() {
      this.showModal = false
    },
    confirmHandle() {
      this.$emit('input', this.value)
    }
  },
  watch: {
    showModal(val) {
      this.$emit('modalChange', val)
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .priceSelect {
    margin-bottom: rem(.375*31.25);
    background: #fff;
    font-size: rem(28);
    li{
      position: relative;
    }
    .icon {
      float: right;
      height: 100%;
      width: rem(48);
      display: none;
    }
    .filter-input{
      opacity: 0;
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 100;
      &:checked + a .icon{
        display: block;
      }
      &:checked + a{
        color: #e6133c;
      }
    }
    a {
      position: relative;
      height: rem(3*31.25);
      line-height: rem(3*31.25);
      border-bottom: 1px solid #e9e9e9;
      color: #666;
      padding: 0 rem(.625*31.25);
      display: block;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis
    }
    // li.select{
    //   .icon{
    //     display: block;
    //   }
    // }
  }
  .new .topHeader span {
    color: #e6133c;
    font-size: rem(30);
  }

  .sxerji {
    position: fixed;
    z-index: 600000;
    height: 100%;
    width: 75%;
    border-radius: 12px
  }

  .flash-list .chongzhi,
  .flash-list .sxerji {
    background-color: #efeff4
  }

  .chongzhi {
    height: 50px;
    width: 100%;
    padding-top: 9px
  }

  .active-title-detail {
    height: rem(5.5375*31.25);
    border: 2px solid #333;
    box-sizing: border-box;
    border-top: none;
    padding: 1px
  }

  .active-detail-container {
    display: block;
    height: 100%;
    background: rgba(0, 0, 0, .6);
    p {
      font-size: rem(.75*31.25);
      padding-top: rem(.25*31.25)
    }

    .discount-num {
      color: #f0c17f;
      label {
        font-size: rem(1.125*31.25);
        padding-bottom: rem(.25*31.25)
      }
    }

    .discount-store-text {
      padding-top: rem(.25*31.25);
      font-size: rem(.625*31.25)
    }
  }

  .topHeader {
    left: 0;
    right: 0;
    height: rem(90);
    line-height: rem(90);
    padding: 0;
    background: #f5f5f5;
    border-bottom: 1px solid #e9e9e9;
    font-size: rem(1.1*31.25);
    font-weight: 400;
    z-index: 1;
    color: #343434;
    overflow: hidden;
    border-top-left-radius: rem(.375*31.25);
    a {
      display: inline-block;
      font-size: rem(.875*31.25);
      margin: rem(.32*31.25) rem(.375*31.25);
      border: none;
      border-radius: rem(.375*31.25);
      height: rem(2.25*31.25);
      line-height: rem(2.25*31.25);
      padding: 0 rem(.375*31.25);
      color: #424242
    }
    .ok {
      right: rem(.25*31.25);
      background: #e6133c;
      color: #fff;
      padding: 0 rem(.75*31.25);
    }
    .cancel {
      left: 0
    }
  }
  .serviceWrap {
    top: rem(90);
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .topHeader,
  .topHeader a {
    position: absolute;
    top: 0;
    text-align: center
  }
</style>
