<style lang="scss">
@import "../sass/tobe/function";
.loading-box {
  .msg {
    line-height: rem(70*2);
    text-align: center;
    font-size: rem(14*2);
  }
}

.loading-start {
  margin: rem(20*2) auto rem(20*2) auto;
  position: relative;
  animation: rotate-forever 1s infinite linear;
  height: rem(30*2);
  width: rem(30*2);
  border: rem(4*2) solid #ccc;
  border-right-color: transparent;
  border-radius: 50%;
  .msg {
    display: none;
  }
}

@keyframes rotate-forever {
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
<template>
  <div class="loading-box">
    <div :class="!complete ? 'loading-start' : 'msg'">
      {{ complete ? '没有了' : '' }}
    </div>
  </div>
</template>
<script>
import utils from 'src/utils'
export default {
  name: 'Loading',
  props: {
    complete: { // 是否加载完成
      type: Boolean,
      default: false
    },
    loading: { // 是否在请求中
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      state: this.loading
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (utils.isSeeing(this.$el) && !this.state) {
        this.state = true
        this.$emit('seeing')
      }
    }, 300)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  watch: {
    loading(to) {
      this.state = to
    }
  }
}
</script>
