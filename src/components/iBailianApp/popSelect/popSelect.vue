<template>
  <bl-popup v-model="showModal" position="bottom" class="pop-select">
    <bl-bar class="bar-relate">
      <div class="button" slot="left-button" @click="showModal = false">取消</div>
      <span slot="title">{{ title }}</span>
      <div class="button confirm-btn" slot="right-button" @click="[showModal = false, confirm()]">确认</div>
    </bl-bar>
    <div class="select-pop-box">
      <bl-cell :title="item.label" tag="label" :showArrowRight="false" v-for="item in selectArr">
        <div class="select-box" slot="cell-main">
          <input type="checkbox" :value="item.value" class="select-icon" v-model="value" name="select" slot="cell-main" v-if="isMutil">
          <input type="radio" :value="item.value" class="select-icon" v-model="value" name="select" slot="cell-main">
        </div>
      </bl-cell>
    </div>
  </bl-popup>
</template>

<script>
export default {

  name: 'popSelect',

  data () {
    return {

    };
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    title: String,
    isMutil: {
      type: Boolean,
      default: false
    },
    value: null,
    selectArr: Array
  },
  methods: {
    confirm() {
      this.$emit('on-hide', false)
      this.$emit('input', this.value)
    }
  },
  watch: {
    showModal(val) {
      if (!val) {
        this.$emit('on-hide', false)
      }
    }
  }
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .pop-select{
    width: 100%;
  }
  .bar.bar-relate{
    position: relative;
    .title{
      font-size: rem(32)
    }
    .confirm-btn{
      color: #39ca74;
    }
  }
  .select-box{
    text-align: right;
    display: block;
    height: rem(50);
    .select-icon:checked{
      background-color: #39ca74;
      border: 1px solid #39ca74;
    }
  }
  .select-pop-box{
    max-height: rem(700);
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
