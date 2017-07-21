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
        <img src="./i/bl3.png" alt=""> 重置密码
      </div>
    </header>
    <!-- header end -->
    <!-- 第一步骤 -->
    <div class="findpass">
      <bl-tab-container :swipeable="false" v-model="tabsModel">
        <bl-tab-container-item :id="1">
          <!--先输入手机号-->
          <div class="joint-wrap content">
            <ul>
              <li>
                <div class="joint-input j-input">
                  <input v-model="mobile"  type="tel" maxlength="11" placeholder="请输入手机号码" class="j-login">
                </div>
              </li>
              <li>
                <div class="joint-input j-input">
                  <input  v-model="imgCodeInput" type="text" placeholder="请输入验证码" class="j-code">
                </div>
                <div @click="generateImg" class="joint-code joint-code2">
                    {{imgCode}}
                </div>
              </li>
            </ul>
          </div>
        </bl-tab-container-item>
        <!-- 第二步骤 -->
        <bl-tab-container-item :id="2">
          <div class="joint-wrap content">
            <ul>
              <li>
                <div class="joint-input j-input">
                  <input type="text" v-model="receiveSMSCode" placeholder="请输入短信验证码" class="j-code">
                  <button class="getSMSCode" :disabled="codeDisabled" @click="getSMSCode">{{smsCodeText}}</button>
                </div>
              </li>
            </ul>
          </div>
        </bl-tab-container-item>
        <!-- 第三步骤 重置密码-->
        <bl-tab-container-item :id="3">
          <div class="joint-wrap content">
            <ul>
              <li>
                <div class="joint-input j-input">
                  <input v-model="pass" type="password" placeholder="请输入新密码" class="j-login">
                  <div class="form-close"></div>
                </div>
              </li>
              <li>
                <div class="joint-input j-input">
                  <input v-model="passagain" type="password" placeholder="请再次输入新密码" class="j-code">
                  <div class="form-close"></div>
                </div>
              </li>
            </ul>
          </div>
        </bl-tab-container-item>

    </bl-tab-container>
    </div>
    <!-- content end -->
    <div class="submitBind">
      <input type="button" @click="next" class="joint-submit" v-bind:value="step==3?'完成':'下一步'">
    </div>
</div>
</template>
<script>
    import api from './api/index'
    import {MD5} from 'src/md5';
  //  import utils from 'src/utils'
  export default {
    name: 'findpass',
    data() {
      return {
        receiveSMSCode: "", // 接收的短信验证码
        codeDisabled: false,
        smsCodeText: "获取短信验证码",
        mobile: "", // 手机号
        imgCodeInput: "", // 输入的验证码
        imgCode: "",
        step: 1, // 找回密码步骤
        checked: true, // 默认是否2周免登录
        tabsModel: 1, // tab 默认第一个
        tab: [{text: '输入手机号', type: "1"}, {text: '获取验证码', type: "2"}, {text: '重置密码', type: "3"}],
        tabItem: {},
        pass: "", // 新密码
        passagain: "" // 确认密码
      }
    },
    created() {
      this.backUrl = this.$route.query.backUrl;
      // 生成验证码
      this.generateImg();
      this.step = parseInt(this.$route.params.step);
      this.tabsModel = this.step;
      let pre = this.step - 1;
      this.tabItem = this.tab[pre];
      this.$loading.close();
    },
    watch: {
      '$route.params.step'(value) {
        this.step = parseInt(value);
        let pre = this.step - 1;
        this.tabItem = this.tab[pre];
        setTimeout(() => {
          this.tabsModel = this.step;
          if (this.step == 2) { // 默认发送短信验证码
            clearInterval(this.timeId)
            this.getSMSCode();
          }
        }, 200);
        this.$loading.close();
        console.log("执行开始2")
      }
    },
    mounted() {
    },
    methods: {
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
      alertTip(msg) {
        this.$toast({
          position: 'bottom',
          message: msg
        });
      },
      valStep(step) {
          let flag = true;
          switch (step) {
            case 1:  // 验证手机号与验证码
              if (this.valPhone(this.mobile)) {
                if (this.imgCodeInput == "") {
                    this.alertTip("验证码不能为空!");
                    flag = false;
                }
                if (this.imgCodeInput && this.imgCode.toLowerCase() == this.imgCodeInput.trim().toLowerCase()) {
                    flag = true;
                } else {
                    this.alertTip("验证码不正确!");
                    flag = false;
                }
              } else {
                flag = false;
              }
              break;
            case 2:  // 验证手机号与验证码
              if (this.receiveSMSCode == "") {
                this.alertTip("短信验证码不能为空!");
                flag = false;
              } else {
                api.validatePasswordSMSCode({
                  mobile: this.mobile,
                  sms_code: this.receiveSMSCode
                }).then(data => {
                  let json = JSON.parse(data.body.obj);
                  console.log(json)
                  if (json.resCode == "00100000") {
                      flag = true;
                  } else {
                      this.alertTip("验证码输入不正确!")
                      flag = false;
                  }
                });
              }
              break;
            case 3:  // 修改密码
              if (this.pass == "") {
                this.alertTip("密码不能为空!");
                flag = false;
              }
              if (this.pass.length < 8) {
                this.alertTip("密码长度不能少于8位!");
                flag = false;
              }
              if (this.passagain == "") {
                this.alertTip("确认密码不能为空!");
                flag = false;
              }
              if (this.passagain.length < 8) {
                this.alertTip("确认密码长度不能少于8位!");
                flag = false;
              }
              if (this.pass != this.passagain) {
                this.alertTip("两次密码不一样!");
                flag = false;
              }
              break;
          }
          return flag;
      },
      // 获取短信验证码
      getSMSCode() {
        api.sendSMSCodeByResetPass({
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
      },
      goNext() {
        this.tabsModel += 1;
        this.step = this.tabsModel;
        this.$router.push({path: '/findpass/' + this.step + "?backUrl=" + this.backUrl})
      },
      next() {
        if (this.tabItem.type == 1) { // 找回密码第一步
          if (this.valStep(1)) {
            this.goNext()
          }
        } else if (this.tabItem.type == 2) { // 验证短信
          if (this.valStep(2)) {
            this.goNext()
          }
        } else { // 修改密码
          if (this.valStep(3)) {
            api.resetPassword({
              mobile: this.mobile,
              newPass: MD5(this.pass),
              sms_code: this.receiveSMSCode
            }).then(data => {
              let json = JSON.parse(data.body.obj);
              console.log(json)
              if (json.resCode == "00100000") { // 修改成功
                this.$router.push({path: 'login?backUrl=' + this.backUrl})
              }
            })
          }
        }
      }
    }
  };
</script>
