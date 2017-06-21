<template>
<div class="enterPw">
	<div class="section1">
		<ul>
			<li><b class="iconfont lock"></b><input type="password" placeholder="当前密码" v-model="currentPw"><a class="iconfont close clear" @click="clear_currentPw"></li>
			<li><b class="iconfont lock"></b><input maxlength="20" type="password" v-model="newPw" placeholder="新密码(8-20位字符，至少包含数字和字母)"><a class="iconfont close clear" @click="clear_newPw"></a></li>
      <li class="levels" v-if="newPw"><span><b class="disabled" :class="{ 'low': pwdStrength == 1 }">弱</b><b class="disabled" :class="{ 'med': pwdStrength == 2 }">中</b><b class="disabled" :class="{ 'str': pwdStrength == 3 }">强</b></span></li>
			<li><b class="iconfont lock"></b><input maxlength="20" type="password" v-model="newPwAgain" placeholder="确认新密码(8-20位字符，至少包含数字和字母)"><a class="iconfont close clear" @click="clear_newPwAgain"></a></li>
		</ul>
	</div>
	<div class="btn-box">
    	<bl-button @click="confirm" class="btn-confirm" :disabled="!(currentPw && newPw && newPwAgain)">确认提交</bl-button>
	</div>
</div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'enterPw',

  data () {
    return {
    	currentPw: '',
      newPw: '',
      newPwAgain: '',
      pwdStrength: ''
    };
  },
  created () {
  	this.$loading.close()
  },
  methods: {
  	confirm () {
      // 验证新密码
      let pattern = /[^\x00-\xff]/ig
      if (pattern.test(this.newPw)) {
        this.$toast({
          position: 'bottom',
          message: '密码不能输入全角字符'
        })
      }
      if (this.newPw.length < 8 || this.newPw.length > 20) {
        this.$toast({
          position: 'bottom',
          message: '登录密码必须是8-20个字符'
        })
      }
      if (!/^(((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^\s0-9a-zA-Z])|(?=.*[a-zA-Z])(?=.*[^\s0-9a-zA-Z]))[^\s]+)$/.test(this.newPw)) {
        this.$toast({
          position: 'bottom',
          message: '必须是字母、数字和符号两种及以上的组合'
        })
      } else {
        // 新密码 验证通过
        if (this.newPw != this.newPwAgain) {
          this.$toast({
            position: 'bottom',
            message: '输入的新密码不一致,请重新输入！'
          })
        }
        if (this.newPw == this.currentPw) {
          this.$toast({
            position: 'bottom',
            message: '输入的新密码和旧密码不能一致,请重新输入！'
          })
        } else {
          // test password strength
          // // debugger
          // let strongRegex = /^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{9,20}$/
          // let mediumRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){9,}$/
          // if (strongRegex.exec(this.newPw) && mediumRegex.exec(this.newPw)) {
          //   this.pwdStrength = '3'
          // } else if (mediumRegex.exec(this.newPw)) {
          //   this.pwdStrength = '2'
          // } else {
          //   this.pwdStrength = '1'
          // }
          utils.isLogin().then(data => {
            let memberToken = data.member_token
            api.userCenter.modifyPassword({
              member_token: memberToken,
              password: this.currentPw,
              newPass: this.newPw,
              pwdStrength: this.pwdStrength,
              timestamp: utils.getTimeFormatToday(),
              sysid: '1103'
            }).then(data => {
              if (data.body.obj) {
                  window.CTJSBridge.LoadAPI('BLLogoutAPIManager', {}, {
                    success: result => {
                      console.log(result)
                      // this.$toast('退出成功!')
                      setTimeout(function () {
                       window.CTJSBridge.LoadMethod('BLLogin', 'PresentLoginViewController')
                      }, 2500)
                    },
                    fail: result => {
                      console.log(result)
                    },
                    progress: result => {
                      console.log(result)
                    }
                  });
                } else {
                this.$toast(data.body.msg)
              }
            })
          })
        }
        console.log('###currentPw:' + this.currentPw + '   ###newPw:' + this.newPw + '   ###newPwAgain:' + this.newPwAgain + '###pwdStrength: ' + this.pwdStrength)
      }
  	},
    clear_currentPw () {
      this.currentPw = ''
    },
    clear_newPw () {
      this.newPw = ''
    },
    clear_newPwAgain() {
      this.newPwAgain = ''
    }
  },
  watch: {
    'newPw'(val) {
      console.log(val)
      let strongRegex = /^(?![a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{9,20}$/
      let mediumRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-zA-Z]|[0-9]){9,}$/
      if (strongRegex.exec(val) && mediumRegex.exec(val)) {
        this.pwdStrength = '3'
      } else if (mediumRegex.exec(val)) {
        this.pwdStrength = '2'
      } else {
        this.pwdStrength = '1'
      }
    }
  }
};
</script>

<style lang="scss" src="./css/enterPw.scss"scoped>
</style>
