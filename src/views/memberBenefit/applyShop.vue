<template>
<div class="new">
    <div class="freedom-top">
        <div class="interestsPic"><img src=""></div>
        <div class="freedom-name">
            <div class="freedom-text"></div>
        </div>
    </div>
    <ul class="fit-store">
        <li>上海市<i class="iconfont icon-down"></i></li>
        <li>市<i class="iconfont icon-down"></i></li>
        <li>区<i class="iconfont icon-down"></i></li>
    </ul>
    <div id="storeList"></div>
    <div class="empty storeEmpty store-margin" style="display: none">
        暂无相关店铺
    </div>
    <ul id="scroll" style="display: none"></ul>
</div>

</template>

<script>
export default {

  name: 'applyShop',

  data () {
    return {

    };
  },
  created() {
  	this.$loading.close()
  }
};
</script>

<style lang="css" scoped>
</style>
