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
                        <input type="tel" maxlength="11" placeholder="请输入手机号码" class="j-login">
                    </div>
                </li>
                <li>
                    <div class="joint-input j-input">
                        <input type="text" placeholder="请输入短信验证码" class="j-code">
                       <button class="getSMSCode" @click="getSMSCode" :disabled="codeDisabled">{{smsCodeText}}</button>
                    </div>
                </li>
                <li>
                    <div class="joint-input j-input">
                        <input type="text" placeholder="请输入验证码" class="j-code">
                    </div>
                    <div @click="generateImg" class="joint-code joint-code2">
                      {{imgCode}}
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div class="submitBind">
      <input type="button" class="joint-submit" value="授权绑定">
    </div>
</div>
</template>
<script>
    import api from './api/index'
  //  import utils from 'src/utils'
  //  import mock from '../../../mock/getCouponDetail'
  //  import abc from './i/banners/ia_10001-750x240q40.jpg'
  export default {
    name: 'bindLogin',
    data() {
      return {
        imgCode: '', // 图片验证码
        mobile: "",
        codeDisabled: false,  // 能否点击发送验证码
        smsCodeText: "获取短信验证码"
      }
    },
    created() {
      this.$loading.close();
      this.generateImg()
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
