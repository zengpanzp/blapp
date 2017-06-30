<template>
  <div class="wholepage">
   <div class="section1">
     <div class="list">
      <ul>
        <li class="first">绑定手机 <i>{{ phoneNum }}</i></li>
        <router-link to="/userCenter/myEmail"><li>修改邮箱<div><i class="iconfont arrow-back"></i><i>{{ email ? email : '暂无绑定' }}</i></div></li></router-link>
        <li @click="authen">实名认证<div><i class="iconfont arrow-back"></i><i>{{ realNameAuthType >= 2 ? '认证信息已提交' : '未认证' }}</i></div></li>
      </ul>
    </div>
   </div>
   <div class="section1">
     <div class="list">
      <ul>
        <router-link to="/userCenter/enterPw"><li class="first">登录密码<div><i class="iconfont arrow-back"></i><i>密码强度: {{ pwStatus }}</i></div></li></router-link>
        <div v-if="payStatus == '0'"><router-link to="/userCenter/payPw"><li>支付密码<div><i class="iconfont arrow-back"></i><i>{{ payStatus == 0 ? '已设置' : '绑定手机且实名认证后可设置' }}</i></div></li></router-link></div>
        <div v-if="payStatus != '0'"><router-link to="/userCenter/payPwAuth"><li>支付密码<div><i class="iconfont arrow-back"></i><i>{{ payStatus == 0 ? '已设置' : '绑定手机且实名认证后可设置' }}</i></div></li></router-link></div>
      </ul>
    </div>
   </div>
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

  name: 'securityCenter',

  data () {
    return {
      memberToken: '',
      phoneNum: '',
      email: '',
      realNameAuthType: '',
      pwStatus: '',
      payStatus: ''
    };
  },
  created() {
    try {
      // console.log((new Date()).toLocaleString() + deployName)
      sa.track('$pageview', {
        pageId: 'APP_安全中心',
        categoryId: 'APP_User',
        $title: 'APP_安全中心'
      })
    } catch (err) {
      console.log("sa error => " + err);
    }
    utils.isLogin().then(data => {
      let memberToken = data.member_token
      let member_id = data.member_id
      api.userCenter.getMyInformation({
        member_token: memberToken,
        timestamp: utils.getTimeFormatToday()
      }).then(data => {
        if (data.body.obj) {
          let phoneNum = JSON.parse(data.body.obj).mobile
          if (phoneNum) {
            this.phoneNum += phoneNum.substring(0, 3)
            for (let i = 0; i < 4; i++) {
              this.phoneNum += '*'
            }
            this.phoneNum += phoneNum.substring(phoneNum.length - 4, phoneNum.length)
          }
          let email = JSON.parse(data.body.obj).email
          if (email) {
            this.email += email.substring(0, 3);
            var before = email.split('@')[0];
            var after = email.split('@')[1];
            if (before.length > 3) {
                for (let i = 3; i < before.length; i++) {
                    this.email += '*';
                }
            }
            this.email += '@';
            for (let i = 0; i < after.length - 4; i++) {
                this.email += '*';
            }
            this.email += email.substring(email.length - 4, email.length);
          }
          let pwdStrength = JSON.parse(data.body.obj).pwdStrength
          if (pwdStrength == 1) {
            this.pwStatus = '弱'
          }
          if (pwdStrength == 2) {
            this.pwStatus = '中'
          } else if (pwdStrength == 3) {
            this.pwStatus = '强'
          }
        } else {
          console.log(data.body.msg)
        }
        }).then(err => {
        console.log(err)
      })
      api.userCenter.queryMemberRNAuthDetail({
        memberId: member_id,
        timestamp: utils.getTimeFormatToday()
      }).then(data => {
        if (data.body.obj) {
          this.realNameAuthType = JSON.parse(data.body.obj).realNameAuthType
        } else {
          console.log(data.body.msg)
        }
      })
      api.userCenter.validPayPwd({
        memberId: member_id
      }).then(data => {
        if (data.body.obj) {
          this.payStatus = JSON.parse(data.body.obj).status
          console.log('###payStatus:####' + this.payStatus)
        } else {
          this.$toast({
            message: data.body.msg,
            position: "bottom"
          })
        }
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
    }
  }
};
</script>

<style lang="scss" src="./css/securityCenter.scss" scoped></style>
