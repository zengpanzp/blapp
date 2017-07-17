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
                        <input type="tel" maxlength="11" placeholder="请输入手机号码" class="j-login">
                        <div class="form-close"></div>
                    </div>
                </li>
                <li>
                    <div class="joint-input j-input">
                        <input type="text" placeholder="请输入验证码" class="j-code">
                        <div class="form-close"></div>
                    </div>
                    <div class="joint-code joint-code2">
                        <img src="images/Joint-login/yzcode.png">
                    </div>
                </li>
                <li>
                  <div class="joint-input j-input">
                    <input type="text" placeholder="请输入短信验证码" class="j-code">
                    <button>获取短信验证码</button>
                  </div>
                </li>
                <li>
                  <div class="joint-input j-input">
                    <input type="text" placeholder="请输入您要设置的密码(8~20位数字字母组合)" class="j-code">
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
      <input type="button" class="joint-submit" value="立即注册">
    </div>
    <a class="hasAccount" href="/#/login">已有百联通账户？直接登录</a>
    <!-- content end -->
</div>
</template>
<script>
  //  import api from './api/index'
  //  import utils from 'src/utils'
  //  import mock from '../../../mock/getCouponDetail'
  //  import abc from './i/banners/ia_10001-750x240q40.jpg'
  export default {
    name: 'register',
    props: {
      "groupItem": Object,
      "_groupList": Array
    },
    data() {
      return {
        visible: false, // 是否弹出编辑
        groupName: "",
        type: 1,  // 0为新增 1为水  2为电  3为煤
        groupList: [],
        buttons: [{
          text: "确定"
        }, {
          text: "取消"
        }],
        newGroupName: '' // 新的分类名称
      }
    },
    created() {
      this.$loading.close();
    },
    mounted() {
    },
    methods: {
    }
  };
</script>
