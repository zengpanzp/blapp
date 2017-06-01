<template>
<div class="myEmail">
	<div class="section1">
		<ul>
			<li class="cell-top">当前邮箱:<i>abc@ababab.com</i></li>
			<li class="cell-bottom"><input type="text" id="change-email" placeholder="修改邮箱" v-model="email"><a class="clear" v-show="email.length">X</a></li>
		</ul>
	</div>
	<div class="btn-box">
    	<bl-button @click="confirm" class="btn-confirm" :disabled="email.length===0">确认提交</bl-button>
	</div>
</div>
</template>

<script>
export default {

  name: 'myEmail',

  data () {
    return {
    	email: ''
    };
  },
  created () {
  	this.$loading.close()
  },
  methods: {
  	confirm() {
  		alert(this.email)
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
