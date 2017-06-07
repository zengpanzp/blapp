<template>
	<div class="section1">
		<p class="text_above" style="text-align:left;">请输入原支付密码(6位数字)，验证身份</p>
		<li><b class="iconfont lock clear"></b><input type="password" placeholder="支付密码" v-model="pw_input"></li>
		<li>{{ pw_input }}</li>
		<router-link to="/securityCenter/checkPhone"><p class="forget-password">忘记密码>&nbsp;&nbsp;</p>
	</div>
</template>

<script>
export default {

  name: 'checkPhone',

  data () {
    return {

    };
  },
  created () {
  	this.$loading.close()
  }
};
</script>

<style lang="scss" src="./css/payPw.scss" scoped>
</style>
