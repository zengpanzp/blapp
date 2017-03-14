<style lang="scss" src="src/sass/_rankMain.scss"></style>
<template>
  <div class="new">
    <div class="floor-head">
      <ul class="floor-head-ul flex-c-m">
        <li><span>今日黑马</span></li>
        <li><span>时髦货</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {

  name: 'mainView',

  data() {
    return {

    };
  },
  created() {
    this.$loading.close()
  }
};
</script>
