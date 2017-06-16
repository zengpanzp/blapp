<template>
	<div class="section1">
		<div class="phone">
			<svg class="icon"><use xlink:href="#icon-iphone"></use></svg>
			<a class="text_above" style="text-align:left;">{{ phoneNum }}</a> 
		</div>
		<li class="flex">
			<div class="li-input flex-item"><input class="sms" type="text" placeholder="请输入短信验证码" v-model.number="sms_input"></div>
      <!-- <div class="li-num" @click="sms">{{ sms_click == 1 ? '重新发送' + time + 's' : '获取验证码'}}</div> -->
			<div class="li-num" :class="{ disabled: checkNumText.indexOf('秒后重发') !== -1 }" @click="sms">{{ checkNumText }}</div>
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
    	sms_input: '',
      sms_click: '',
      checkNumText: '获取验证码',
      time: 60,
      member_id: ''
    };
  },
  created () {
  	utils.isLogin().then(data => {
      let memberToken = data.member_token
      this.member_id = data.member_id
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
  		console.log(this.sms_input)
      api.userCenter.validCodePayPwd({
        phoneNum: this.phoneNum,
        code: this.sms_input,
        memberId: this.member_id,
        type: '3'
      }).then(data => {
        if (data.body.obj) {
          let resData = JSON.parse(data.body.obj).result_msg
          this.$toast({
            message: resData,
            position: 'bottom'
          })
          setTimeout(() => {
            this.$router.push('/securityCenter/submitPw')
          }, 2000)
        } else {
          this.$toast({
            message: data.body.msg,
            position: 'bottom'
          })
        }
      })
  	},
    loopTime() {
      setTimeout(() => {
        this.time --
        this.checkNumText = this.time + '秒后重发'
        if (this.time <= 0) {
          this.checkNumText = '重新发送'
          this.time = 60
        } else {
          this.loopTime()
        }
      }, 1000)
    },
    sms() {
      // this.sms_click = '1'
      this.checkNumText = this.time + '秒后重发'
      this.loopTime()
      console.log('#####this.sms_click: ' + this.sms_click)
      api.userCenter.sendCodePayPwd({
        phoneNum: this.phoneNum,
        type: '3'
      }).then(data => {
        if (data.body.obj) {
          let resData = JSON.parse(data.body.obj).result_msg
          console.log('sendCodePayPwd' + resData)
        } else {
          this.$toast({
            message: data.body.msg,
            position: 'bottom'
          })
        }
        console.log(data)
      })
      window.CTJSBridge.LoadMethod('AlertController', 'showAlert', {
        title: "提示",
        message: "手机验证码获取成功,请稍候60秒!",
        buttons: [
        {
          title: "确定",
          style: "highlighted"
        }]
      }, { success: data => {
        console.log('confirmed!')
        // api.userCenter.sendCodePayPwd({
        //   phoneNum: this.phoneNum,
        //   type: '3'
        // }).then(data => {
        //   if (data.body.obj) {
        //     let resData = JSON.parse(data.body.obj).result_msg
        //     console.log(resData)
        //     this.$toast({
        //       message: resData,
        //       position: 'bottom'
        //     })
        //   } else {
        //     this.$toast({
        //       message: data.body.msg,
        //       position: 'bottom'
        //     })
        //   }
        //   console.log(data)
        // })
        }
      })
    }
  }
};
</script>

<style lang="scss" src="./css/payPw.scss" scoped>
</style>
