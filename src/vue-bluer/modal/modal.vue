<template>
  <div class="modal-mask" @touchmove.prevent v-show="showVisible">
    <div class="modal" :class="[className, effect]" :style="halfModal" ref="modal" @touchmove.prevent>
      <div class="modal-inner">
        <div class="modal-title" v-if="title !== ''">{{ title }}</div>
        <div class="modal-input" v-if="input"><!--<label>{{labelText}}</label>--><input type="text" v-model="inputValue" :placeholder="placeholder"></div>
        <div class="modal-text" v-else>{{ content }}<slot name="inner"></slot></div>
      </div>
      <div class="modal-buttons">
        <div class="modal-button" v-for="button in buttons" v-if="!input" v-text="button.text" @click="[button.onClick(), close()]"></div>
        <div class="modal-button" v-for="button in buttons" v-if="input" v-text="button.text" @click="[sure(), close()]"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../sass/tobe/function";
  $color-text:        #666666 !default;
  $modalDuration:     500ms !default;
  $modalBgColor:      #F8F8F8 !default;
  $modalButonColor:   #222222 !default;
  $modalButonBg:      #F8F8F8 !default;
  $borderColor:       #dddddd !default;
  $modalButtonHeight: rem(88) !default;
  $border-radius:     rem(6) !default;
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1
    }
  }
  @keyframes zoomIn {
    0% {
      opacity: 0;
      transform: scale3d(.4,.4,.4);
    }

    50% {
      opacity: 1;
      transform: scale3d(1.1, 1.1, 1.1);
    }

    100% {
      opacity: 1;
      transform: scale3d(1,1,1);
    }
  }
  .modal {
    width: rem(540);
    max-height: rem(1024);
    position: fixed;
    z-index: 11000;
    left: 50%;
    margin-left: rem(-270);
    margin-top: 0;
    overflow: hidden;
    top: 50%;
    text-align: center;
    border-radius: $border-radius;
    // opacity: 0;
    // @include transform(translate(0,-50%)!important);
    color: $color-text;
    // display: none;
    animation-duration: .5s;
    animation-fill-mode: both;
    &.fadeIn{
      animation-name: fadeIn;
    }
    &.modal-in{
      opacity: 1;
      @include transition-property(opacity);
      @include transition-duration($modalDuration);
      display: block;
    }
    &.zoomIn {
      animation-name: zoomIn;
    }
    &.modal-out {
      opacity: 0;
      z-index: 11000-1;
      @include transition-duration($modalDuration);
    }
  }
  // .modal-close{
  //     position: absolute;
  //     z-index: 3;
  //     right: rem(26);
  //     top: rem(26);
  //     background: transparent inline-image("base64/modal-close.png") no-repeat center center;
  //     background-size: contain;
  //     width: rem(30);
  //     height: rem(30);
  // }
  .modal-inner {
    padding: rem(30);
    @include hairline(bottom, $borderColor);
    border-radius: $border-radius $border-radius 0 0;
    position: relative;
    background: $modalBgColor;
  }
  .modal-input{
    margin-top: rem(20);
    /*label{*/
    /*font-size: rem(28);*/
    /*margin-right:rem(20) ;*/
    /*}*/
    input{
      font-size: rem(32);
      height: rem(70);
      line-height: rem(70);
      /*border:rem(.8) solid #3ea2ff;*/
      padding-left: rem(10);
      width: 90%;
      color:#666;
    }
  }
  .modal-title {
    font-weight: 500;
    font-size: rem(32);
    text-align: center;
    &.hairline{
      @include hairline(bottom, $borderColor);
      position: relative;
      padding-bottom: rem(20);
      &:after{
        left: rem(-30);
        right: rem(-30);
        width: auto;
      }
    }
    +.modal-text {
      margin: 0;
      padding-top: rem(10);
      font-size: rem(28);
      color: #666666;
      text-align: center;
    }
  }
  .modal-text {
    margin-top: rem(10);
    font-size: rem(32);
    color: #666666;
    margin: rem(30) 0;
    max-height: rem(488);
    overflow-y: auto;
  }
  .modal-buttons {
    height: rem(88);
    overflow: hidden;
    @include display(flex);
    &.modal-buttons-vertical {
      display: block;
      height: auto;
    }
  }
  .modal-button {
    width: 100%;
    padding: 0 rem(10);
    height: $modalButtonHeight;
    font-size: rem(34);
    border: 0;
    text-align: center;
    color: $modalButonColor;
    background: $modalButonBg;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    @extend %comm-flex;
    @include justify-content(center);
    @include hairline(right, $borderColor);
    @include flex(1);
    &:first-child {
      border-radius: 0 0 0 $border-radius;
    }
    &:last-child {
      background-image: none;
      border-radius: 0 0 $border-radius 0;
      color: #fff;
    }
    &:first-child:last-child {
      border-radius: 0 0 $border-radius $border-radius;
      background-origin: padding-box;
      color: $modalButonColor;
      @include hairline-remove(right);
    }
    &.modal-button-bold {
      font-weight: bold;
    }
    .modal-buttons-vertical & {
      background-image: none;
      @include hair(bottom, $borderColor);
      border-radius: 0;
      &:last-child {
        border-radius: 0 0 $border-radius $border-radius;
        background-image: none;
      }
    }
  }
  .modal-no-buttons {
    .modal-inner {
      border-radius: $border-radius;
      background-image: none;
    }
    .modal-buttons {
      display: none;
    }
  }
  .modal-button:last-child {
    background-image: none;
    border-radius: 0 0 0.08rem 0;
    color: #fff;
    background-color: #fd7072;
    border-radius: 0px 0px 0px 0.08rem;
  }
  .modal-button:first-child:last-child {
    border-radius: 0 0 0.08rem 0.08rem;
    background-origin: padding-box;
    color: #fff;
  }
  .modal-mask{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 1000;
  }
</style>

<script>

  export default {
    name: 'Modal',
    data () {
      return {
        halfHeight: '',
        showVisible: this.visible
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: true
      },
      placeholder: {
        type: String,
        default: ''
      },
      inputValue: {
        type: String,
        default: '    '
      },
      labelText: {
        type: String,
        default: ''
      },
      input: {
        type: Boolean,
        default: false
      },
      content: {
        type: String
      },
      className: {
        type: String
      },
      effect: {
        type: String,
        default: 'zoomIn'
      },
      buttons: {
        type: Array,
        default: () => {
          return [
            { text: '确定', onClick: function () {} }
          ]
        }
      }
    },
    computed: {
      halfModal: function() {
        return {
          'marginTop': this.halfHeight
        }
      }
    },
    created() {
        console.log("buttons", this.buttons)
    },
    watch: {
      "visible" (val) {
        this.showVisible = val;
        console.log(val)
      }
    },
    methods: {
      close() {
        this.showVisible = false;
        // 向父组件传递
        this.$emit("click", false);
      },
      // 确定
      sure() {
        this.showVisible = false;
        // 向父组件传递
        this.$emit("click", [this.inputValue, false]);
      }
    },
    mounted() {
        console.log(this.buttons)
      this.halfHeight = -(this.$refs.modal.offsetHeight / 2) + 'px'
    }
  }
</script>
