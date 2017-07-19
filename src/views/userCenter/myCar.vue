<template>
<div>
	<div class="mycar" v-if="licenseCode">
		<div class="car-item">		
			<img class="carPic" src="./i/car.png">{{ licenseCode }}
			<img class="delete" src="./i/delete.png" @click="remove">
		</div>
	</div>
	<div class="car" v-if= "!licenseCode">
		<img :src="register || require('./i/no-car.png')">
		<div class="noCar">
			暂无绑定车牌
		</div>
	</div>
	<div class="bt">
		<div class="remind" v-if="!bind">
			每个用户最多可以绑定1辆车
		</div>
		<div id="bottom">
			<div class="input" v-if="bind">
				<div class="detail">
				 <i class="iconfont error" @click="close"></i>
					填写真实有效的车牌号码
				</div>
				<div class="carNo">
					<input type="text" maxlength="7" v-model="input">
				</div>
			</div>
			<div class="bindCar">
				<bl-button @click="bindCar">绑定车辆</bl-button>
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
    	input: '', // 输入的车牌号
    	bind: false,
    	licenseCode: ''
    };
  },
  created () {
  	this.licenseCode = decodeURIComponent(this.$route.query.licenseCode)
  	console.log(this.licenseCode)
  	// undefined: 没有绑定车牌
  	if (this.licenseCode == 'undefined') {
  		this.licenseCode = false
  	}
  	this.$loading.close()
  },
  methods: {
  	bindCar() {
  		this.bind = !this.bind
  		if (this.bind) {
  			// 绑定车牌
  		}
  	},
  	close() {
  		this.bind = false
  	},
  	remove() {
  		window.CTJSBridge.LoadMethod('AlertController', 'showAlert', {
  		  title: "提示",
  		  message: "确认解除绑定？",
  		  buttons: [
  		  {
  		    title: "取消"
  		  }, {
  		    title: "确定",
  		    style: "highlighted"
  		  }]
  		}, { success: data => {
	  		  console.log("####success#####" + data)
	  		  let bd = JSON.parse(data)
	  		  let button = bd.buttonTitle
	  		  if (button == "确定") {
	  		  	console.log(button)
	  		  }
  		  }
  		})
  	}
  }
};
</script>

<style lang="scss" src="./css/myCar.scss" scoped>
</style>
