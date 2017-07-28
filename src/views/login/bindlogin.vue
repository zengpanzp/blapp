<style lang="scss" src="./css/_login.scss" scoped></style>
<template>
<div class="register" v-show="!hasBind">
    <!-- header start -->
    <header class="bar bar-header bar-light">
      <div class="bar-left">
        <a href="javascript:" class="button">
          <div class="iconfont icon-modal-close"></div>
        </a>
      </div>
      <div class="title">
        <img src="./i/bl3.png" alt=""> 联合登录
      </div>
    </header>
    <!-- header end -->
    <!-- content start -->
    <div class="content">
        <div class="joint-wrap content">
            <div class="joint-account">填写百联通账户信息并授权登录</div>
            <ul>
                <li>
                    <div class="joint-input j-input">
                        <input type="tel" v-model="mobile" maxlength="11" placeholder="请输入手机号码" class="j-login">
                    </div>
                </li>
                <li>
                    <div class="joint-input j-input">
                        <input v-model="smsCode" type="text" placeholder="请输入短信验证码" class="j-code">
                       <button class="getSMSCode" @click="getSMSCode" :disabled="codeDisabled">{{smsCodeText}}</button>
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
            </ul>
        </div>
    </div>
    <div class="submitBind">
      <input @click="bindAccount" type="button" class="joint-submit" value="授权绑定">
    </div>
</div>
</template>
<script>
    import api from './api/index'
  //  import utils from 'src/utils'
  export default {
    name: 'bindLogin',
    data() {
      return {
        hasBind: true,  // 假设已经绑定
        imgCodeInput: "",
        imgCode: '', // 图片验证码
        smsCode: "", // 短信验证码
        mobile: "",
        codeDisabled: false,  // 能否点击发送验证码
        smsCodeText: "获取短信验证码"
      }
    },
    created() {
      this.$loading.close();
      this.generateImg();
      let param = this.$route.query.param;
      // 验证安付宝是否存在
      api.validateOKPayExit({
        param: param
      }).then(data => {
        if (data.body.resCode == "00100000") {
          let json = JSON.parse(data.body.obj);
          this.hasBind = (json.hasBind === "1");
          this.obj = json;
        }
        console.log(data)
      });
    },
    mounted() {
    },
    methods: {
      bindAccount() { // 进行授权绑定
        if (this.validate()) { // 验证成功
          // 验证手机号唯一性
          api.validatePhone({
            loginId: this.mobile
          }).then(data => {
            let json = JSON.parse(data.body.obj);
            if (json.resCode == "05111008") { // 已经存在可以进行绑定
              // 进行绑定
              api.bindOKPay({
                sysid: "1103",
                channelId: "1",
                loginId: this.mobile,
                loginType: "code",
                mobile: this.mobile,
                requestId: this.obj.requestId,
                smsCode: this.smsCode,
                third_party_id: this.obj.thirdPartyId,
                third_party_id_type: "2",
                third_party_mobile: this.obj.thirdPartyMobile
              }).then(data => {
                console.log(data)
              });
            } else {
              this.alertTip("手机号已经被注册!")
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
          if (this.smsCode == "") {
            msg = "短信验证码不能为空!";
            this.alertTip(msg);
            return false;
          }
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
