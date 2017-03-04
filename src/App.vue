<template>
  <div id="app">
    <template v-if="show">
      <bl-bar v-show="toggle">
        <div class="button" slot="left-button" @click="$router.go(-1)">返回</div>
        <div slot="title">bar</div>
        <div class="button" slot="right-button" @click="toggle = false">关闭</div>
      </bl-bar>
      <button v-show="!toggle" class="button" @click="toggleFn()" style="position: fixed; top: 0; left: 44px; z-index: 100">切换</button>
    </template>
    <keep-alive :include="/keep/">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: process.env.NODE_ENV === 'development',
        toggle: process.env.NODE_ENV === 'development'
      }
    },
    methods: {
      toggleFn() {
        this.toggle = !this.toggle
      }
    }
  }
</script>
