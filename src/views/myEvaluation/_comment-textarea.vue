<template>
  <div class="comment-area">
    <textarea
      v-model="message"
      class="textarea-msg"
      :class="{ 'disabled': message.length > maxLength || messageBoole }"
      :placeholder="placeholder">
    </textarea>
    <div class="comment-line" v-if="!message">不能少于1字</div>
    <div class="comment-line" v-else>{{ message.length > maxLength ? '已超出' + (message.length - maxLength)  + '字' : maxLength - message.length }}</div>
  </div>
</template>

<script>
export default {

  name: 'comment-textarea',

  data () {
    return {
      message: ''
    };
  },
  props: {
    placeholder: String,
    maxLength: {
      type: Number,
      default: 250
    },
    messageBoole: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    message(val) {
      this.$emit('input', val)
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .comment-area{
    margin: rem(16);
    border: 1px solid #cccccc;
    border-radius: rem(8);
    padding: rem(10);
    .textarea-msg{
      width: 100%;
      -webkit-user-select: text;
      min-height: rem(180);
      font-size: rem(28);
      outline: 0;
      resize: none;
      background-color: transparent;
      border: 0;
      &.disabled{
        border: 1px solid #e6133c;
        border-radius: rem(8);
      }
    }
    .comment-line{
      text-align: right;
      color: #a9a9a9;
      font-size: rem(28);
    }
  }
</style>
