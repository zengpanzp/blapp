<template>
<div class="enterPw">
	<div class="section1">
		<ul>
			<li><b class="iconfont lock clear"></b><input maxlength="8" type="password" placeholder="支付密码" v-model="currentPw"></li>
		</ul>
	</div>
	<div class="btn-box">
    	<bl-button @click="confirm" class="btn-confirm">确认提交</bl-button>
	</div>
</div>
</template>

<script>
import api from './api'
import { MD5 } from 'src/md5'
export default {

  name: 'submitPw',

  data () {
    return {
    	currentPw: '',
    	member_id: ''
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
  		api.userCenter.revisePayPwd({
  			memberId: this.$route.query.member_id,
  			newPwd: MD5(this.currentPw),
  			pwd: this.$route.query.pwd
  		}).then(data => {
  			this.$toast({
  				message: '设置成功',
  				position: 'bottom'
  			})
  			setTimeout(() => {
  				this.$router.push('/securityCenter')
  			}, 3000)
  		})
  	}
  }
};
</script>

<style lang="scss" src="./css/enterPw.scss" scoped>
</style>
