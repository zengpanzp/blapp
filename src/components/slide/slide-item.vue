<template>
  <div class="swiper-slide">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'slide-item',
  created() {
    this.update()
  },
  mounted() {
    this.$nextTick(() => {
      this.update()
    })
  },
  updated() {
    this.update()
  },
  methods: {
    update() {
      if (this.$parent && this.$parent.swiper) {
        this.$parent.swiper.update(true)
      }
    }
  }
}
</script>
