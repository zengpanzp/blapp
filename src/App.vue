<template>
  <div id="app">
    <keep-alive :include="/keep/">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
      return {}
    },
    mounted() {
      this.appShow()
    },
    methods: {
      appShow() {
        const END_TIME = new Date().getTime() // 结束时间
        const diffTime = END_TIME - window.PAGE_START_TIME
        const timer = setTimeout(() => {
          clearTimeout(timer)
          document.querySelector('body').removeChild(document.querySelector('.ant-transparent'))
        }, diffTime > 2000 ? 0 : 2000 - diffTime)
      }
    }
}
</script>
