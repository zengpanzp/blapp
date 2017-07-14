<template>
<div class="enterPw">
	<div class="section1">
		<ul>
			<li><b class="iconfont lock"></b><input maxlength="8" type="password" placeholder="支付密码" v-model="currentPw"></li>
		</ul>
	</div>
	<div class="btn-box">
    	<bl-button @click="confirm" class="btn-confirm">确认提交</bl-button>
	</div>
</div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
import { MD5 } from 'src/md5'
export default {

  name: 'submitPw',

  data () {
    return {
    	// memberToken: '',
    	currentPw: '',
    	member_id: '',
      phoneNum: ''
    };
  },
  created () {
  	this.$loading.close()
  },
  methods: {
  	confirm() {
  		console.log(this.currentPw)
  		console.log(this.$route.query.pwd)
  		console.log(this.$route.query.member_id)
  		if (this.currentPw.length != 6) {
  			this.$toast({
  				message: "请输入6位数字支付密码",
  				position: "bottom"
  			})
  		} else {
  			let partn = /^\d{6}$/;
  			if (!partn.exec(this.currentPw)) {
  			    this.$toast({
  			    	message: "请输入6位数字支付密码",
  			    	position: "bottom"
  			    });
  			    return;
  			}
  			let samePsw = /^(\d)\1+$/;
  			if (samePsw.exec(this.currentPw)) {
  			    this.$toast({
  			    	message: "不允许输入6位相同数字或字符，请重新输入！",
  			    	position: "bottom"
  			    });
  			    return;
  			}
  			let incNum = "01234567890";
  			if (incNum.indexOf(this.currentPw) != -1) {
  			    this.$toast({
  			    	message: "不允许输入6位连续数字或字符，请重新输入！",
  			    	position: "bottom"
  			    });
  			    return;
  			}
  			let decNum = "09876543210";
  			if (decNum.indexOf(this.currentPw) != -1) {
  			    this.$toast({
  			    	message: "不允许输入6位连续数字或字符，请重新输入！",
  			    	position: "bottom"
  			    });
  			    return;
  			}
  			utils.isLogin().then(data => {
  			  let memberToken = data.member_token
          let member_id = data.member_id
  			  api.userCenter.getMyInformation({
  			    member_token: memberToken,
  			    timestamp: utils.getTimeFormatToday()
  			  }).then(data => {
  			    if (data.body.obj) {
  			    	this.phoneNum = JSON.parse(data.body.obj).mobile
		      		if (this.phoneNum.indexOf(this.currentPw) != -1) {
		      		    this.$toast({
		      		    	message: "不允许与手机号中6位数字相同，请重新输入！",
		      		    	position: "bottom"
		      		    });
		      		    return;
	  			    } else {
                if (this.$route.query.pwd) {
                  api.userCenter.revisePayPwd({
                    memberId: this.$route.query.member_id,
                    newPwd: MD5(this.currentPw),
                    pwd: this.$route.query.pwd
                  }).then(data => {
                    if (data.body.obj) {
                      this.$toast({
                        message: '设置成功',
                        position: 'bottom'
                      })
                      setTimeout(() => {
                        this.$router.push('./securityCenter')
                      }, 3000)
                    } else {
                      this.$toast({
                        message: 'data.body.msg',
                        position: 'bottom'
                      })
                    }
                  })
                } else {
                  // 忘记密码 验证pwd
                  console.log('###memberId:' + member_id + 'phoneNum' + this.phoneNum + 'pwd' + this.currentPw)
                  api.userCenter.setPayPwd({
                    memberId: member_id,
                    phoneNum: this.phoneNum,
                    pwd: MD5(this.currentPw)
                  }).then(data => {
                    if (data.body.obj) {
                      this.$toast({
                        message: '设置成功',
                        position: 'bottom'
                      })
                      setTimeout(() => {
                        this.$router.push('./securityCenter')
                      }, 3000)
                    } else {
                      this.$toast({
                        message: data.body.msg,
                        position: 'bottom'
                      })
                    }
                  })
                }
	  			    }
  				} else {
  					this.$toast({
              message: data.body.msg,
              position: 'bottom'
            })
  				}
  			    }).then(err => {
  			    console.log(err)
  			  })
  			})
  		}
	}
}
};
</script>

<style lang="scss" src="./css/enterPw.scss">
</style>
