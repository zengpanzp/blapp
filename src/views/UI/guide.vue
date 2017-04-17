<template>
  <div id="index">
    <h2>iBaiappVue项目 页面索引</h2>
    <h3 class="second-title">ui路由</h3>
    <router-link :to="{ path: item.path }" v-if="item.meta && item.meta.title" v-for="(item, index) in auiRouter">{{ index }}: {{ item.meta.title }}</router-link>

    <h3 class="second-title">prd路由</h3>
    <router-link :to="{ path: item.path }" v-if="item.meta && item.meta.title" v-for="(item, index) in aprdRouter">{{ index }}: {{ item.meta.title }}</router-link>
    <router-link :to="{ path: '/banknote/11461' }">测试</router-link>
  </div>
</template>

<script>
import { uiRouter } from 'src/router/uiRouter'
import { prdRouter } from 'src/router/prdRouter'

export default {

  name: 'keepGuide',

  data () {
    return {
      auiRouter: [],
      aprdRouter: []
    };
  },
  activated() {
    this.$loading.close()
    this.auiRouter = uiRouter
    this.aprdRouter = prdRouter
  }
};
</script>

<style lang="scss" scope>
@import "src/sass/tobe/function";
#index {
  padding: rem(20);
  h2 {
    margin: 0 0 rem(10)
  }
  a {
    display: block;
    background-color: #fff;
    margin-bottom: rem(10);
    padding: rem(15);
    font-size: rem(28)
  }
}
.second-title{
  text-align: center;
  margin: rem(20) 0;
}
</style>
