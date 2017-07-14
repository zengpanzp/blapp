<template>
<div class="myEmail">
	<div class="section1">
		<ul>
			<li class="cell-top">当前昵称: {{ nickName ? nickName : '暂无昵称' }}</li>
			<li class="cell-bottom"><input type="text" id="change-email" placeholder="修改昵称" v-model="nickname_input"><a class="iconfont close clear" @click="clear_input" v-show="nickname_input"></a></li>
		</ul>
	</div>
	<div class="btn-box">
    	<bl-button @click="confirm" class="btn-confirm" :disabled="!nickname_input">确认提交</bl-button>
	</div>
</div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'myEmail',

  data () {
    return {
      memberToken: '',
      nickName: '',
      nickname_input: ''
    };
  },
  created () {
  	utils.isLogin().then(data => {
      this.memberToken = data.member_token
      let memberToken = data.member_token
      api.userCenter.getMyInformation({
        member_token: memberToken
      }).then(data => {
        if (this.$route.query.nickName) {
          this.nickName = this.$route.query.nickName
        }
        this.$loading.close()
        }).then(err => {
        console.log(err)
      })
    })
  },
  methods: {
  	confirm() {
      api.userCenter.update({
        member_token: this.memberToken,
        nickName: this.nickname_input,
        timestamp: utils.getTimeFormatToday(),
        sysid: '1103'
      }).then(data => {
        console.log(data)
        if (data.body.obj) {
          this.$toast({
            message: '我的昵称修改成功!',
            position: "bottom"
          })
          setTimeout(() => {
            window.history.go(-1)
          }, 2000)
        } else {
          this.$toast({
            message: data.body.msg,
            position: "bottom"
          })
        }
      })
  	},
    clear_input() {
      this.nickname_input = ''
    }
  }
};
</script>

<style lang="scss" src="./css/myEmail.scss">
</style>
