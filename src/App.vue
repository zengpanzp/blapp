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
    document.querySelector('body').removeChild(document.querySelector('.ant-transparent'))
  }
}
</script>
