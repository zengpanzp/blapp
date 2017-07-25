<style lang="scss" src="./css/seeMore.scss" scoped></style>
<template>
  <div class="main">
      <div class="cxlist corner" v-if="goods.length > 0" v-for="item in goods">
          <div class="pic"><img :src="item.goodsImage"/></div>
          <div class="title">
            {{item.goodsName}}
              <br/>
              <p class="sell-service-reason">售后原因:{{item.returnReasonName}}</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {

  name: 'seeMore',

  data () {
    return {
    	goods: []
    };
  },
  created() {
  	this.$loading.close()
  	if (this.$route.params.goods) {
  		this.goods = JSON.parse(decodeURIComponent(this.$route.params.goods))
  	}
  	console.log(this.goods)
  }
};
</script>

<style lang="css" scoped>
</style>
