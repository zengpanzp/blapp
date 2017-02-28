<template>
  <div id="app">
    <keep-alive :include="/keep/">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
