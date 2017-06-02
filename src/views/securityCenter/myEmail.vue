<template>
<div class="myEmail">
	<div class="section1">
		<ul>
			<li class="cell-top">当前邮箱: {{ email ? '邮箱已经绑定好啦' : '暂无绑定' }}</li>
			<li class="cell-bottom"><input type="text" id="change-email" placeholder="修改邮箱" v-model="email"><a class="clear" v-show="!email">X</a></li>
		</ul>
	</div>
	<div class="btn-box">
    	<bl-button @click="confirm" class="btn-confirm" :disabled="!email">确认提交</bl-button>
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
    	email: ''
    };
  },
  created () {
  	utils.isLogin().then(data => {
      let memberToken = data.member_token
      api.userCenter.getMyInformation({
        member_token: memberToken
      }).then(data => {
        console.log(JSON.parse(data.body.obj))
        this.email = JSON.parse(data.body.obj).email
        this.$loading.close()
        }).then(err => {
        console.log(err)
      })
    })
  },
  methods: {
  	confirm() {
  		alert(Date.parse(new Date()))
  		this.$modal({
  			title: '提示',
  			content: '新邮箱输入格式错误，请重新输入!'
  		})
  	}
  }
};
</script>

<style lang="scss" src="./css/myEmail.scss" scoped>
</style>
