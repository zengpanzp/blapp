<template>
  <div id="index">
    <h2>iBaiappVue项目 页面索引</h2>

    <h3 class="second-title">组件</h3>
    <router-link :to="{ path: '/components' }">组件</router-link>

    <h3 class="second-title">ui路由</h3>
    <router-link :to="{ path: item.path }" v-if="item.meta && item.meta.title" v-for="(item, index) in auiRouter">{{ index }}: {{ item.meta.title }}</router-link>

    <h3 class="second-title">prd路由</h3>
    <router-link :to="{ path: item.path }" v-if="item.meta && item.meta.guideLink" v-for="(item, index) in aprdRouter">{{ index }}: {{ item.meta.title }}</router-link>

    <h3 class="second-title">H5路由</h3>
    <router-link :to="{ path: item.path }" v-if="item.meta && item.meta.title" v-for="(item, index) in ah5Router">{{ index }}: {{ item.meta.title }}</router-link>
  </div>
</template>

<script>
import { uiRouter } from 'src/router/uiRouter'
import { prdRouter } from 'src/router/prdRouter'
import { componentsRouter } from 'src/router/componentsRouter'
import { h5Router } from 'src/router/h5Router'

export default {

  name: 'keepGuide',

  data () {
    return {
      auiRouter: [],
      aprdRouter: [],
      acomponentsRouter: [],
      ah5Router: [],
    };
  },
  created() {
    this.auiRouter = uiRouter
    this.aprdRouter = prdRouter
    this.acomponentsRouter = componentsRouter
    this.ah5Router = h5Router
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
