<template>
  <div id="index">
    <h2>iBaiappVue项目 页面索引</h2>
    <p><a href="/#/ui/guide">test</a></p>
  </div>
</template>

<script>
export default {

  name: 'keepGuide',

  data () {
    return {

    };
  },
  created() {
    this.$loading.close()
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
  p {
    padding: rem(15);
    font-size: rem(28)
  }
}
</style>
