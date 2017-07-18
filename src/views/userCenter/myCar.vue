<template>
<div>
	<div class="car">
		<img :src="register || require('./i/no-car.png')">
		<div class="noCar">
			暂无绑定车牌
		</div>
	</div>
	<div class="bt">
		<div class="remind">
			每个用户最多可以绑定1辆车
		</div>
		<div id="bottom">
			<div class="bindCar">
				<bl-button @click="exit" class="btn-exit">绑定车辆</bl-button>
			</div>
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
