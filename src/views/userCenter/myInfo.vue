<template>
  <div class="wholepage">
   <div class="section1">
     <div class="list">
      <ul>
        <li>头像<b><img src="../..//assets/headPic.jpg" /><i class="head iconfont arrow-back"></i></b></li>
        <router-link to="/userCenter/myEmail"><li>昵称<div>{{ nickName }}<i class="iconfont arrow-back"></i></div></li></router-link>
        <li>性别<i class="iconfont arrow-back"></i></li>
        <li>出生日期<i>{{ bday }}</i></li>
        <li>我的车牌<i class="iconfont arrow-back"></i></li>
        <li>其他个人资料<i class="iconfont arrow-back"></i></li>
      </ul>
    </div>
   </div>
   <div class="section1">
     <div class="list">
      <ul>
        <li @click="address">地址管理<i class="iconfont arrow-back"></i></li>
        <router-link to="/userCenter/securityCenter"><li>安全中心<div><i class="iconfont arrow-back"></i><i>修改登录密码、支付密码等</i></div></li>
      </ul>
    </div>
   </div>
   <div class="section1">
     <div class="list">
      <ul>
        <li>清理缓存<i class="iconfont arrow-back"></i></li>
      </ul>
    </div>
   </div>
<!--    <div class="section1">
     <div class="list">
      <ul>
        <router-link to="/userCenter/enterPw"><li><i class="iconfont arrow-back"></i>登录密码<i>密码强度: {{ pwStatus }}</i></li></router-link>
        <div v-if="payStatus == '0'"><router-link to="/userCenter/payPw"><li><i class="iconfont arrow-back"></i>支付密码<i>{{ payStatus == 0 ? '已设置' : '绑定手机且实名认证后可设置' }}</i></li></router-link></div>
        <div v-if="payStatus != '0'"><router-link to="/userCenter/payPwAuth"><li><i class="iconfont arrow-back"></i>支付密码<i>{{ payStatus == 0 ? '已设置' : '绑定手机且实名认证后可设置' }}</i></li></router-link></div>
      </ul>
    </div>
   </div> -->
  <div class="btn-box">
    <bl-button @click="exit" class="btn-exit">退出当前帐号</bl-button>
  </div>
  </div>
  </div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'myInfo',

  data () {
    return {
    	bday: '',
    	nickName: ''
    };
  },
  created () {
  	utils.isLogin().then(data => {
  	  let memberToken = data.member_token
  	  // let member_id = data.member_id
  	  api.userCenter.getMyInformation({
  	    member_token: memberToken,
  	    timestamp: utils.getTimeFormatToday()
  	  }).then(data => {
  	    if (data.body.obj) {
  	    	this.nickName = JSON.parse(data.body.obj).nickName
  	    	let y = JSON.parse(data.body.obj).birthYear
  	    	let m = JSON.parse(data.body.obj).birthMonth
  	    	let d = JSON.parse(data.body.obj).birthDay
  	    	this.bday = y + '-' + m + '-' + d
  	    	// 性别
  	    	// api.
  	    } else {
  	    	this.$toast({
  	    	  message: data.body.msg,
  	    	  position: "bottom"
  	    	})
  	    }
  	  }).then(err => {
  	  	console.log(err)
  	  })
  	})
  },
  methods: {
    exit() {
      window.CTJSBridge.LoadMethod('AlertController', 'showAlert', {
        title: "提示",
        message: "确认要退出？",
        buttons: [
        {
          title: "取消"
        }, {
          title: "确定",
          style: "highlighted"
        }]
      }, { success: data => {
        console.log("####success#####" + data)
        let bd = JSON.parse(data)
        let button = bd.buttonTitle
        console.log(button)
        if (button == "确定") {
            window.CTJSBridge.LoadAPI('BLLogoutAPIManager', {}, {
              success: result => {
                console.log(result)
                this.$toast('退出成功!')
                setTimeout(function () {
                window.CTJSBridge.LoadMethod('BLPageManager', 'pagemanagerNavigateToHome', {pageId: ''})
                }, 2500)
              },
              fail: result => {
                console.log(result)
              },
              progress: result => {
                console.log(result)
              }
            });
          } else if (button == "取消") {
            // this.$toast('取消')
          }
        }
      })
    },
    authen() {
		// native 实名认证页
		window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
		  pageId: 'authenticate'
		})
    },
    address () {
    	// native 管理收货地址
    	window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
    	  pageId: 'userAddress'
    	})
    }
  }
};
</script>

<style lang="scss" src="./css/securityCenter.scss" scoped></style>
</style>
