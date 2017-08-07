<template>
  <bl-popup v-model="showModal" position="bottom" class="pop-select">
    <bl-bar class="bar-relate">
      <div class="button" slot="left-button" @click="showModal = false">取消</div>
      <div slot="title" v-html="title"></div>
      <div class="button confirm-btn" slot="right-button" @click="confirm">确认</div>
    </bl-bar>
    <bl-calendar
      class="pop-select-calendar"
      v-if="selectCalendar && showModal"
      :limit="limit"
      :unselectData="unselectData"
      :showLastDays="false"
      :showNextDays="false"
      v-model="value"
      @changeMonth="changeMonth">
    </bl-calendar>
    <div class="select-pop-box" v-else>
      <bl-cell :title="item.label" tag="label" :showArrowRight="false" v-for="item in selectArr" v-if="selectArr && selectArr.length">
        <div class="select-box" slot="cell-main">
          <input type="checkbox" :value="item" class="select-icon" v-model="value" name="select" slot="cell-main" v-if="isMutil">
          <input type="radio" :value="item" class="select-icon" v-model="value" name="select" slot="cell-main">
        </div>
      </bl-cell>
      <slot name="select-slot"></slot>
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
    titleSub: String, // 副标题
    // 是否显示
    showModal: {
      type: Boolean,
      default: false
    },
    // 标题
    title: String,
    // 是否可以多选，默认单选
    isMutil: {
      type: Boolean,
      default: false
    },
    // 选中的值
    value: {},
    // list数组
    selectArr: Array,
    firstSelect: {
      type: Boolean,
      default: true
    },

    // 日历
    selectCalendar: {
      type: Boolean,
      default: false
    },
    unselectData: Array,
    limit: Object,
    changeMonth: Function
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
      } else {
        if (this.firstSelect && !this.value && this.selectArr && this.selectArr.length) {
          this.value = this.selectArr[0]
        }
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
  .pop-select-calendar{
    min-height: rem(700);
  }
</style>
