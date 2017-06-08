<template>
	<div class="section1">
  <form v-on:submit.prevent="testPass">
		<p class="text_above" style="text-align:left;">请输入原支付密码(6位数字)，验证身份</p>
		<li>
      <b class="iconfont lock clear"></b>
      <input maxlength="6" type="password" placeholder="支付密码" v-model="pw_input">
    </li>
		<router-link to="/securityCenter/checkPhone"><p class="forget-password">忘记密码>&nbsp;&nbsp;
    </p>
    </form>
	</div>
</template>

<script>
import { MD5 } from 'src/md5'
export default {

  name: 'payPw',

  data () {
    return {
    	pw_input: ''
    };
  },
  created () {
  	this.$loading.close()
  },
  methods: {
    btn_click() {
      setTimeout(function () {
      window.CTJSBridge.LoadMethod('BLPageManager', 'pagemanagerNavigateToHome', {pageId: ''})
      }, 2500)
    },
    testPass() {
      if (this.pw_input.length < 6) {
        alert(12312)
      }
    }
  },
  watch: {
    pw_input(val) {
      if (val.length == 6) {
        let md5_pw = MD5(val)
        // console.log("input#####" + val)
        console.log("MD5#######" + md5_pw)
      }
    }
  }
};
</script>

<style lang="scss" src="./css/payPw.scss" scoped>
</style>	
