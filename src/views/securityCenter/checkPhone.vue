<template>
	<div class="section1">
		<div class="phone">
			<svg class="icon"><use xlink:href="#icon-iphone"></use></svg>
			<a class="text_above" style="text-align:left;">{{ phoneNum }}</a> 
		</div>
		<li class="flex">
			<div class="li-input flex-item"><input class="sms" type="text" placeholder="请输入短信验证码" v-model.number="sms_input"></div>
			<div class="li-num">获取验证码</div>
		</li>
		<div class="btn-box">
	    	<bl-button @click="confirm" class="btn-confirm" :disabled="!sms_input">验证</bl-button>
		</div>
	</div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'checkPhone',

  data () {
    return {
    	phoneNum: '',
    	sms_input: ''
    };
  },
  created () {
  	utils.isLogin().then(data => {
      let memberToken = data.member_token
      api.userCenter.getMyInformation({
        member_token: memberToken,
        timestamp: utils.getTimeFormatToday()
      }).then(data => {
        if (data.body.obj) {
          this.phoneNum = JSON.parse(data.body.obj).mobile
          this.$loading.close()
      }
    })
   })
  },
  methods: {
  	confirm() {
  		alert(this.sms_input)
  	}
  }
};
</script>

<style lang="scss" src="./css/payPw.scss" scoped>
</style>
