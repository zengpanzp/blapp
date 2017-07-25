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
				<bl-button @click="bindCar" :disabled="licenseCode">绑定车辆</bl-button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'myCar',

  data () {
    return {
    	input: '', // 输入的车牌号
    	bind: false, // 是否已绑定
    	licenseCode: '', // 绑定的车牌号
      buttons: [{
        text: '取消',
        onClick: () => {
          this.$toast({
            message: '已取消',
            position: "bottom"
          })
        }
      }, {
        text: '确定',
        onClick: () => {
          this.unbind()
        }
      }]
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
    try {
      sa.track('$pageview', {
        pageId: 'APP_我的车牌',
        categoryId: 'APP_User',
        $title: 'APP_我的车牌'
      })
    } catch (err) {
      console.log("sa error => " + err);
    }
  },
  methods: {
  	bindCar() {
      this.bind = !this.bind
      let reg = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/
  		if (!this.bind && reg.test(this.input)) {
        utils.isLogin().then(data => {
          let memberToken = data.member_token
          console.log(this.input)
          api.userCenter.modifyCar({
            member_token: memberToken,
            carLicense: this.input,
            actionType: 1
          }).then(data => {
            console.log(data)
            this.licenseCode = this.input
          })
        })
  		} else {
        if (!this.bind) {
          this.$toast({
            message: '请输入正确的车牌号！',
            position: "bottom"
          })
        }
      }
  	},
  	close() {
  		this.bind = false
  	},
  	remove() {
      this.$modal({
        title: '提示',
        content: '确定解除绑定？',
        buttons: this.buttons
      })
  	},
    unbind() {
      utils.isLogin().then(data => {
        let memberToken = data.member_token
        api.userCenter.modifyCar({
          member_token: memberToken,
          carLicense: this.licenseCode,
          actionType: 2
        }).then(data => {
          console.log(data.body.resCode)
          let resCode = data.body.resCode
          if (resCode == '00100000') {
            // 解绑成功
            this.licenseCode = false
          } else {
            this.$toast({
              message: data.body.msg,
              position: "bottom"
            })
          }
        })
      })
    }
  }
};
</script>

<style lang="scss" src="./css/myCar.scss" scoped>
</style>
