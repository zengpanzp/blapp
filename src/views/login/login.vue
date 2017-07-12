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
                <input type="tel" maxlength="11" placeholder="请输入账号" class="j-login">
                <div class="form-close"></div>
              </div>
            </li>
            <li>
              <div class="joint-input j-input">
                <input type="text" placeholder="请输入密码" class="j-code">
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
                <input type="tel" maxlength="11" placeholder="请输入手机号码" class="j-login">
              </div>
            </li>
            <li>
              <div class="joint-input j-input">
                <input type="text" placeholder="请输入短信验证码" class="j-code">
                <button>获取短信验证码</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="bottom"><input class="circle-select" v-model="checked" id="checkbox2" type="checkbox" ><label class="tips" for="checkbox2">两周内免登录</label> <label></label></div>
      </bl-tab-container-item>
    </bl-tab-container>
    <!-- content end -->
    <div class="submitBind">
      <input type="button" class="joint-submit" value="登 录">
    </div>
    <div class="unionLogin">
      <div class="line flex-m"></div>
      <div class="text">联合登录</div>
      <img src="./i/unionLogin.png">
    </div>
</div>
</template>
<script>
  //  import api from './api/index'
  //  import utils from 'src/utils'
  //  import mock from '../../../mock/getCouponDetail'
  //  import abc from './i/banners/ia_10001-750x240q40.jpg'
  export default {
    name: 'login',
    data() {
      return {
        checked: true, // 默认是否2周免登录
        tabsModel: 0, // tab 默认第一个
        tab: [{text: '账号密码登录', type: "account"}, {text: '手机动态密码登录', type: "phone"}],
        tabItem: {}
      }
    },
    created() {
      this.tabItem = this.tab[0];
      this.$loading.close();
    },
    mounted() {
    },
    methods: {
        register() {
          this.$router.push({path: 'register'})
        }
    }
  };
</script>
