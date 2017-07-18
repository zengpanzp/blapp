<template>
<div>
	<div class="car">
		<img :src="register || require('../..//assets/headPic.png')">
	</div>
	<div id="bottom">
		<div class="bindCar">
			<bl-button @click="exit" class="btn-exit">绑定车辆</bl-button>
		</div>
		
	</div>
</div>
</template>

<script>
export default {

  name: 'myCar',

  data () {
    return {

    };
  },
  created () {
  	this.$loading.close()
  }
};
</script>

<style lang="scss" src="./css/myCar.scss" scoped>
</style>
