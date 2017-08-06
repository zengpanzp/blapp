<template>
  <div id="index">
    <h3 class="second-title">组件</h3>
    <router-link :to="{ path: item.path }" v-if="item.meta && item.meta.title" v-for="(item, index) in acomponentsRouter">{{ index }}: {{ item.meta.title }}</router-link>
  </div>
</template>

<script>
import { componentsRouter } from 'src/router/componentsRouter'

export default {

  name: 'keepComponents',

  data () {
    return {
      acomponentsRouter: []
    };
  },
  created() {
    this.acomponentsRouter = componentsRouter
  },
  activated() {
    this.$loading && this.$loading.close()
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
