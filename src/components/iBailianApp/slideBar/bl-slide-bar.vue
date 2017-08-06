<template>
  <bl-popup v-model="showModal" position="right" class="sxerji">
    <div class="topHeader">
      <a class="cancel" @click="cancel">取消</a>
      <span>{{ title }}</span>
      <a href="javascript:;" class="ok" @click="confirmHandle">
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
        <div class="chongzhi" v-if="showReset">
          <button type="button" class="resetIcon" @click="value = (isMutil ? [] : '')">重置选项</button>
        </div>
      </div>
    </div>
  </bl-popup>
</template>

<script>
import utils from 'src/utils'
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
    },
    showReset: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cancel() {
      this.showModal = false
    },
    confirmHandle() {
      this.$emit('modalChange', false)
      this.$emit('input', this.value)
    }
  },
  watch: {
    showModal(val) {
      if (!val) {
        utils.looseBody()
        this.$emit('modalChange', val)
      } else {
        utils.fixedBody()
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .priceSelect {
    margin-bottom: rem(10);
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
      height: rem(88);
      line-height: rem(88);
      border-bottom: 1px solid #e9e9e9;
      color: #666;
      padding: 0 rem(20);
      display: block;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis
    }
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
    // border-radius: rem(24);
  }

  .flash-list .chongzhi,
  .flash-list .sxerji {
    background-color: #efeff4
  }

  .chongzhi {
    width: 100%;
    padding-top: 9px
  }

  .topHeader {
    left: 0;
    right: 0;
    height: rem(90);
    line-height: rem(90);
    padding: 0;
    background: #f5f5f5;
    border-bottom: 1px solid #e9e9e9;
    font-size: rem(32);
    font-weight: 400;
    z-index: 1;
    color: #343434;
    overflow: hidden;
    // border-top-left-radius: rem(12);
    a {
      display: inline-block;
      font-size: rem(28);
      margin: rem(10) rem(12);
      border: none;
      border-radius: rem(12);
      line-height: rem(70);
      padding: 0 rem(12);
      color: #424242
    }
    .ok {
      right: rem(8);
      background: #e6133c;
      color: #fff;
      padding: 0 rem(24);
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
  .resetIcon {
    padding: rem(18) rem(94);
    display: block;
    margin: rem(20) auto;
    color: #232323;
    background: #fff;
    border: 1px solid #e9e9e9;
    border-radius: rem(12)
  }
</style>
