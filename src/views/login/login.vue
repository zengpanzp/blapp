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
        <img src="./i/bl3.png" alt=""> 登录
      </div>
      <label class="registerText" @click="register">注册</label>
    </header>
    <div class="tabBar">
      <bl-navbar class="flex" v-model="tabsModel">
        <bl-tab-item class="flex-item flex-c-m " :id="index" v-for="(item, index) in tab" @click.native="tabItem = item">
          {{ item.text }}
        </bl-tab-item>
      </bl-navbar>
    </div>
    <!-- header end -->
    <!-- content start -->
    <bl-tab-container :swipeable="true" v-model="tabsModel">
      <bl-tab-container-item :id="0">
        <!--账号密码登录-->
        <div class="joint-wrap content">
          <ul>
            <li>
              <div class="joint-input j-input">
                <input v-model="phone" type="tel" maxlength="11" placeholder="请输入账号" class="j-login">
                <div class="form-close"></div>
              </div>
            </li>
            <li>
              <div class="joint-input j-input">
                <input v-model="pass" type="password" placeholder="请输入密码" class="j-code">
                <div class="form-close"></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="bottom"><input class="circle-select" v-model="checked" id="checkbox" type="checkbox" ><label class="tips" for="checkbox">两周内免登录</label> <label>忘记密码?</label></div>
      </bl-tab-container-item>
      <bl-tab-container-item :id="1">
        <!--短信验证码登录-->
        <div class="joint-wrap content">
          <ul>
            <li>
              <div class="joint-input j-input">
                <input type="tel" v-model="mobile" maxlength="11" placeholder="请输入手机号码" class="j-login">
              </div>
            </li>
            <li>
              <div class="joint-input j-input">
                <input type="text" v-model="code" placeholder="请输入短信验证码" class="j-code">
                <button class="getSMSCode" @click="getSMSCode" :disabled="codeDisabled">{{smsCodeText}}</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="bottom"><input class="circle-select" v-model="checkedSMS" id="checkbox2" type="checkbox" ><label class="tips" for="checkbox2">两周内免登录</label> <label></label></div>
      </bl-tab-container-item>
    </bl-tab-container>
    <!-- content end -->
    <div class="submitBind">
      <input type="button" class="joint-submit" @click="login" value="登 录">
    </div>
    <div class="unionLogin">
      <div class="line flex-m"></div>
      <div class="text">联合登录</div>
      <img src="./i/unionLogin.png">
    </div>
</div>
</template>
<script>
  import api from './api/index'
  import {MD5} from 'src/md5';
  //  import utils from 'src/utils'
  export default {
    name: 'login',
    data() {
      return {
        phone: "", // 账号
        pass: "",  // 密码
        code: "", // 验证码
        mobile: "", // 手机号
        codeDisabled: false,  // 能否点击发送验证码
        checked: false, // 默认是否2周免登录
        checkedSMS: false, // 短信登录是否2周内免登录
        tabsModel: 0, // tab 默认第一个
        tab: [{text: '账号密码登录', type: "account"}, {text: '手机动态密码登录', type: "phone"}],
        tabItem: {},
        smsCodeText: "获取短信验证码"
      }
    },
    created() {
      this.tabItem = this.tab[0];
      // 登录成功的回调地址
      this.backUrl = this.$route.query.backUrl;
      window.MD5 = MD5;
    },
    mounted() {
      this.$loading.close();
    },
    methods: {
      // 登录
      login() {
        if (this.tabItem.type == "account") { // 账号密码登录
          if (this.valPhone(this.phone)) {
            if (this.pass != "") {
              if (this.pass.length < 8) {
                this.$toast({
                  position: 'bottom',
                  message: "密码长度不能少于8位!"
                });
                return false;
              }
              api.login({
                loginName: this.phone,
                password: MD5(this.pass),
                type: 1,
                relocationURI: "https://m.bl.com/h5-web/member/view_memberIndex.html?",
                mpFlag: ""
              }).then(data => {
                console.log(data)
              });
            } else {
              this.$toast({
                position: 'bottom',
                message: "密码不能为空!"
              });
            }
          }
        } else { // 短信验证码登录
          if (this.valPhone(this.mobile)) {
            if (this.code != "") {
              // 短信验证码登录
              api.loginWithSmsCode({
                loginName: this.mobile,
                smsCode: this.code,
                type: "2",
                relocationURI: "https://m.bl.com/h5-web/member/view_memberIndex.html",
                mpFlag: ""
              }).then(data => {
                console.log(data);
              });
            } else {
              this.$toast({
                position: 'bottom',
                message: "短信验证码不能为空!"
              });
            }
          }
        }
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
                  that.smsCodeText = "重新获取(" + (--times) + "s)";
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
      // 去注册
      register() {
        this.$router.push({path: 'register'})
      }
    }
  };
</script>
