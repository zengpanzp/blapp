<template>
<div class="enterPw">
	<div class="section1 middle">
		<p>您的账户暂未实名认证，请进行认证后再设置支付密码</p>
	</div>
	<div class="btn-box">
    	<bl-button @click="authen" class="btn-confirm">进行实名认证</bl-button>
	</div>
	<div class="middle">
		<p>要设置密码需"绑定手机"并且完成"实名认证</p>
	</div>
</div>
</template>

<script>
export default {

  name: 'payPwAuth',

  data () {
    return {

    };
  },
  created () {
  	this.$loading.close()
  },
  methods: {
  	authen() {
  	  // native 实名认证页
  	  window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
  	    pageId: 'authenticate'
  	  })
  	}
  }
};
</script>

<style lang="scss" src="./css/enterPw.scss" scoped>
</style>
