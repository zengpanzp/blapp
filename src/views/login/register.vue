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
                        <input v-model="imgCode" type="text" placeholder="请输入验证码" class="j-code">
                    </div>
                    <div class="joint-code joint-code2">
                        {{generateImg()}}
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
                    <input v-model="pass" type="password" placeholder="请输入您要设置的密码(8~20位数字字母组合)" class="j-code">
                    <div class="form-close"></div>
                  </div>
                </li>
            </ul>
            <div class="joint-login-checkbox">
                <label>
                    <input type="checkbox" checked=""> <span>同意百联会员注册协议</span></label>
            </div>
        </div>
    </div>
    <div class="submitBind">
      <input type="button" @click="register" class="joint-submit" value="立即注册">
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
        mobile: '', // 手机号
        imgCode: '', // 图片验证码
        smsCode: '', // 短信验证码
        pass: '',     // 密码
        codeDisabled: false,  // 能否点击发送验证码
        smsCodeText: "获取短信验证码"
      }
    },
    created() {
      this.$loading.close();
    },
    mounted() {
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
        return code;
      },
      // 立即注册
      register() {
        api.register({
          telNo: this.mobile,
          password: MD5(this.pass),
          smsCode: this.smsCode,
          store_id: "",
          buid: "",
          reg_type: "",
          picCode: this.imgCode
        }).then(data => {
            console.log(data)
        });
      },
      // 验证手机号
      valPhone(phone) {
        if (phone == "") {
          this.$toast({
            position: 'bottom',
            message: "手机号不能为空!"
          });
          return false;
        } else if (!/^1[34578]\d{9}$/.test(phone)) {
          this.$toast({
            position: 'bottom',
            message: "手机号码有误!"
          });
          return false;
        }
        return true;
      },
      // 获取短信验证码
      getSMSCode() {
        if (this.mobile && /^1[34578]\d{9}$/.test(this.mobile)) {
          api.sendSMSCode({
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
      },
    }
  };
</script>
