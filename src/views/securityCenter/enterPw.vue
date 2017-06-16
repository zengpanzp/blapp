<template>
<div class="enterPw">
	<div class="section1">
		<ul>
			<li><b class="iconfont lock clear"></b><input type="text" placeholder="当前密码" v-model="currentPw"></li>
			<li><b class="iconfont lock clear"></b><input type="text" placeholder="新密码(8-20位字符，至少包含数字和字母)"></li>
			<li><b class="iconfont lock clear"></b><input type="text" placeholder="确认新密码(8-20位字符，至少包含数字和字母)"></li>
			<li>{{ currentPw }}</li>
		</ul>
	</div>
	<div class="btn-box">
    	<bl-button @click="confirm" class="btn-confirm" :disabled="!email_input">确认提交</bl-button>
	</div>
</div>
</template>

<script>
export default {

  name: 'enterPw',

  data () {
    return {
    	currentPw: ''
    };
  },
  created () {
  	this.$loading.close()
  },
  methods: {
  	confirm() {
  		alert(this.currentPw)
  	}
  }
};
</script>

<style lang="scss" src="./css/enterPw.scss"scoped>
</style>
