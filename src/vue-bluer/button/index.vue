<template>
  <div
  :class="[ type, size, {'disabled': disabled, 'bl-button': !inline, 'bl-button-inline': inline} ]"
  @click="handleClick"
  :disabled="disabled">
    <span :class="icon" v-if="icon || $slots.icon">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </div>
</template>

<style lang="scss">
  @import "../sass/tobe/function";
  $btnBaseClass:           bl-button !default; //按钮的基本class
  $inlineBtnClass:         bl-button-inline !default; //行内按钮的基本class
  $outlineBtnClass:        bl-button-outline !default; //outline按钮基本class
  $inlineBtn:              () !default; // inline按钮 1.class 名称 2.背景色 3.文字色 4.宽度 5.高度
  $outlineBtn:             () !default; // outline按钮 1.class 名称 2.边框色 3.文字色 4.宽度 5.高度
  $btnMulti:               () !default; // block按钮 1.class 名称 2.按钮背景颜色

  %btn-basic{
    position: relative;
    z-index: 2;
    @include display(flex);
    @include align-items(center);
    @include justify-content(center);
    padding: 0 rem(10);
    margin: 0 auto;
    font-size: rem(34);
    text-align: center;
    text-decoration: none;
    color: #ffffff;
    height: rem(88);
    overflow: hidden;
    -webkit-appearance: none;
    border: 0;
    width: 100%;
    border: 1px solid #c5c5c5;
    border-radius: rem(6);
    &.middle{
      height: rem(68);
      font-size: rem(28);
    }
    &.small{
      height: rem(60);
      font-size: rem(24);
    }
    .preloader{
      width: rem(30);
      height: rem(30);
      margin-right: rem(16);
    }
  }

  // block btn multi
  @mixin btn-multi($btnMultis: $btnMulti) {
    .#{$btnBaseClass} {
      @extend %btn-basic;
    }
    @each $btn in $btnMultis {
      $class:      nth($btn,1);
      $bgColor:    nth($btn,2);
      $bdColor:    nth($btn,3);
      $textColor:  nth($btn,4);
      .#{$btnBaseClass}.#{"" + $class}{
        color: $textColor;
        background-color: $bgColor;
        border-color: $bdColor;
      }
    }
  }

  // inline
  %btn-inline{
    display: inline-block;
    position: relative;
    z-index: 2;
    padding: 0 rem(20);
    font-style: normal;
    font-weight: normal;
    text-align: center;
    line-height: rem(88);
    font-size: rem(36);
    -webkit-appearance: none;
    border: 1px solid #c5c5c5;
    border-radius: rem(6);
    &.middle{
      line-height: rem(68);
      font-size: rem(28);
    }
    &.small{
      line-height: rem(60);
      font-size: rem(24);
      padding: 0 rem(10);
    }
  }

  // inline multi
  @mixin multiInlineBtn($multiInlineBtns: $inlineBtnMulti) {
    .#{$inlineBtnClass} {
      @extend %btn-inline;
    }

    @each $multiInlineBtn in $multiInlineBtns {
      $class:      nth($multiInlineBtn,1);
      $bgColor:    nth($multiInlineBtn,2);
      $bdColor:    nth($multiInlineBtn,3);
      $textColor:  nth($multiInlineBtn,4);
      .#{$inlineBtnClass}.#{"" + $class} {
        color: $textColor;
        background-color: $bgColor;
        border-color: $bdColor;
      }
    }
  }

  $btnMulti: (primary #F13149 transparent #fff) (disabled #dddddd #aaaaaa #999999) (secondary #ffffff #aaaaaa #263238) (other #ffffff #455A64 #263238) (blueBtn #ccc transparent #fff);
  @include btn-multi($btnMulti);

  $inlineBtnMulti: (primary #F13149 transparent #fff) (disabled #dddddd #aaaaaa #999999) (secondary #ffffff #aaaaaa #263238) (other #ffffff #455A64 #263238) (outlineMain #ffffff #e31a41 #e31a41);
  @include multiInlineBtn($inlineBtnMulti);

</style>

<script>
export default {

  name: 'Button',

  data () {
    return {

    };
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: String,
    disabled: Boolean,
    inline: Boolean,
    icon: String
  },
  methods: {
    handleClick(evt) {
      if (!this.disabled) {
        this.$emit('click', evt)
      }
    }
  }
};
</script>
