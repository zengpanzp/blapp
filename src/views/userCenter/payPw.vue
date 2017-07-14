<template>
	<div class="section1">
  <form v-on:submit.prevent="testPass">
    <p>
  		<p class="text_above" style="text-align:left;">请输入原支付密码(6位数字)，验证身份</p>
  		<li>
        <b class="iconfont lock clear"></b>
        <input maxlength="6" type="password" placeholder="支付密码" v-model="pw_input">
      </li>
  		<router-link to="/userCenter/checkPhone"><p class="forget-password">忘记密码>&nbsp;&nbsp;</p></router-link>
    </p>
    </form>
	</div>
</template>

<script>
import { MD5 } from 'src/md5'
import api from './api'
import utils from 'src/utils'
export default {

  name: 'payPw',

  data () {
    return {
    	pw_input: '',
      member_id: ''
    };
  },
  created () {
  	this.$loading.close()
  },
  methods: {
    btn_click() {
      setTimeout(() => {
      window.CTJSBridge.LoadMethod('BLPageManager', 'pagemanagerNavigateToHome', {pageId: ''})
      }, 2500)
    },
    testPass() {
      if (this.pw_input.length != 6) {
        this.$toast("请输入6位数字支付密码")
      } else {
        let partn = /^\d{6}$/;
        if (!partn.exec(this.pw_input)) {
          this.$toast("请输入6位数字支付密码");
        } else {
          // let md5_pw = MD5(this.pw_input)
          utils.isLogin().then(data => {
            let member_id = data.member_id
            console.log("#######input: " + this.pw_input)
            console.log("#######member_id " + member_id)
            api.userCenter.validPayPwd({
              memberId: member_id,
              pwd: MD5(this.pw_input)
            }).then(data => {
              console.log(data)
              if (data.body.obj) {
                // console.log("#######MD5: " + MD5(this.pw_input))
                this.$toast({
                  message: "验证成功",
                  position: "bottom"
                })
                console.log("member_id" + member_id)
                setTimeout(() => {
                  this.$router.push({
                    path: 'submitPw',
                    query: {
                      pwd: MD5(this.pw_input),
                      member_id: member_id
                    }
                  })
                }, 2500)
              } else {
                this.$toast({
                  message: data.body.msg,
                  position: "bottom"
                })
              }
            })
          })
        }
      }
    }
  }
  // watch: {
  //   pw_input(val) {
  //     if (val.length == 6) {
  //       let md5_pw = MD5(val)
  //       // console.log("input#####" + val)
  //       console.log("MD5#######" + md5_pw)
  //     }
  //   }
  // }
};
</script>

<style lang="scss" src="./css/payPw.scss">
</style>
