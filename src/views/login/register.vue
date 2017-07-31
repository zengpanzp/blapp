<style lang="scss" src="./css/_login.scss" scoped></style>
<template>
<div class="register">
    <!-- header start -->
    <header class="bar bar-header bar-light">
        <div class="bar-left">
            <a href="javascript:" class="button">
                <div class="iconfont icon-modal-close"></div>
            </a>
        </div>
        <div class="title">
          <img src="./i/bl3.png" alt=""> 账号注册
        </div>
    </header>
    <!-- header end -->
    <!-- content start -->
    <div class="content">
        <div class="joint-wrap joint-wrap">
            <!--<div class="joint-img"><img src="./i/bl3.png" alt=""></div>-->
            <!--<div class="joint-account">填写百联通账户信息并授权登录</div>-->
            <ul style="margin: 0">
                <li>
                    <div class="joint-input j-input">
                        <input v-model="mobile" type="tel" maxlength="11" placeholder="请输入手机号码" class="j-login">
                    </div>
                </li>
                <li>
                    <div class="joint-input j-input">
                        <input v-model="imgCodeInput" type="text" placeholder="请输入验证码" class="j-code">
                    </div>
                    <div @click="generateImg" class="joint-code joint-code2">
                        {{imgCode}}
                    </div>
                </li>
                <li>
                  <div class="joint-input j-input">
                    <input v-model="smsCode" type="text" placeholder="请输入短信验证码" class="j-code">
                    <button class="getSMSCode" :disabled="codeDisabled" @click="getSMSCode">{{smsCodeText}}</button>
                  </div>
                </li>
                <li>
                  <div class="joint-input j-input">
                    <input v-model="pass" type="password" placeholder="请输入密码(8~20位数字字母组合)" class="j-code">
                    <div class="form-close"></div>
                  </div>
                </li>
            </ul>
            <div class="joint-login-checkbox">
                <label>
                    <input type="checkbox" v-model="hasChecked"> <span>同意百联会员注册协议</span></label>
            </div>
        </div>
    </div>
    <div class="submitBind">
      <input type="button" @click.stop="register" class="joint-submit" value="立即注册">
    </div>
    <a class="hasAccount" href="/#/login">已有百联通账户？直接登录</a>
    <!-- content end -->
</div>
</template>
<script>
    import api from './api/index'
  //  import utils from 'src/utils'
    import {MD5} from 'src/md5';
  export default {
    name: 'register',
    data() {
      return {
        hasChecked: true,
        mobile: '', // 手机号
        imgCodeInput: '', // 图片验证码
        imgCode: '', // 图片验证码
        smsCode: '', // 短信验证码
        pass: '',     // 密码
        codeDisabled: false,  // 能否点击发送验证码
        smsCodeText: "获取短信验证码"
      }
    },
    created() {
      this.backUrl = this.$route.query.backUrl;
      this.$loading.close();
      this.generateImg();
    },
    mounted() {
      this.$loading.close();
    },
    methods: {
      generateImg() {
        // 验证码组成库
        var arrays = [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
          'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
          'u', 'v', 'w', 'x', 'y', 'z',
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
          'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
          'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        // 重新初始化验证码
        let code = '';
        // 随机从数组中获取四个元素组成验证码
        for (let i = 0; i < 4; i++) {
          // 随机获取一个数组的下标
          let r = parseInt(Math.random() * arrays.length);
          code += arrays[r];
        }
        this.imgCode = code;
      },
      // 立即注册
      register() {
        if (this.validate()) {
          // 验证手机号唯一性
          api.validatePhone({
            loginId: this.mobile
          }).then(data => {
            let json = JSON.parse(data.body.obj);
            if (json.resCode == "05111008") {
              this.$toast({
                position: 'bottom',
                message: "手机号已经被注册!"
              });
            } else {
              api.register({
                appName: "h5",
                appVersion:	"",
                channelId: "1",
                email: "",
                loginId: this.mobile,
                mobile: this.mobile,
                mobileType: "",
                password:	MD5(this.pass),
                pwdStrength: "2",
                requestId: "",
                smsCode: this.smsCode,
                snNo: "",
                sysid: "1103"
              }).then(data => {
                let json = JSON.parse(data.body.obj);
                if (json.resCode == "00100000") { // 注册成功
                  this.$router.push({path: 'login'})
                } else {
                    this.alertTip(json.msg)
                }
              });
            }
          });
        }
      },
      alertTip(msg) {
        this.$toast({
          position: 'bottom',
          message: msg
        });
      },
      // 验证填写的基本信息
      validate() {
        let msg = "";
        if (this.valPhone(this.mobile)) {
          if (this.imgCodeInput == "") {
              msg = "验证码不能为空!";
              this.alertTip(msg);
              return false;
          }
          if (this.imgCode.toLowerCase() != this.imgCodeInput.trim().toLowerCase()) {
            msg = "验证码输入不正确!";
            this.alertTip(msg);
            return false;
          }
          if (this.smsCode == "") {
            msg = "短信验证码不能为空!";
            this.alertTip(msg);
            return false;
          }
          if (this.pass == "") {
            msg = "密码不能为空!";
            this.alertTip(msg);
            return false;
          }
          if (this.pass.length < 8) {
            msg = "密码长度不能少于8位!";
            this.alertTip(msg);
            return false;
          }
          if (!this.hasChecked) {
            msg = "注册百联通账号需同意注册协议!";
            this.alertTip(msg);
            return false;
          }
        } else {
            return false;
        }
        return true;
      },
      // 验证手机号
      valPhone(phone) {
        if (phone == "") {
          this.alertTip("手机号码不能为空!");
          console.log("====false")
          return false;
        }
        if (phone && !/^1[34578]\d{9}$/.test(phone)) {
          this.alertTip("手机号码有误!");
          return false;
        }
        return true;
      },
      // 获取短信验证码
      getSMSCode() {
        if (this.mobile && /^1[34578]\d{9}$/.test(this.mobile)) {
          api.sendSMSCodeByRegister({
            mobile: this.mobile
          }).then(data => {
            let json = JSON.parse(data.body.obj);
            console.log(json)
            let that = this;
            if (json.resCode == "00100000") {
              let times = 60;
              this.timeId = setInterval(function() {
                if (times > 0) {
                  that.codeDisabled = true;
                  that.smsCodeText = "重新获取(" + (times--) + "s)";
                } else {
                  that.codeDisabled = false;
                  that.smsCodeText = "获取短信验证码";
                  clearInterval(that.timeId)
                }
              }, 1000);
            }
          });
        } else {
          this.valPhone(this.mobile);
        }
      }
    }
  };
</script>
