<template>
<div class="myEmail">
	<div class="section1">
		<ul>
			<li class="cell-top">当前邮箱: {{ email ? email : '暂无绑定' }}</li>
			<li class="cell-bottom"><input type="text" id="change-email" placeholder="修改邮箱" v-model="email_input"><a class="iconfont close clear" @click="clear_input" v-show="email_input"></a></li>
		</ul>
	</div>
	<div class="btn-box">
    	<bl-button @click="confirm" class="btn-confirm" :disabled="!email_input">确认提交</bl-button>
	</div>
</div>
</template>

<script>
import api from 'src/api'
import utils from 'src/utils'
export default {

  name: 'myEmail',

  data () {
    return {
      memberToken: '',
    	email: '',
      email_input: ''
    };
  },
  created () {
  	utils.isLogin().then(data => {
      this.memberToken = data.member_token
      let memberToken = data.member_token
      api.userCenter.getMyInformation({
        member_token: memberToken
      }).then(data => {
        let email = JSON.parse(data.body.obj).email
        if (email) {
          this.email += email.substring(0, 3);
          var before = email.split('@')[0];
          var after = email.split('@')[1];
          if (before.length > 3) {
              for (let i = 3; i < before.length; i++) {
                  this.email += '*';
              }
          }
          this.email += '@';
          for (let i = 0; i < after.length - 4; i++) {
              this.email += '*';
          }
          this.email += email.substring(email.length - 4, email.length);
        }
        this.$loading.close()
        }).then(err => {
        console.log(err)
      })
    })
  },
  methods: {
  	confirm() {
      alert(this.email_input)
      let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!myreg.test(this.email_input)) {
       this.$modal({
        title: '提示',
        content: '新邮箱输入格式错误，请重新输入!'
       })
      } else {
        api.userCenter.modifyEmail({
          member_token: this.memberToken,
          email: this.email_input
        }).then(data => {
          var current = this;
          console.log(data)
          this.$toast({
            position: 'bottom',
            message: '我的邮箱修改成功'
          })
          setTimeout(function () {
          current.$router.go(-1)
        }, 1500)
        })
      }
  	},
    clear_input() {
      this.email_input = ''
    }
  }
};
</script>

<style lang="scss" src="./css/myEmail.scss" scoped>
</style>
