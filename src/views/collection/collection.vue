<template>
<div class="new">
    <bl-navbar v-model="selected">
      <bl-tab-item id="1">我收藏的商品</bl-tab-item>
      <bl-tab-item id="2">我收藏的门店</bl-tab-item>
    </bl-navbar>

    <!-- tab-container -->
    <bl-tab-container v-model="selected">
      <bl-tab-container-item id="1">
        <bl-cell v-for="n in 10" :title="'内容 ' + n" />
      </bl-tab-container-item>
      <bl-tab-container-item id="2">
        <bl-cell v-for="n in 4" :title="'测试 ' + n" />
      </bl-tab-container-item>
      <bl-tab-container-item id="3">
        <bl-cell v-for="n in 6" :title="'选项 ' + n" />
      </bl-tab-container-item>
    </bl-tab-container>
</div>
</template>

<script>
import api from 'src/api/index'
export default {

  name: 'collection',

  data() {
    return {
      selected: '1'
    };
  },
  created() {
    this.$loading.close()
    api.queryFavorites({
      member_token: "4acf40fa4a3f2a4181779d3240d4b40f94cf7d9c2828369c0fd479ddca8f6079"
    }).then(data => {
      console.log(data)
    })
  }
};
</script>
<style lang="css" scoped>
</style>

