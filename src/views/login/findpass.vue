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
        <img src="./i/bl3.png" alt=""> 找回密码
      </div>
    </header>
    <!-- header end -->
    <!-- 第一步骤 -->
    <div class="findpass">
      <bl-tab-container :swipeable="true" v-model="tabsModel">
        <bl-tab-container-item :id="1">
          <!--先输入手机号-->
          <div class="joint-wrap content">
            <ul>
              <li>
                <div class="joint-input j-input">
                  <input type="tel" maxlength="11" placeholder="请输入手机号码" class="j-login">
                </div>
              </li>
              <div class="joint-input j-input">
                <input type="text" placeholder="请输入验证码" class="j-code">
              </div>
              <div class="joint-code joint-code2">
                <img src="images/Joint-login/yzcode.png">
              </div>
            </ul>
          </div>
        </bl-tab-container-item>
        <!-- 第二步骤 -->
        <bl-tab-container-item :id="2">
          <div class="joint-wrap content">
            <ul>
              <li>
                <div class="joint-input j-input">
                  <input type="text" placeholder="请输入短信验证码" class="j-code">
                  <button>获取短信验证码</button>
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
                  <input type="password" placeholder="请输入新密码" class="j-login">
                  <div class="form-close"></div>
                </div>
              </li>
              <li>
                <div class="joint-input j-input">
                  <input type="text" placeholder="请再次输入新密码" class="j-code">
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
  //  import api from './api/index'
  //  import utils from 'src/utils'
  //  import mock from '../../../mock/getCouponDetail'
  //  import abc from './i/banners/ia_10001-750x240q40.jpg'
  export default {
    name: 'login',
    data() {
      return {
        step: 1, // 找回密码步骤
        checked: true, // 默认是否2周免登录
        tabsModel: 1, // tab 默认第一个
        tab: [{text: '输入手机号', type: "1"}, {text: '获取验证码', type: "2"}, {text: '重置密码', type: "3"}],
        tabItem: {}
      }
    },
    created() {
      this.step = parseInt(this.$route.params.step);
      this.tabsModel = this.step;
      let pre = this.step - 1;
      this.tabItem = this.tab[pre];
      this.$loading.close();
      console.log("执行开始1")
    },
    watch: {
      '$route.params.step'(value) {
        this.step = parseInt(value);
        this.tabsModel = this.step;
        let pre = this.step - 1;
        this.tabItem = this.tab[pre];
        this.$loading.close();
        console.log("执行开始2")
      }
    },
    mounted() {
    },
    methods: {
        next() {
          this.tabsModel += 1;
          this.step = this.tabsModel;
          this.$router.push({path: '/findpass/' + this.step})
        }
    }
  };
</script>
